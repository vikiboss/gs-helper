import { AppData, DailyNotesData } from "./typings.d";
import { BrowserWindowConstructorOptions, contextBridge, ipcRenderer } from "electron";

import { IPC_EVENTS, EXPOSED_API_FROM_ELECTRON } from "./constants";

import type { GachaData, AppInfo } from "./typings";

contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, {
  closeApp: () => {
    ipcRenderer.send(IPC_EVENTS.closeApp);
  },
  minimizeApp: () => {
    ipcRenderer.send(IPC_EVENTS.minimizeApp);
  },
  hideApp: () => {
    ipcRenderer.send(IPC_EVENTS.hideApp);
  },
  openLink: (url: string) => {
    ipcRenderer.send(IPC_EVENTS.openLink, url);
  },
  openWindow: (url: string, options?: BrowserWindowConstructorOptions, UA?: string) => {
    ipcRenderer.send(IPC_EVENTS.openWindow, url, options, UA);
  },
  loginViaMihoyoBBS: () => {
    ipcRenderer.send(IPC_EVENTS.loginViaMihoyoBBS);
  },
  setStoreKey: (key: string, value: any) => {
    ipcRenderer.send(IPC_EVENTS.setStoreKey, key, value);
  },
  clearCookie: (domain?: string) => {
    ipcRenderer.send(IPC_EVENTS.clearCookie, domain);
  },
  refreshUserInfo: (): Promise<AppData["user"]> => {
    return ipcRenderer.invoke(IPC_EVENTS.refreshUserInfo);
  },

  getAppInfo: (): Promise<AppInfo> => {
    return ipcRenderer.invoke(IPC_EVENTS.getAppInfo);
  },
  getStoreKey: (key: string): Promise<any> => {
    return ipcRenderer.invoke(IPC_EVENTS.getStoreKey, key);
  },
  getGachaUrl: (): Promise<string> => {
    return ipcRenderer.invoke(IPC_EVENTS.getGachaUrl);
  },
  getGachaListByUrl: (url: string): Promise<GachaData> => {
    return ipcRenderer.invoke(IPC_EVENTS.getGachaListByUrl, url);
  },
  getDailyNotes: (): Promise<DailyNotesData> => {
    return ipcRenderer.invoke(IPC_EVENTS.getDailyNotes);
  }
});
