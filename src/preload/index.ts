const { contextBridge, ipcRenderer } = require("electron");

import { AppInfo } from "../types";
import { IPC_EVENTS, EXPOSED_API_FROM_ELECTRON } from "../constants";

const getAppInfo = (): Promise<AppInfo> => {
  return ipcRenderer.invoke(IPC_EVENTS.getAppInfo);
};

const closeApp = () => {
  ipcRenderer.send(IPC_EVENTS.closeApp);
};

contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, {
  closeApp,
  getAppInfo
});
