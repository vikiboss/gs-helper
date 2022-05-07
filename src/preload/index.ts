import Store from "electron-store";
import { contextBridge, ipcRenderer } from "electron";

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
  },
  getStoreKey(key: string): Promise<any> {
    return ipcRenderer.invoke(IPC_EVENTS.getStoreKey, key);
  },
  setStoreKey(key: string, value: any): Promise<any> {
    return ipcRenderer.invoke(IPC_EVENTS.setStoreKey, key, value);
  }
});
