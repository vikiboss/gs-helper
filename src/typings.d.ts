import { Cookies } from "electron";
import { Store } from "electron-store";

import { EXPOSED_API_FROM_ELECTRON } from "./constants";

import type { BrowserWindowConstructorOptions as WinOptions } from "electron";
import type { DailyNotesData } from "./services/getDailyNotes";
import type { MonthInfo } from "./services/getMonthInfo";
import type { Role } from "./services/getOwnedRoles";
import type { SignData } from "./services/getBBSSignData";
import type { SignInfo } from "./services/getBBSSignInfo";

export interface NativeApi {
  clearCookie: (domain?: string) => void;
  closeApp: () => void;
  doBBSSign: () => Promise<boolean>;
  getAppInfo: () => Promise<AppInfo>;
  getBBSSignData: () => Promise<SignData | null>;
  getBBSSignInfo: () => Promise<SignInfo | null>;
  getDailyNotes: () => Promise<DailyNotesData | null>;
  getGachaListByUrl: (url: string) => Promise<GachaData>;
  getGachaUrl: () => Promise<string>;
  getHitokoto: () => Promise<string>;
  getMonthInfo: (month?: number) => Promise<MonthInfo | null>;
  getOwnedRoles: () => Promise<Role[]>;
  getStoreKey: (key: string) => Promise<any>;
  hideApp: () => void;
  loginViaMihoyoBBS: () => void;
  minimizeApp: () => void;
  openLink: (url: string) => void;
  openWindow: (url: string, options?: WinOptions, UA?: string) => void;
  readClipboardText: () => Promise<string>;
  refreshUserInfo: () => Promise<AppData["user"]>;
  setStoreKey: (key: string, value: any) => void;
  writeClipboardText: (text: string) => void;
}

export type GachaType = "activity" | "normal" | "weapon" | "newer";
export type ItemType = "weapon" | "role";
export type StarType = 3 | 4 | 5;

export type GachaItem = {
  count: string;
  gacha_type: string;
  id: string;
  item_id: string;
  item_type: string;
  name: string;
  rank_type: string;
  time: string;
  uigf_gacha_type: string;
};

export type RawGachaItem = Omit<
  GachaItem & {
    uid: string;
    lang: string;
  },
  "uigf_gacha_type"
>;

export type GachaData = {
  info: {
    export_app_version: string;
    export_app: string;
    export_time: string;
    export_timestamp: string;
    lang: string;
    uid: string;
    uigf_version: string;
  };
  list: GachaItem[];
};

export type AppData = {
  user: {
    cookie: string;
    isOfficial: boolean;
    level: number;
    nickname: string;
    regionName: string;
    uid: string;
  };
  gachas: GachaData[];
  settings: { alwaysOnTop: boolean; deviceId: string };
};

export type AppInfo = {
  name: string;
  version: string;
};

export type ElectronWindow = Window &
  typeof globalThis & { [EXPOSED_API_FROM_ELECTRON]: NativeApi };
