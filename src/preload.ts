import { AppData, DailyNotesData } from "./typings.d";
import { BrowserWindowConstructorOptions, contextBridge, ipcRenderer } from "electron";

import { IPC_EVENTS, EXPOSED_API_FROM_ELECTRON } from "./constants";

import type { GachaData, AppInfo } from "./typings";

contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, {
  clearCookie: (domain?: string) => ipcRenderer.send(IPC_EVENTS.clearCookie, domain),
  closeApp: () => ipcRenderer.send(IPC_EVENTS.closeApp),
  getAppInfo: (): Promise<AppInfo> => ipcRenderer.invoke(IPC_EVENTS.getAppInfo),
  getDailyNotes: (): Promise<DailyNotesData> => ipcRenderer.invoke(IPC_EVENTS.getDailyNotes),
  getGachaListByUrl: (url: string): Promise<GachaData> =>
    ipcRenderer.invoke(IPC_EVENTS.getGachaListByUrl, url),
  getGachaUrl: (): Promise<string> => ipcRenderer.invoke(IPC_EVENTS.getGachaUrl),
  getStoreKey: (key: string): Promise<any> => ipcRenderer.invoke(IPC_EVENTS.getStoreKey, key),
  hideApp: () => ipcRenderer.send(IPC_EVENTS.hideApp),
  loginViaMihoyoBBS: () => ipcRenderer.send(IPC_EVENTS.loginViaMihoyoBBS),
  minimizeApp: () => ipcRenderer.send(IPC_EVENTS.minimizeApp),
  openLink: (url: string) => ipcRenderer.send(IPC_EVENTS.openLink, url),
  openWindow: (url: string, options?: BrowserWindowConstructorOptions, UA?: string) =>
    ipcRenderer.send(IPC_EVENTS.openWindow, url, options, UA),
  readClipboardText: (): Promise<string> => ipcRenderer.invoke(IPC_EVENTS.readClipboardText),
  refreshUserInfo: (): Promise<AppData["user"]> => ipcRenderer.invoke(IPC_EVENTS.refreshUserInfo),
  setStoreKey: (key: string, value: any) => ipcRenderer.send(IPC_EVENTS.setStoreKey, key, value),
  writeClipboardText: (text: string) => ipcRenderer.send(IPC_EVENTS.writeClipboardText, text)
});
