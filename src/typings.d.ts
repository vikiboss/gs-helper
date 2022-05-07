import { Store } from "electron-store";
import { EXPOSED_API_FROM_ELECTRON } from "./constants";

export type AppInfo = {
  name: string;
  version: string;
};

export interface NativeApi {
  closeApp: () => void;
  hideApp: () => void;
  minimizeApp: () => void;

  getAppInfo: () => Promise<AppInfo>;
  getStoreKey(key: string): Promise<any>;
  setStoreKey(key: string, value: any): Promise<any>;
}

export type ElectronWindow = Window &
  typeof globalThis & { [EXPOSED_API_FROM_ELECTRON]: NativeApi };
