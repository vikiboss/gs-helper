import { AppData } from "./typings.d";
import { contextBridge, ipcRenderer as IPC } from "electron";

import { IPC_EVENTS, EXPOSED_API_FROM_ELECTRON } from "./constants";

import type { BrowserWindowConstructorOptions as WinOptions } from "electron";
import type { DailyNotesData } from "./services/getDailyNotesByCookie";
import type { GachaData, AppInfo } from "./typings";
import type { SignInfo } from "./services/getBBSSignStatus";

contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, {
  clearCookie: (domain?: string) => IPC.send(IPC_EVENTS.clearCookie, domain),
  closeApp: () => IPC.send(IPC_EVENTS.closeApp),
  getAppInfo: (): Promise<AppInfo> => IPC.invoke(IPC_EVENTS.getAppInfo),
  getBBSSignStatus: (): Promise<SignInfo> => IPC.invoke(IPC_EVENTS.getBBSSignStatus),
  getDailyNotes: (): Promise<DailyNotesData> => IPC.invoke(IPC_EVENTS.getDailyNotes),
  getGachaUrl: (): Promise<string> => IPC.invoke(IPC_EVENTS.getGachaUrl),
  getStoreKey: (key: string): Promise<any> => IPC.invoke(IPC_EVENTS.getStoreKey, key),
  hideApp: () => IPC.send(IPC_EVENTS.hideApp),
  loginViaMihoyoBBS: () => IPC.send(IPC_EVENTS.loginViaMihoyoBBS),
  minimizeApp: () => IPC.send(IPC_EVENTS.minimizeApp),
  openLink: (url: string) => IPC.send(IPC_EVENTS.openLink, url),
  readClipboardText: (): Promise<string> => IPC.invoke(IPC_EVENTS.readClipboardText),
  refreshUserInfo: (): Promise<AppData["user"]> => IPC.invoke(IPC_EVENTS.refreshUserInfo),
  setStoreKey: (key: string, value: any) => IPC.send(IPC_EVENTS.setStoreKey, key, value),
  writeClipboardText: (text: string) => IPC.send(IPC_EVENTS.writeClipboardText, text),

  openWindow: (url: string, options?: WinOptions, UA?: string) => {
    IPC.send(IPC_EVENTS.openWindow, url, options, UA);
  },
  getGachaListByUrl: (url: string): Promise<GachaData> => {
    return IPC.invoke(IPC_EVENTS.getGachaListByUrl, url);
  }
});
