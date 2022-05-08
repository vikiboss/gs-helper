import { app, BrowserWindow, ipcMain } from "electron";

import { mainWin, store } from ".";
import clearCookie from "./clearCookie";
import getGachaUrl from "./getGachaUrl";
import verifyCookie from "../utils/verifyCookie";
import getGachaListByUrl from "../services/getGachaListByUrl";
import { APP_USER_AGENT, IPC_EVENTS, LINK_MIHOYO_BBS_LOGIN } from "../constants";
import updateStoreGachaList from "../utils/updateStoreGachaList";
import getUserInfoByCookie from "../services/getUserInfoByCookie";

const bindIPC = (win: BrowserWindow) => {
  ipcMain.on(IPC_EVENTS.closeApp, () => app.exit(0));
  ipcMain.on(IPC_EVENTS.minimizeApp, () => win.minimize());
  ipcMain.on(IPC_EVENTS.hideApp, () => win.hide());

  ipcMain.on(IPC_EVENTS.setStoreKey, (_, key: string, value: any) => {
    console.log(store.path);
    store.set(key, value);
  });

  ipcMain.on(IPC_EVENTS.clearCookie, (_, domain?: string) => {
    clearCookie(domain);
  });

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
      const { valid, cookie, buid } = await verifyCookie(cookies);
      store.set("user", valid ? { cookie, buid } : { cookie: "", buid: "" });
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

  ipcMain.handle(IPC_EVENTS.getUserInfoByCookie, async (_, cookie?: string) => {
    return await getUserInfoByCookie(cookie);
  });
};

export default bindIPC;
