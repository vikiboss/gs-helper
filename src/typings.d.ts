import { Cookies } from "electron";
import { Store } from "electron-store";

import { EXPOSED_API_FROM_ELECTRON } from "./constants";

export type AppInfo = {
  name: string;
  version: string;
};

export type LoginState = {
  valid: boolean;
  cookies: Cookies;
};

export type UserInfo = {
  buid: string;
  cookie: string;
};

export interface NativeApi {
  closeApp: () => void;
  hideApp: () => void;
  minimizeApp: () => void;
  login: () => void;

  getAppInfo: () => Promise<AppInfo>;
  getStoreKey: (key: string) => Promise<any>;
  setStoreKey: (key: string, value: any) => Promise<void>;
  clearCookie: (domain?: string) => Promise<void>;
  getGachaUrl: () => Promise<string>;
}

export type ElectronWindow = Window &
  typeof globalThis & { [EXPOSED_API_FROM_ELECTRON]: NativeApi };
