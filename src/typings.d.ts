import { EXPOSED_API_FROM_ELECTRON } from "./constants";

import type { AxiosRequestConfig as Config, AxiosResponse } from "axios";
import type { BrowserWindowConstructorOptions as WinOptions } from "electron";
import type { Cookies } from "electron";
import type { GachaData, AppInfo } from "./typings";
import type { Store } from "electron-store";

export interface NativeApi {
  closeApp: () => void;
  deleteUser: (uid?: string) => void;
  doBBSSign: () => Promise<boolean>;
  getAppInfo: () => Promise<AppInfo>;
  getBBSSignData: () => Promise<SignData | null>;
  getBBSSignInfo: () => Promise<SignInfo | null>;
  getCalenderList: () => Promise<CalenderEvent[] | null>;
  getCurrentUser: () => Promise<UserData | null>;
  getDailyNotes: () => Promise<DailyNotesData | null>;
  getGachaListByUrl: (url: string) => Promise<GachaData>;
  getGachaUrl: () => Promise<string>;
  getGameRoleInfo: () => Promise<GameRole | null>;
  getHitokoto: () => Promise<string>;
  getMonthInfo: (month?: number) => Promise<MonthInfo | null>;
  getOwnedRoleList: () => Promise<Role[] | null>;
  getPublicRoleList: () => Promise<PublicRole[] | null>;
  getLocalGachaDatas: () => Promise<GachaData[]>;
  getStoreKey: (key: string) => Promise<any>;
  getUserRole: () => Promise<GameRole | null>;
  hideApp: () => void;
  loginByBBS: () => void;
  minimizeApp: () => void;
  openLink: (url: string) => void;
  openWindow: (url: string, options?: WinOptions, UA?: string) => void;
  readClipboardText: () => Promise<string>;
  request: <T>(config: Config) => Promise<AxiosResponse<T>>;
  setStoreKey: (key: string, value: any) => void;
  writeClipboardText: (text: string) => void;
}

export type GachaType = "activity" | "normal" | "weapon" | "newer";
export type GachaItemType = "weapon" | "role";
export type StarType = 1 | 2 | 3 | 4 | 5;

export interface AppInfo {
  name: string;
  version: string;
}

export interface GachaItem {
  count: string;
  gacha_type: string;
  id: string;
  item_id: string;
  item_type: string;
  name: string;
  rank_type: string;
  time: string;
  uigf_gacha_type: string;
}

export type RawGachaItem = Omit<
  GachaItem & {
    uid: string;
    lang: string;
  },
  "uigf_gacha_type"
>;
export interface GachaData {
  info: {
    export_app_version: string;
    export_app: string;
    export_time: string;
    export_timestamp: string;
    update_time: string;
    lang: string;
    uid: string;
    uigf_version: string;
  };
  list: GachaItem[];
}

export interface BaseRes<T> {
  retcode: number;
  data: T | null;
  message: string;
}

export interface GameRole {
  game_biz: string;
  game_uid: string;
  is_chosen: boolean;
  is_official: boolean;
  level: number;
  nickname: string;
  region_name: string;
  region: string;
}

export interface GameRolesData {
  list: GameRole[];
}

export interface UserData {
  cookie: string;
  uid: string;
}

export interface AppData {
  currentUid: string;
  users: UserData[];
  settings: { alwaysOnTop: boolean; deviceId: string };
}

export type ElectronWindow = Window &
  typeof globalThis & { [EXPOSED_API_FROM_ELECTRON]: NativeApi };
