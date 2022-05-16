import { Cookies } from "electron";
import { Store } from "electron-store";

import { EXPOSED_API_FROM_ELECTRON } from "./constants";

export interface NativeApi {
  clearCookie: (domain?: string) => Promise<void>;
  closeApp: () => void;
  getAppInfo: () => Promise<AppInfo>;
  getDailyNotes: () => Promise<DailyNotesData>;
  getGachaListByUrl: (url: string) => Promise<GachaData>;
  getGachaUrl: () => Promise<string>;
  getStoreKey: (key: string) => Promise<any>;
  hideApp: () => void;
  loginViaMihoyoBBS: () => void;
  minimizeApp: () => void;
  openLink: (url: string) => void;
  openWindow: (url: string, options?: BrowserWindowConstructorOptions, UA?: string) => void;
  readClipboardText: () => Promise<string>;
  refreshUserInfo: () => Promise<AppData["user"]>;
  setStoreKey: (key: string, value: any) => void;
  writeClipboardText: (text: string) => void;
}

export type GachaItem = {
  gacha_type: string;
  item_id: string;
  count: string;
  time: string;
  name: string;
  item_type: string;
  rank_type: string;
  id: string;
  uigf_gacha_type: string;
};

export type RawGachaItem = GachaItem & {
  uid: string;
  lang: string;
};

export type GachaData = {
  info: {
    uid: string;
    lang: string;
    export_app: string;
    export_app_version: string;
    export_time: string;
    export_timestamp: string;
    uigf_version: string;
  };
  list: GachaItem[];
};

export type AppData = {
  user: {
    uid: string;
    nickname: string;
    level: number;
    isOfficial: boolean;
    regionName: string;
    cookie: string;
  };
  gachas: GachaData[];
  settings: { alwaysOnTop: boolean };
};

export type AppInfo = {
  name: string;
  version: string;
};

export type LoginState = {
  valid: boolean;
  cookies: Cookies;
};

export type ElectronWindow = Window &
  typeof globalThis & { [EXPOSED_API_FROM_ELECTRON]: NativeApi };

export type DispatchItem = {
  avatar_side_icon: string;
  status: string;
  remained_time: string;
};

export type DailyNotesData = {
  current_resin: number;
  max_resin: number;
  resin_recovery_time: string;
  finished_task_num: number;
  total_task_num: number;
  is_extra_task_reward_received: boolean;
  remain_resin_discount_num: number;
  resin_discount_num_limit: number;
  current_expedition_num: number;
  max_expedition_num: number;
  expeditions: DispatchItem[];
  current_home_coin: number;
  max_home_coin: number;
  home_coin_recovery_time: string;
  transformer: {
    obtained: boolean;
    recovery_time: { Day: number; Hour: number; Minute: number; Second: number; reached: true };
  };
};
