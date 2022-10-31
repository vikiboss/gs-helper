import { contextBridge, ipcRenderer as IPC } from 'electron';
import { IpcEvents, EXPOSED_API_FROM_ELECTRON } from './constants';

import type { BrowserWindowConstructorOptions as WinOptions } from 'electron';

// 通过 IPC 实现 main 进程与 render 进程相互通信
// 通过 contextBridge 将 API 安全的挂载到 render 进程的全局变量 window 中
contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, {
  changeUser: (uid: string) => IPC.invoke(IpcEvents.changeUser, uid),
  clearData: () => IPC.invoke(IpcEvents.clearData),
  closeApp: () => IPC.send(IpcEvents.closeApp),
  deleteUser: (uid: string) => IPC.send(IpcEvents.deleteUser, uid),
  doBBSSign: () => IPC.invoke(IpcEvents.doBBSSign),
  exportGacha: (uid: string) => IPC.invoke(IpcEvents.exportGacha, uid),
  getAppInfo: () => IPC.invoke(IpcEvents.getAppInfo),
  getBBSSignData: () => IPC.invoke(IpcEvents.getBBSSignData),
  getBBSSignInfo: () => IPC.invoke(IpcEvents.getBBSSignInfo),
  getCalenderList: () => IPC.invoke(IpcEvents.getCalenderList),
  getCabinetRoleList: (uid?: string) => IPC.invoke(IpcEvents.getCabinetRoleList, uid),
  getCurrentUser: () => IPC.invoke(IpcEvents.getCurrentUser),
  getDailyNotes: () => IPC.invoke(IpcEvents.getDailyNotes),
  getGachaUrl: () => IPC.invoke(IpcEvents.getGachaUrl),
  getGameRecordCard: (bbsId?: string) =>
    IPC.invoke(IpcEvents.getGameRecordCard, bbsId),
  getGameRoleCard: (uid?: string) => IPC.invoke(IpcEvents.getGameRoleCard, uid),
  getGameRoleInfo: () => IPC.invoke(IpcEvents.getGameRoleInfo),
  getHitokoto: () => IPC.invoke(IpcEvents.getHitokoto),
  getLocalGachaDatas: () => IPC.invoke(IpcEvents.getLocalGachaDatas),
  getMonthInfo: (month?: number) => IPC.invoke(IpcEvents.getMonthInfo, month),
  getOwnedRoleList: (uid?: string) =>
    IPC.invoke(IpcEvents.getOwnedRoleList, uid),
  getPublicRoleList: () => IPC.invoke(IpcEvents.getPublicRoleList),
  getSpiralAbyss: (uid?: string) => IPC.invoke(IpcEvents.getSpiralAbyss, uid),
  getRepoData: (filename: string) =>
    IPC.invoke(IpcEvents.getRepoData, filename),
  getStoreKey: (key: string) => IPC.invoke(IpcEvents.getStoreKey, key),
  hideApp: () => IPC.send(IpcEvents.hideApp),
  importGacha: () => IPC.invoke(IpcEvents.importGacha),
  loginByBBS: () => IPC.send(IpcEvents.loginByBBS),
  minimizeApp: () => IPC.send(IpcEvents.minimizeApp),
  openGame: () => IPC.invoke(IpcEvents.openGame),
  readClipboardText: () => IPC.invoke(IpcEvents.readClipboardText),
  setStoreKey: (key: string, value: any) =>
    IPC.send(IpcEvents.setStoreKey, key, value),
  writeClipboardText: (text: string) =>
    IPC.send(IpcEvents.writeClipboardText, text),
  openWindow: (url: string, options?: WinOptions, UA?: string) => {
    IPC.send(IpcEvents.openWindow, url, options, UA);
  },
  getGachaListByUrl: (url: string) => {
    return IPC.invoke(IpcEvents.getGachaListByUrl, url);
  },
});
