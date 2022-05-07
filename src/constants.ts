export const APP_NAME = "原神助手";
export const EXPOSED_API_FROM_ELECTRON = "nativeApi";
export const WINDOW_BACKGROUND_COLOR = "#f9f6f2";
export const APP_USER_AGENT = "Mozilla/5.0 Mobile/15E148 GenshinHelper/1.0.0";

export const API_WEB_BASE = "https://bbs-api.mihoyo.com/user/wapi";
export const API_AUTH_BASE = "https://api-takumi.mihoyo.com/auth/api";

export const API_AUTH_GET_USER_INFO_BY_TOKEN = `${API_AUTH_BASE}/getUserAccountInfoByLToken`;

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
  minimizeApp: "MONIMIZE_APP",
  login: "LOGIN_VIA_MIHOYO_BBS",
  loginCallback: "LOGIN_VIA_MIHOYO_BBS_CALLBACK"
};
