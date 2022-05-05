export type ContextApi = {
  getAppInfo: () => Promise<{
    name: string;
    version: string;
  }>;
};
