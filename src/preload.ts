import { contextBridge, ipcRenderer as IPC } from "electron";
import { IPCEvents, EXPOSED_API_FROM_ELECTRON } from "./constants";

import type { BrowserWindowConstructorOptions as WinOptions } from "electron";
import type { GachaData, AppInfo, UserData } from "./typings";

// 通过 IPC 实现 main 进程与 render 进程相互通信
// 通过 contextBridge 将 API 安全的挂载到 render 进程的全局变量 window 中
contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, {
  closeApp: () => IPC.send(IPCEvents.closeApp),
  deleteUser: (uid?: string) => IPC.send(IPCEvents.deleteUser, uid),
  doBBSSign: () => IPC.invoke(IPCEvents.doBBSSign),
  getAppInfo: (): Promise<AppInfo> => IPC.invoke(IPCEvents.getAppInfo),
  getBBSSignData: () => IPC.invoke(IPCEvents.getBBSSignData),
  getBBSSignInfo: () => IPC.invoke(IPCEvents.getBBSSignInfo),
  getCalenderList: () => IPC.invoke(IPCEvents.getCalenderList),
  getCurrentUser: (): Promise<UserData | null> => IPC.invoke(IPCEvents.getCurrentUser),
  getDailyNotes: () => IPC.invoke(IPCEvents.getDailyNotes),
  getGachaUrl: (): Promise<string> => IPC.invoke(IPCEvents.getGachaUrl),
  getGameRoleInfo: () => IPC.invoke(IPCEvents.getGameRoleInfo),
  getHitokoto: () => IPC.invoke(IPCEvents.getHitokoto),
  getMonthInfo: (month?: number) => IPC.invoke(IPCEvents.getMonthInfo, month),
  getOwnedRoleList: () => IPC.invoke(IPCEvents.getOwnedRoleList),
  getPublicRoleList: () => IPC.invoke(IPCEvents.getPublicRoleList),
  getLocalGachaDatas: () => IPC.invoke(IPCEvents.getLocalGachaDatas),
  getStoreKey: (key: string): Promise<any> => IPC.invoke(IPCEvents.getStoreKey, key),
  getUserRole: () => IPC.invoke(IPCEvents.getUserRole),
  hideApp: () => IPC.send(IPCEvents.hideApp),
  loginByBBS: () => IPC.send(IPCEvents.loginByBBS),
  minimizeApp: () => IPC.send(IPCEvents.minimizeApp),
  openLink: (url: string) => IPC.send(IPCEvents.openLink, url),
  readClipboardText: (): Promise<string> => IPC.invoke(IPCEvents.readClipboardText),
  setStoreKey: (key: string, value: any) => IPC.send(IPCEvents.setStoreKey, key, value),
  writeClipboardText: (text: string) => IPC.send(IPCEvents.writeClipboardText, text),
  openWindow: (url: string, options?: WinOptions, UA?: string) => {
    IPC.send(IPCEvents.openWindow, url, options, UA);
  },
  getGachaListByUrl: (url: string): Promise<GachaData> => {
    return IPC.invoke(IPCEvents.getGachaListByUrl, url);
  }
});
