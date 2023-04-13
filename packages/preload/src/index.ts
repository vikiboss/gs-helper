import { contextBridge, ipcRenderer as ipc } from 'electron'

import { IpcEvents, EXPOSED_API_FROM_ELECTRON } from '../../constants'

import type { BrowserWindowConstructorOptions as WinOptions } from 'electron'

export const apis = {
  changeUser: function (uid: string) {
    return ipc.invoke(IpcEvents.changeUser, uid) as Promise<void>
  },
  clearData: function () {
    return ipc.invoke(IpcEvents.clearData) as Promise<boolean>
  },
  closeApp: function () {
    return ipc.send(IpcEvents.closeApp)
  },
  deleteUser: function (uid: string) {
    return ipc.send(IpcEvents.deleteUser, uid)
  },
  doBBSSign: function () {
    return ipc.invoke(IpcEvents.doBBSSign)
  },
  exportGacha: function (uid: string) {
    return ipc.invoke(IpcEvents.exportGacha, uid)
  },
  getAppInfo: function () {
    return ipc.invoke(IpcEvents.getAppInfo)
  },
  getBBSSignData: function () {
    return ipc.invoke(IpcEvents.getBBSSignData)
  },
  getBBSSignInfo: function () {
    return ipc.invoke(IpcEvents.getBBSSignInfo)
  },
  getCalendarEvents: function () {
    return ipc.invoke(IpcEvents.getCalendarEvents)
  },
  getCabinetRoles: function (uid?: string) {
    return ipc.invoke(IpcEvents.getCabinetRoles, uid)
  },
  getCurrentUser: function () {
    return ipc.invoke(IpcEvents.getCurrentUser)
  },
  getDailyNotes: function () {
    return ipc.invoke(IpcEvents.getDailyNotes)
  },
  getGachaUrl: function () {
    return ipc.invoke(IpcEvents.getGachaUrl)
  },
  getGameRecordCard: function (bbsId?: string) {
    return ipc.invoke(IpcEvents.getGameRecordCard, bbsId)
  },
  getGameRoleCard: function (uid?: string) {
    return ipc.invoke(IpcEvents.getGameRoleCard, uid)
  },
  getGameRoleInfo: function () {
    return ipc.invoke(IpcEvents.getGameRoleInfo)
  },
  getHitokoto: function () {
    return ipc.invoke(IpcEvents.getHitokoto)
  },
  getLocalGachaData: function () {
    return ipc.invoke(IpcEvents.getLocalGachaData)
  },
  getMonthInfo: function (month?: number) {
    return ipc.invoke(IpcEvents.getMonthInfo, month)
  },
  getOwnedRoles: function (uid?: string) {
    return ipc.invoke(IpcEvents.getOwnedRoles, uid)
  },
  getPublicRoles: function () {
    return ipc.invoke(IpcEvents.getPublicRoles)
  },
  getSpiralAbyss: function (uid?: string, last?: boolean) {
    return ipc.invoke(IpcEvents.getSpiralAbyss, uid, last)
  },
  getRepoData: function (filename: string) {
    return ipc.invoke(IpcEvents.getRepoData, filename)
  },
  getStoreKey: function (key: string) {
    return ipc.invoke(IpcEvents.getStoreKey, key)
  },
  hideApp: function () {
    return ipc.send(IpcEvents.hideApp)
  },
  importGacha: function () {
    return ipc.invoke(IpcEvents.importGacha)
  },
  loginByBBS: function () {
    return ipc.send(IpcEvents.loginByBBS)
  },
  minimizeApp: function () {
    return ipc.send(IpcEvents.minimizeApp)
  },
  openGame: function () {
    return ipc.invoke(IpcEvents.openGame)
  },
  readClipboard: function () {
    return ipc.invoke(IpcEvents.readClipboard)
  },
  setStoreKey: function (key: string, value: any) {
    return ipc.send(IpcEvents.setStoreKey, key, value)
  },
  writeClipboard: function (text: string) {
    return ipc.send(IpcEvents.writeClipboard, text)
  },
  openWindow: function (url: string, options?: WinOptions, UA?: string) {
    return ipc.send(IpcEvents.openWindow, url, options, UA)
  },
  getGachaListByUrl: function (url: string) {
    return ipc.invoke(IpcEvents.getGachaListByUrl, url)
  }
}

// 通过 IPC 实现 main 进程与 render 进程相互通信
// 通过 contextBridge 将 API 安全的挂载到 render 进程的全局变量 window 中
contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, apis)
