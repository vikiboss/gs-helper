const { contextBridge, ipcRenderer } = require("electron");

import { AppInfo } from "../typings";
import { IPC_EVENTS, EXPOSED_API_FROM_ELECTRON } from "../constants";

contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, {
  closeApp() {
    ipcRenderer.send(IPC_EVENTS.closeApp);
  },
  minimizeApp() {
    ipcRenderer.send(IPC_EVENTS.minimizeApp);
  },
  hideApp() {
    ipcRenderer.send(IPC_EVENTS.hideApp);
  },
  getAppInfo(): Promise<AppInfo> {
    return ipcRenderer.invoke(IPC_EVENTS.getAppInfo);
  }
});
