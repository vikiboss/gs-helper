import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  clipboard,
  ipcMain as IPC,
  shell
} from "electron";

import {
  APP_USER_AGENT_DESKTOP,
  APP_USER_AGENT_MOBILE,
  DefaultAppData,
  IPCEvents,
  LINK_MIHOYO_BBS_LOGIN,
  ScriptRefineBBS,
  WINDOW_BACKGROUND_COLOR
} from "../constants";

import { isDev } from "./createMainWindow";
import { mainWin, store } from ".";

import clearCookie from "../utils/clearCookie";
import deepClone from "../utils/deepClone";
import sortGachaList from "../utils/sortGachaList";
import updateStoreGachaList from "../utils/updateStoreGachaList";
import verifyCookie from "../utils/verifyCookie";

import doBBSSign from "../services/doBBSSign";
import getBBSSignData from "../services/getBBSSignData";
import getBBSSignInfo from "../services/getBBSSignInfo";
import getCalenderList from "../services/getCalenderList";
import getDailyNotes from "../services/getDailyNotes";
import getGachaListByUrl from "../services/getGachaListByUrl";
import getGachaUrl from "../utils/getGachaUrl";
import getHitokoto from "../services/getHitokoto";
import getMonthInfo from "../services/getMonthInfo";
import getOwnedRoleList from "../services/getOwnedRoleList";
import getPublicRoleList from "../services/getPublicRoleList";
import getRoleInfoByCookie from "../services/getUserRolesByCookie";

import type { AppData } from "../typings";

const AppInfo = { name: app.getName(), version: app.getVersion() };

const bindIPC = (win: BrowserWindow) => {
  const wins = new Map<string, BrowserWindow>();

  IPC.on(IPCEvents.clearCookie, (_, domain?: string) => clearCookie(domain));
  IPC.on(IPCEvents.closeApp, () => app.exit(0));
  IPC.on(IPCEvents.hideApp, () => win.hide());
  IPC.on(IPCEvents.minimizeApp, () => win.minimize());
  IPC.on(IPCEvents.openLink, (_, url: string) => shell.openExternal(url));
  IPC.on(IPCEvents.writeClipboardText, (_, text: string) => clipboard.writeText(text));

  IPC.handle(IPCEvents.doBBSSign, async () => await doBBSSign());
  IPC.handle(IPCEvents.getAppInfo, () => AppInfo);
  IPC.handle(IPCEvents.getBBSSignData, async () => await getBBSSignData());
  IPC.handle(IPCEvents.getBBSSignInfo, async () => await getBBSSignInfo());
  IPC.handle(IPCEvents.getCalenderList, async () => await getCalenderList());
  IPC.handle(IPCEvents.getDailyNotes, async () => await getDailyNotes());
  IPC.handle(IPCEvents.getGachaUrl, async () => await getGachaUrl());
  IPC.handle(IPCEvents.getHitokoto, async () => await getHitokoto());
  IPC.handle(IPCEvents.getMonthInfo, async (_, month?: number) => await getMonthInfo(month));
  IPC.handle(IPCEvents.getOwnedRoleList, async () => await getOwnedRoleList());
  IPC.handle(IPCEvents.getPublicRoleList, async () => await getPublicRoleList());
  IPC.handle(IPCEvents.getStoreKey, (_, key: keyof AppData) => store.get<string, any>(key));
  IPC.handle(IPCEvents.readClipboardText, () => clipboard.readText());

  IPC.on(IPCEvents.setStoreKey, (_, key: keyof AppData, value: any) =>
    store.set<keyof AppData>(key, value)
  );

  IPC.on(IPCEvents.loginViaMihoyoBBS, async () => {
    const bbsWin = new BrowserWindow({
      width: 400,
      height: 700,
      show: false,
      modal: true,
      parent: mainWin,
      resizable: false,
      maximizable: false,
      alwaysOnTop: true,
      fullscreenable: false,
      autoHideMenuBar: true,
      backgroundColor: WINDOW_BACKGROUND_COLOR
    });
    if (!isDev) bbsWin.removeMenu();
    bbsWin.once("ready-to-show", () => bbsWin.show());

    const dom = bbsWin.webContents;
    dom.on("did-finish-load", () => {
      try {
        dom.executeJavaScript(ScriptRefineBBS);
      } catch (e) {
        console.log("loginViaMihoyoBBS: ", e);
      }
    });
    dom.setWindowOpenHandler(() => ({ action: "deny" }));
    dom.setUserAgent(APP_USER_AGENT_MOBILE);
    dom.loadURL(LINK_MIHOYO_BBS_LOGIN);

    bbsWin.on("close", async () => {
      const cookies = dom.session.cookies;
      const { valid, cookie, info } = await verifyCookie(cookies);
      const user: AppData["user"] = valid
        ? {
            uid: info.game_uid,
            nickname: info.nickname,
            level: info.level,
            isOfficial: info.is_official,
            regionName: info.region_name,
            cookie: cookie
          }
        : deepClone<AppData["user"]>(DefaultAppData.user);
      store.set<keyof AppData>("user", user);
      mainWin.focus();
    });
  });

  IPC.on(
    IPCEvents.openWindow,
    async (_, url: string, options: BrowserWindowConstructorOptions = {}, UA?: string) => {
      if (wins.has(url)) {
        wins.get(url).show();
      } else {
        const win = new BrowserWindow({
          width: 1300,
          height: 803,
          show: false,
          autoHideMenuBar: true,
          backgroundColor: WINDOW_BACKGROUND_COLOR,
          ...options
        });
        if (!isDev) win.removeMenu();
        wins.set(url, win);
        win.once("ready-to-show", () => win.show());
        win.on("close", () => wins.delete(url));
        const dom = win.webContents;

        dom.setWindowOpenHandler((details) => {
          dom.loadURL(details.url);
          return { action: "deny" };
        });
        dom.on("did-finish-load", () => {
          try {
            dom.executeJavaScript(ScriptRefineBBS);
          } catch (e) {
            console.log("openWindow: ", e);
          }
        });
        dom.setUserAgent(UA || APP_USER_AGENT_DESKTOP);
        dom.loadURL(url);
      }
    }
  );

  IPC.handle(IPCEvents.getGachaListByUrl, async (_, url: string) => {
    const data = await getGachaListByUrl(url);
    if (data.list.length > 0) {
      data.list = sortGachaList(data.list);
      updateStoreGachaList(data);
      return store.get("gachas").filter((e) => e.info.uid === data.info.uid)[0];
    }
    return data;
  });

  IPC.handle(IPCEvents.refreshUserInfo, async () => {
    const roles = await getRoleInfoByCookie();
    const user: AppData["user"] = roles[0].game_uid
      ? {
          uid: roles[0].game_uid,
          nickname: roles[0].nickname,
          level: roles[0].level,
          isOfficial: roles[0].is_official,
          regionName: roles[0].region_name,
          cookie: store.get<string, AppData["user"]["cookie"]>("user.cookie")
        }
      : deepClone<AppData["user"]>(DefaultAppData.user);
    store.set<keyof AppData>("user", user);
    return user;
  });
};

export default bindIPC;
