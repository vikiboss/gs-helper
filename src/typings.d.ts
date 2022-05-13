import { Cookies } from "electron";
import { Store } from "electron-store";

import { EXPOSED_API_FROM_ELECTRON } from "./constants";

export interface NativeApi {
  closeApp: () => void;
  hideApp: () => void;
  minimizeApp: () => void;
  openLink: (url: string) => void;
  openWindow: (url: string, options?: BrowserWindowConstructorOptions, UA?: string) => void;
  loginViaMihoyoBBS: () => void;
  getAppInfo: () => Promise<AppInfo>;
  getStoreKey: (key: string) => Promise<any>;
  setStoreKey: (key: string, value: any) => void;
  clearCookie: (domain?: string) => Promise<void>;
  getGachaUrl: () => Promise<string>;
  getGachaListByUrl: (url: string) => Promise<GachaData>;
}

export type GachaItem = {
  00;
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
    buid: string;
    nickname: string;
    introduce: string;
    avatar: string;
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
