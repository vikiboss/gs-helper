import { app, BrowserWindow, ipcMain, shell } from "electron";

import { mainWin, store } from ".";
import { defaultData } from "./initStore";
import clearCookie from "../utils/clearCookie";
import getGachaUrl from "../utils/getGachaUrl";
import verifyCookie from "../utils/verifyCookie";
import getGachaListByUrl from "../services/getGachaListByUrl";
import updateStoreGachaList from "../utils/updateStoreGachaList";
import { APP_USER_AGENT, IPC_EVENTS, LINK_MIHOYO_BBS_LOGIN } from "../constants";

const bindIPC = (win: BrowserWindow) => {
  ipcMain.on(IPC_EVENTS.closeApp, () => app.exit(0));
  ipcMain.on(IPC_EVENTS.minimizeApp, () => win.minimize());
  ipcMain.on(IPC_EVENTS.hideApp, () => win.hide());
  ipcMain.on(IPC_EVENTS.openLink, (_, url: string) => shell.openExternal(url));
  ipcMain.on(IPC_EVENTS.setStoreKey, (_, key: string, value: any) => store.set(key, value));
  ipcMain.on(IPC_EVENTS.clearCookie, (_, domain?: string) => clearCookie(domain));

  ipcMain.on(IPC_EVENTS.loginViaMihoyoBBS, async () => {
    const bbsWin = new BrowserWindow({
      width: 400,
      height: 700,
      modal: true,
      parent: mainWin,
      alwaysOnTop: true,
      autoHideMenuBar: true
    });

    bbsWin.webContents.setUserAgent(APP_USER_AGENT);
    bbsWin.webContents.loadURL(LINK_MIHOYO_BBS_LOGIN);

    bbsWin.on("close", async () => {
      const cookies = bbsWin.webContents.session.cookies;
      const { valid, cookie, info } = await verifyCookie(cookies);
      if (!valid) {
        store.set("user", defaultData.user);
      } else {
        store.set("user.buid", info.uid);
        store.set("user.nickname", info.nickname);
        store.set("user.introduce", info.introduce);
        store.set("user.avatar", info.avatar_url);
        store.set("user.cookie", cookie);
      }
      mainWin.focus();
    });
  });

  ipcMain.handle(IPC_EVENTS.getAppInfo, () => ({
    name: app.getName(),
    version: app.getVersion()
  }));

  ipcMain.handle(IPC_EVENTS.getStoreKey, (_, key: string) => store.get(key));

  ipcMain.handle(IPC_EVENTS.getGachaUrl, async () => await getGachaUrl());

  ipcMain.handle(IPC_EVENTS.getGachaListByUrl, async (_, url: string) => {
    const data = await getGachaListByUrl(url);
    updateStoreGachaList(data);
    return data;
  });
};

export default bindIPC;
