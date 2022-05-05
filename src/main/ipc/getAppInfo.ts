import { app, ipcMain } from "electron";

import { IPC_EVENTS } from "../../constants";

ipcMain.handle(IPC_EVENTS.getAppInfo, () => ({
  name: app.getName(),
  version: app.getVersion()
}));
