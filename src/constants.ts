export const APP_NAME = "原神助手";
export const EXPOSED_API_FROM_ELECTRON = "nativeApi";
export const WINDOW_BACKGROUND_COLOR = "#f9f6f2";

export const MAIN_WINDOW_WIDTH = 970;
export const MAIN_WINDOW_HEIGHT = 600;

export const MENU: Record<string, string> = {
  quit: "退出",
  open: `打开助手`,
  alwaysOnTop: "置顶显示",
  openDevTools: "DevTools"
};

export const IPC_EVENTS: Record<string, string> = {
  closeApp: "CLOSE_APP",
  getStoreKey: "GET_STORE_KEY",
  setStoreKey: "SET_STORE_KEY",
  getAppInfo: "GET_APP_INFO",
  hideApp: "HIDE_APP",
  newWindow: "NEW_WINDOW",
  minimizeApp: "MONIMIZE_APP"
};
