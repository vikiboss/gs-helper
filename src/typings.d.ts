import { Cookies } from "electron";
import { Store } from "electron-store";

import { EXPOSED_API_FROM_ELECTRON } from "./constants";

import type { BrowserWindowConstructorOptions } from "electron";
import type { SignInfo } from "./services/getBBSSignStatus";

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
  getBBSSignStatus: () => Promise<SignInfo>;
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

export type RawGachaItem = Omit<
  GachaItem & {
    uid: string;
    lang: string;
  },
  "uigf_gacha_type"
>;

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

export type ElectronWindow = Window &
  typeof globalThis & { [EXPOSED_API_FROM_ELECTRON]: NativeApi };
