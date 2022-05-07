import { app, BrowserWindow, ipcMain } from "electron";

import { store } from ".";
import { IPC_EVENTS } from "../constants";

const bindIPC = (win: BrowserWindow) => {
  ipcMain.on(IPC_EVENTS.closeApp, () => app.exit(0));
  ipcMain.on(IPC_EVENTS.minimizeApp, () => win.minimize());
  ipcMain.on(IPC_EVENTS.hideApp, () => win.hide());

  ipcMain.handle(IPC_EVENTS.getStoreKey, (_, key: string) => store.get(key));
  ipcMain.handle(IPC_EVENTS.setStoreKey, (_, key: string, value: any) => {
    store.set(key, value);
    console.log(store.path);
  });
  ipcMain.handle(IPC_EVENTS.getAppInfo, () => ({
    name: app.getName(),
    version: app.getVersion()
  }));
};

export default bindIPC;
