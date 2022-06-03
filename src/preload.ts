import { AppData } from "./typings.d";
import { contextBridge, ipcRenderer as IPC } from "electron";

import { IPCEvents, EXPOSED_API_FROM_ELECTRON } from "./constants";

import type { BrowserWindowConstructorOptions as WinOptions } from "electron";
import type { CalenderEvent } from "./services/getCalenderList";
import type { DailyNotesData } from "./services/getDailyNotes";
import type { GachaData, AppInfo } from "./typings";
import type { MonthInfo } from "./services/getMonthInfo";
import type { Role } from "./services/getOwnedRoles";
import type { SignData } from "./services/getBBSSignData";
import type { SignInfo } from "./services/getBBSSignInfo";

contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, {
  clearCookie: (domain?: string) => IPC.send(IPCEvents.clearCookie, domain),
  closeApp: () => IPC.send(IPCEvents.closeApp),
  doBBSSign: (): Promise<boolean> => IPC.invoke(IPCEvents.doBBSSign),
  getAppInfo: (): Promise<AppInfo> => IPC.invoke(IPCEvents.getAppInfo),
  getBBSSignData: (): Promise<SignData | null> => IPC.invoke(IPCEvents.getBBSSignData),
  getBBSSignInfo: (): Promise<SignInfo | null> => IPC.invoke(IPCEvents.getBBSSignInfo),
  getCalenderList: (): Promise<CalenderEvent[] | null> => IPC.invoke(IPCEvents.getCalenderList),
  getDailyNotes: (): Promise<DailyNotesData | null> => IPC.invoke(IPCEvents.getDailyNotes),
  getGachaUrl: (): Promise<string> => IPC.invoke(IPCEvents.getGachaUrl),
  getHitokoto: (): Promise<string> => IPC.invoke(IPCEvents.getHitokoto),
  getOwnedRoles: (): Promise<Role[]> => IPC.invoke(IPCEvents.getOwnedRoles),
  getStoreKey: (key: string): Promise<any> => IPC.invoke(IPCEvents.getStoreKey, key),
  hideApp: () => IPC.send(IPCEvents.hideApp),
  loginViaMihoyoBBS: () => IPC.send(IPCEvents.loginViaMihoyoBBS),
  minimizeApp: () => IPC.send(IPCEvents.minimizeApp),
  openLink: (url: string) => IPC.send(IPCEvents.openLink, url),
  readClipboardText: (): Promise<string> => IPC.invoke(IPCEvents.readClipboardText),
  refreshUserInfo: (): Promise<AppData["user"]> => IPC.invoke(IPCEvents.refreshUserInfo),
  setStoreKey: (key: string, value: any) => IPC.send(IPCEvents.setStoreKey, key, value),
  writeClipboardText: (text: string) => IPC.send(IPCEvents.writeClipboardText, text),

  openWindow: (url: string, options?: WinOptions, UA?: string) => {
    IPC.send(IPCEvents.openWindow, url, options, UA);
  },
  getMonthInfo: (month?: number): Promise<MonthInfo | null> => {
    return IPC.invoke(IPCEvents.getMonthInfo, month);
  },
  getGachaListByUrl: (url: string): Promise<GachaData> => {
    return IPC.invoke(IPCEvents.getGachaListByUrl, url);
  }
});
