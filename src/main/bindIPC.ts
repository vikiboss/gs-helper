import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  clipboard,
  ipcMain as IPC,
  shell
} from "electron";

const AppInfo = {
  name: app.getName(),
  version: app.getVersion()
};

import { isDev } from "./createMainWindow";
import { mainWin, store } from ".";
import clearCookie from "../utils/clearCookie";
import deepClone from "../utils/deepClone";
import getDailyNotes from "../services/getDailyNotes";
import getGachaListByUrl from "../services/getGachaListByUrl";
import getGachaUrl from "../utils/getGachaUrl";
import getRoleInfoByCookie from "../services/getUserGameRolesByCookie";
import updateStoreGachaList from "../utils/updateStoreGachaList";
import verifyCookie from "../utils/verifyCookie";
import {
  APP_USER_AGENT_DESKTOP,
  APP_USER_AGENT_MOBILE,
  DEFAULT_APP_DATA,
  IPC_EVENTS,
  LINK_MIHOYO_BBS_LOGIN,
  SCRIPT_REFINE_BBS,
  WINDOW_BACKGROUND_COLOR
} from "../constants";

import doBBSSign from "../services/doBBSSign";
import getBBSSignData from "../services/getBBSSignData";
import getBBSSignInfo from "../services/getBBSSignInfo";
import getMonthInfo from "../services/getMonthInfo";
import getOwnedRoles from "../services/getOwnedRoles";
import sortGachaList from "../utils/sortGachaList";

import type { AppData } from "../typings";

const bindIPC = (win: BrowserWindow) => {
  const wins = new Map<string, BrowserWindow>();

  IPC.on(IPC_EVENTS.clearCookie, (_, domain?: string) => clearCookie(domain));
  IPC.on(IPC_EVENTS.closeApp, () => app.exit(0));
  IPC.on(IPC_EVENTS.hideApp, () => win.hide());
  IPC.on(IPC_EVENTS.minimizeApp, () => win.minimize());
  IPC.on(IPC_EVENTS.openLink, (_, url: string) => shell.openExternal(url));
  IPC.on(IPC_EVENTS.writeClipboardText, (_, text: string) => clipboard.writeText(text));

  IPC.handle(IPC_EVENTS.doBBSSign, async () => await doBBSSign());
  IPC.handle(IPC_EVENTS.getAppInfo, () => AppInfo);
  IPC.handle(IPC_EVENTS.getBBSSignData, async () => await getBBSSignData());
  IPC.handle(IPC_EVENTS.getBBSSignInfo, async () => await getBBSSignInfo());
  IPC.handle(IPC_EVENTS.getDailyNotes, async () => await getDailyNotes());
  IPC.handle(IPC_EVENTS.getGachaUrl, async () => await getGachaUrl());
  IPC.handle(IPC_EVENTS.getMonthInfo, async (_, month?: number) => await getMonthInfo(month));
  IPC.handle(IPC_EVENTS.getOwnedRoles, async () => await getOwnedRoles());
  IPC.handle(IPC_EVENTS.getStoreKey, (_, key: keyof AppData) => store.get<string, any>(key));
  IPC.handle(IPC_EVENTS.readClipboardText, () => clipboard.readText());

  IPC.on(IPC_EVENTS.setStoreKey, (_, key: keyof AppData, value: any) =>
    store.set<keyof AppData>(key, value)
  );

  IPC.on(IPC_EVENTS.loginViaMihoyoBBS, async () => {
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
        dom.executeJavaScript(SCRIPT_REFINE_BBS);
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
        : deepClone<AppData["user"]>(DEFAULT_APP_DATA.user);
      store.set<keyof AppData>("user", user);
      mainWin.focus();
    });
  });

  IPC.on(
    IPC_EVENTS.openWindow,
    async (_, url: string, options: BrowserWindowConstructorOptions = {}, UA?: string) => {
      if (wins.has(url)) {
        wins.get(url).show();
      } else {
        const win = new BrowserWindow({
          width: 1680,
          height: 900,
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
            dom.executeJavaScript(SCRIPT_REFINE_BBS);
          } catch (e) {
            console.log("openWindow: ", e);
          }
        });
        dom.setUserAgent(UA || APP_USER_AGENT_DESKTOP);
        dom.loadURL(url);
      }
    }
  );

  IPC.handle(IPC_EVENTS.getGachaListByUrl, async (_, url: string) => {
    const data = await getGachaListByUrl(url);
    if (data.list.length > 0) {
      data.list = sortGachaList(data.list);
      updateStoreGachaList(data);
    }
    return data;
  });

  IPC.handle(IPC_EVENTS.refreshUserInfo, async () => {
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
      : deepClone<AppData["user"]>(DEFAULT_APP_DATA.user);
    store.set<keyof AppData>("user", user);
    return user;
  });
};

export default bindIPC;
