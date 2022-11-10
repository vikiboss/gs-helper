import { app, clipboard, ipcMain as IPC } from 'electron'

import type { BrowserWindow } from 'electron'

import { store } from '..'
import { AppName, IpcEvents } from '../../constants'
import { changeUser, deleteUser } from '../handleUsers'
import exportGacha from './exportGacha'
import getCurrentUser from './getCurrentUser'
import handleGetGachaListByUrl from './getGachaListByUrl'
import importConfig from './importGacha'
import loginViaBBS from './loginByBBS'
import openGame from './openGame'
import openWindow from './openWindow'
import doBBSSign from '../../services/doBBSSign'
import getBBSSignData from '../../services/getBBSSignData'
import getBBSSignInfo from '../../services/getBBSSignInfo'
import getCabinetRoleList from '../../services/getCabinetRoleList'
import getCalenderList from '../../services/getCalenderList'
import getDailyNotes from '../../services/getDailyNotes'
import getGameRecordCard from '../../services/getGameRecordCard'
import getGameRoleCard from '../../services/getGameRoleCard'
import getGameRoleInfo from '../../services/getGameRoleInfo'
import getHitokoto from '../../services/getHitokoto'
import getMonthInfo from '../../services/getMonthInfo'
import getOwnedRoleList from '../../services/getOwnedRoleList'
import getPublicRoleList from '../../services/getPublicRoleList'
import getSpiralAbyss from '../../services/getSpiralAbyss'
import getRepoData from '../../services/getRepoData'
import clearData from './clearData'
import getGachaUrl from './getGachaUrl'
import getLocalGachaDatas from './getLocalGachaDatas'

import type { AppInfo } from '../../typings'

const AppicationInfo: AppInfo = {
  name: AppName.en,
  zhName: AppName.zh,
  version: app.getVersion(),
  isBeta: true,
  isDev: !app.isPackaged,
  isWindows: process.platform === 'win32'
}

const bindIPC = (win: BrowserWindow) => {
  IPC.on(IpcEvents.closeApp, () => app.exit(0))
  IPC.on(IpcEvents.deleteUser, (_, uid: string) => deleteUser(uid))
  IPC.on(IpcEvents.hideApp, () => win.hide())
  IPC.on(IpcEvents.loginByBBS, loginViaBBS)
  IPC.on(IpcEvents.minimizeApp, () => win.minimize())
  IPC.on(IpcEvents.openWindow, openWindow)

  IPC.on(IpcEvents.setStoreKey, (_, key: string, value: any) => store.set(key, value))

  IPC.on(IpcEvents.writeClipboardText, (_, text: string) => clipboard.writeText(text))

  IPC.handle(IpcEvents.changeUser, async (_, uid: string) => changeUser(uid))

  IPC.handle(IpcEvents.clearData, async () => clearData())
  IPC.handle(IpcEvents.doBBSSign, async () => doBBSSign())

  IPC.handle(IpcEvents.exportGacha, async (_, uid: string) => exportGacha(uid))

  IPC.handle(IpcEvents.getAppInfo, () => AppicationInfo)
  IPC.handle(IpcEvents.getBBSSignData, async () => getBBSSignData())
  IPC.handle(IpcEvents.getBBSSignInfo, async () => getBBSSignInfo())
  IPC.handle(IpcEvents.getCabinetRoleList, async (_, uid: string) => getCabinetRoleList(uid))
  IPC.handle(IpcEvents.getCalenderList, async () => getCalenderList())
  IPC.handle(IpcEvents.getCurrentUser, () => getCurrentUser())
  IPC.handle(IpcEvents.getDailyNotes, async () => getDailyNotes())
  IPC.handle(IpcEvents.getGachaUrl, async () => getGachaUrl())

  IPC.handle(IpcEvents.getGameRoleCard, async (_, uid?: string) => getGameRoleCard(uid))

  IPC.handle(IpcEvents.getGameRoleInfo, async () => getGameRoleInfo())
  IPC.handle(IpcEvents.getHitokoto, async () => getHitokoto())
  IPC.handle(IpcEvents.getLocalGachaDatas, () => getLocalGachaDatas())

  IPC.handle(IpcEvents.getMonthInfo, async (_, month?: number) => getMonthInfo(month))

  IPC.handle(IpcEvents.getOwnedRoleList, async (_, uid?: string) => getOwnedRoleList(uid))

  IPC.handle(IpcEvents.getPublicRoleList, async () => getPublicRoleList())

  IPC.handle(IpcEvents.getSpiralAbyss, async (_, uid?: string, last?: boolean) => {
    const result = await getSpiralAbyss(uid, last)
    return result
  })

  IPC.handle(IpcEvents.getStoreKey, (_, key: string) => store.get(key))
  IPC.handle(IpcEvents.importGacha, async () => importConfig())
  IPC.handle(IpcEvents.readClipboardText, () => clipboard.readText())

  IPC.handle(IpcEvents.getRepoData, async (_, filename: string) => getRepoData(filename))

  IPC.handle(IpcEvents.getGachaListByUrl, async (_, url: string) => handleGetGachaListByUrl(url))

  IPC.handle(IpcEvents.getGameRecordCard, async (_, bbsId?: string) => getGameRecordCard(bbsId))
  IPC.handle(IpcEvents.openGame, async () => openGame())
}

export default bindIPC
