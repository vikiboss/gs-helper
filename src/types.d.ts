export type NativeApi = {
  getAppInfo: () => Promise<{
    name: string;
    version: string;
  }>;
};

export type ElectronWindow = Window & typeof globalThis & { NativeApi: NativeApi };
