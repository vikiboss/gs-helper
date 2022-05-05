import { app, ipcMain } from "electron";

import { IPC_EVENTS } from "../../constants";

ipcMain.on(IPC_EVENTS.closeApp, () => app.exit(0));

ipcMain.handle(IPC_EVENTS.getAppInfo, () => ({
  name: app.getName(),
  version: app.getVersion()
}));
