import { contextBridge, ipcRenderer as ipc } from 'electron'

import { IpcEvents, EXPOSED_API_FROM_ELECTRON } from './constants'

import type { BrowserWindowConstructorOptions as WinOptions } from 'electron'
import type { AppInfo, BaseRes, GachaData, GameRole, UserData } from './typings'
import type { DoSignData } from './services/doBBSSign'
import type { SignInfo } from './services/getBBSSignInfo'
import type { CalenderData } from './services/getCalenderList'
import type { EnkaUserData } from './services/getCabinetRoleList'
import type { DailyNotesData } from './services/getDailyNotes'
import type { GameRecordCardRawData } from './services/getGameRecordCard'
import type { GameRoleCardData } from './services/getGameRoleCard'
import type { MonthInfo } from './services/getMonthInfo'
import type { RoleData } from './services/getOwnedRoleList'
import type { PublicRole } from './services/getPublicRoleList'
import type { SpiralAbyssData } from './services/getSpiralAbyss'
import type { SignData } from './services/getBBSSignData'

export const apis = {
  changeUser: function (uid: string) {
    return <Promise<void>>ipc.invoke(IpcEvents.changeUser, uid)
  },
  clearData: function () {
    return <Promise<boolean>>ipc.invoke(IpcEvents.clearData)
  },
  closeApp: function () {
    return ipc.send(IpcEvents.closeApp)
  },
  deleteUser: function (uid: string) {
    return ipc.send(IpcEvents.deleteUser, uid)
  },
  doBBSSign: function () {
    return <Promise<BaseRes<DoSignData>>>ipc.invoke(IpcEvents.doBBSSign)
  },
  exportGacha: function (uid: string) {
    return <
      Promise<{
        code: number
        data: GachaData
        message: string
      }>
    >ipc.invoke(IpcEvents.exportGacha, uid)
  },
  getAppInfo: function () {
    return <Promise<AppInfo>>ipc.invoke(IpcEvents.getAppInfo)
  },
  getBBSSignData: function () {
    return <Promise<BaseRes<SignData>>>ipc.invoke(IpcEvents.getBBSSignData)
  },
  getBBSSignInfo: function () {
    return <Promise<BaseRes<SignInfo>>>ipc.invoke(IpcEvents.getBBSSignInfo)
  },
  getCalenderEvents: function () {
    return <Promise<BaseRes<CalenderData>>>ipc.invoke(IpcEvents.getCalenderEvents)
  },
  getCabinetRoles: function (uid?: string) {
    return <Promise<EnkaUserData>>ipc.invoke(IpcEvents.getCabinetRoles, uid)
  },
  getCurrentUser: function () {
    return <Promise<UserData>>ipc.invoke(IpcEvents.getCurrentUser)
  },
  getDailyNotes: function () {
    return <Promise<BaseRes<DailyNotesData>>>ipc.invoke(IpcEvents.getDailyNotes)
  },
  getGachaUrl: function () {
    return <Promise<string>>ipc.invoke(IpcEvents.getGachaUrl)
  },
  getGameRecordCard: function (bbsId?: string) {
    return <Promise<BaseRes<GameRecordCardRawData>>>ipc.invoke(IpcEvents.getGameRecordCard, bbsId)
  },
  getGameRoleCard: function (uid?: string) {
    return <Promise<BaseRes<GameRoleCardData>>>ipc.invoke(IpcEvents.getGameRoleCard, uid)
  },
  getGameRoleInfo: function () {
    return <Promise<GameRole>>ipc.invoke(IpcEvents.getGameRoleInfo)
  },
  getHitokoto: function () {
    return <Promise<string>>ipc.invoke(IpcEvents.getHitokoto)
  },
  getLocalGachaDatas: function () {
    return <Promise<GachaData[]>>ipc.invoke(IpcEvents.getLocalGachaDatas)
  },
  getMonthInfo: function (month?: number) {
    return <Promise<BaseRes<MonthInfo>>>ipc.invoke(IpcEvents.getMonthInfo, month)
  },
  getOwnedRoles: function (uid?: string) {
    return <Promise<BaseRes<RoleData>>>ipc.invoke(IpcEvents.getOwnedRoles, uid)
  },
  getPublicRoles: function () {
    return <Promise<PublicRole[]>>ipc.invoke(IpcEvents.getPublicRoles)
  },
  getSpiralAbyss: function (uid?: string, last?: boolean) {
    return <Promise<BaseRes<SpiralAbyssData>>>ipc.invoke(IpcEvents.getSpiralAbyss, uid, last)
  },
  getRepoData: function (filename: string) {
    return <Promise<any>>ipc.invoke(IpcEvents.getRepoData, filename)
  },
  getStoreKey: function (key: string) {
    return <Promise<any>>ipc.invoke(IpcEvents.getStoreKey, key)
  },
  hideApp: function () {
    return ipc.send(IpcEvents.hideApp)
  },
  importGacha: function () {
    return <
      Promise<{
        code: number
        data: GachaData
        message: string
      }>
    >ipc.invoke(IpcEvents.importGacha)
  },
  loginByBBS: function () {
    return ipc.send(IpcEvents.loginByBBS)
  },
  minimizeApp: function () {
    return ipc.send(IpcEvents.minimizeApp)
  },
  openGame: function () {
    return <
      Promise<{
        code: number
        data: boolean
        message: string
      }>
    >ipc.invoke(IpcEvents.openGame)
  },
  readClipboard: function () {
    return <Promise<string>>ipc.invoke(IpcEvents.readClipboard)
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
    return <Promise<GachaData>>ipc.invoke(IpcEvents.getGachaListByUrl, url)
  }
}

// 通过 IPC 实现 main 进程与 render 进程相互通信
// 通过 contextBridge 将 API 安全的挂载到 render 进程的全局变量 window 中
contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, apis)
