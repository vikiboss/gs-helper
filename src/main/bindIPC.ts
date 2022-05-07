import { app, BrowserWindow, ipcMain } from "electron";

import { mainWin, store } from ".";
import { APP_USER_AGENT, IPC_EVENTS } from "../constants";
import verifyCookie from "./verifyCookie";

const bindIPC = (win: BrowserWindow) => {
  ipcMain.on(IPC_EVENTS.closeApp, () => app.exit(0));
  ipcMain.on(IPC_EVENTS.minimizeApp, () => win.minimize());
  ipcMain.on(IPC_EVENTS.hideApp, () => win.hide());
  ipcMain.on(IPC_EVENTS.login, async () => {
    const bbsWin = new BrowserWindow({
      width: 400,
      height: 700,
      modal: true,
      parent: mainWin,
      alwaysOnTop: true,
      autoHideMenuBar: true
    });

    bbsWin.webContents.setUserAgent(APP_USER_AGENT);
    bbsWin.webContents.loadURL("https://m.bbs.mihoyo.com/ys/#/login");

    bbsWin.on("close", async () => {
      const cookies = bbsWin.webContents.session.cookies;
      const { valid, cookie, buid } = await verifyCookie(cookies);
      if (valid) store.set("user", { cookie, buid });
      else store.set("user", { cookie: "", buid: "" });
    });
  });

  ipcMain.handle(IPC_EVENTS.getAppInfo, () => ({
    name: app.getName(),
    version: app.getVersion()
  }));

  ipcMain.handle(IPC_EVENTS.getStoreKey, (_, key: string) => store.get(key));

  ipcMain.handle(IPC_EVENTS.setStoreKey, (_, key: string, value: any) => {
    store.set(key, value);
    console.log(store.path);
  });
};

export default bindIPC;
