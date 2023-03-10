import type { EXPOSED_API_FROM_ELECTRON } from './constants'
import type { apis } from './preload'
import type { GameRole } from './services/getGameRoleInfo'

export interface BaseIPCRes<T> {
  ok: boolean
  data: T | null
  message: string
}

export type GachaType = 'activity' | 'normal' | 'weapon' | 'newer'
export type GachaItemType = 'weapon' | 'role'
export type StarType = 1 | 2 | 3 | 4 | 5

export interface AppInfo {
  name: string
  zhName: string
  version: string
  isBeta: boolean
  isDev: boolean
  isWindows: boolean
}

export interface GachaItem {
  count: string
  gacha_type: string
  id: string
  item_id: string
  item_type: string
  name: string
  rank_type: string
  time: string
  uigf_gacha_type: string
}

export type RawGachaItem = Omit<
  GachaItem & {
    uid: string
    lang: string
  },
  'uigf_gacha_type'
>
export interface GachaData {
  info: {
    export_app_version: string
    export_app: string
    export_time: string
    export_timestamp: string
    update_time: string
    lang: string
    uid: string
    uigf_version: string
  }
  list: GachaItem[]
}

export interface BaseRes<T> {
  retcode: number
  data: T | null
  message: string
}

export interface BaseResWithIsOk<T> extends BaseRes<T> {
  isOK: boolean
}

export interface GameRole {
  game_biz: string
  game_uid: string
  is_chosen: boolean
  is_official: boolean
  level: number
  nickname: string
  region_name: string
  region: string
}

export interface GameRolesData {
  list: GameRole[]
}

export interface UserData {
  cookie: string
  uid: string
}

export interface AppData {
  currentUid: string
  users: UserData[]
  settings: {
    alwaysOnTop: boolean
    deviceId: string
    gameDir: string
  }
}

export type NativeApi = typeof apis

export type ElectronWindow = Window & typeof globalThis & { [EXPOSED_API_FROM_ELECTRON]: NativeApi }
