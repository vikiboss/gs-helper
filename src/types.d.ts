import { EXPOSED_API_FROM_ELECTRON } from "./constants";

export type AppInfo = {
  name: string;
  version: string;
};

export interface NativeApi {
  getAppInfo: () => Promise<AppInfo>;
}

export type ElectronWindow = Window &
  typeof globalThis & { [EXPOSED_API_FROM_ELECTRON]: NativeApi };
