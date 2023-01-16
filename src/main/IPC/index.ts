import { app, clipboard, ipcMain as ipc } from 'electron'

import { AppName, IpcEvents as ies } from '../../constants'
import { changeUser, deleteUser } from '../handleUsers'
import { clearData } from './clearData'
import { doBBSSign } from '../../services/doBBSSign'
import { exportGacha, importGacha } from './handleGachaFile'
import { getBBSSignData } from '../../services/getBBSSignData'
import { getBBSSignInfo } from '../../services/getBBSSignInfo'
import { getCabinetRoleList } from '../../services/getCabinetRoleList'
import { getCalenderList } from '../../services/getCalenderList'
import { getCurrentUser } from './getCurrentUser'
import { getDailyNotes } from '../../services/getDailyNotes'
import { getGachaUrl } from './getGachaUrl'
import { getGameRecordCard } from '../../services/getGameRecordCard'
import { getGameRoleCard } from '../../services/getGameRoleCard'
import { getGameRoleInfo } from '../../services/getGameRoleInfo'
import { getHitokoto } from '../../services/getHitokoto'
import { getLocalGachaData } from './getLocalGachaData'
import { getMonthInfo } from '../../services/getMonthInfo'
import { getOwnedRoleList } from '../../services/getOwnedRoleList'
import { getPublicRoleList } from '../../services/getPublicRoleList'
import { getRepoData } from '../../services/getRepoData'
import { getSpiralAbyss } from '../../services/getSpiralAbyss'
import { handleGetGachaListByUrl } from './getGachaListByUrl'
import { loginByBBS } from './loginByBBS'
import { openGame } from './openGame'
import { openWindow } from './openWindow'
import { store } from '..'

import type { BrowserWindow } from 'electron'
import type { AppInfo } from '../../typings'

const AppicationInfo: AppInfo = {
  name: AppName.en,
  zhName: AppName.zh,
  version: app.getVersion(),
  isBeta: true,
  isDev: !app.isPackaged,
  isWindows: process.platform === 'win32'
}

export function bindIPC(win: BrowserWindow) {
  ipc.on(ies.closeApp, () => app.exit(0))
  ipc.on(ies.deleteUser, (_, uid: string) => deleteUser(uid))
  ipc.on(ies.hideApp, () => win.hide())
  ipc.on(ies.loginByBBS, loginByBBS)
  ipc.on(ies.minimizeApp, () => win.minimize())
  ipc.on(ies.openWindow, openWindow)
  ipc.on(ies.setStoreKey, (_, key: string, value: any) => store.set(key, value))
  ipc.on(ies.writeClipboard, (_, text: string) => clipboard.writeText(text))

  ipc.handle(ies.changeUser, async (_, uid: string) => changeUser(uid))
  ipc.handle(ies.clearData, async () => clearData())
  ipc.handle(ies.doBBSSign, async () => doBBSSign())
  ipc.handle(ies.exportGacha, async (_, uid: string) => exportGacha(uid))
  ipc.handle(ies.getAppInfo, () => AppicationInfo)
  ipc.handle(ies.getBBSSignData, async () => getBBSSignData())
  ipc.handle(ies.getBBSSignInfo, async () => getBBSSignInfo())
  ipc.handle(ies.getCabinetRoles, async (_, uid: string) => getCabinetRoleList(uid))
  ipc.handle(ies.getCalenderEvents, async () => getCalenderList())
  ipc.handle(ies.getCurrentUser, () => getCurrentUser())
  ipc.handle(ies.getDailyNotes, async () => getDailyNotes())
  ipc.handle(ies.getGachaListByUrl, async (_, url: string) => handleGetGachaListByUrl(url))
  ipc.handle(ies.getGachaUrl, async () => getGachaUrl())
  ipc.handle(ies.getGameRecordCard, async (_, bbsId?: string) => getGameRecordCard(bbsId))
  ipc.handle(ies.getGameRoleCard, async (_, uid?: string) => getGameRoleCard(uid))
  ipc.handle(ies.getGameRoleInfo, async () => getGameRoleInfo())
  ipc.handle(ies.getHitokoto, async () => getHitokoto())
  ipc.handle(ies.getLocalGachaData, () => getLocalGachaData())
  ipc.handle(ies.getMonthInfo, async (_, month?: number) => getMonthInfo(month))
  ipc.handle(ies.getOwnedRoles, async (_, uid?: string) => getOwnedRoleList(uid))
  ipc.handle(ies.getPublicRoles, async () => getPublicRoleList())
  ipc.handle(ies.getRepoData, async (_, filename: string) => getRepoData(filename))
  ipc.handle(ies.getStoreKey, (_, key: string) => store.get(key))
  ipc.handle(ies.importGacha, async () => importGacha())
  ipc.handle(ies.openGame, async () => openGame())
  ipc.handle(ies.readClipboard, () => clipboard.readText())

  ipc.handle(
    ies.getSpiralAbyss,
    async (_, uid?: string, last?: boolean) => await getSpiralAbyss(uid, last)
  )
}
