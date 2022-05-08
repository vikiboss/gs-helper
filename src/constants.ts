export const APP_NAME = "原神助手";
export const EXPOSED_API_FROM_ELECTRON = "nativeApi";
export const WINDOW_BACKGROUND_COLOR = "#f9f6f2";
export const APP_USER_AGENT = "Mozilla/5.0 Mobile/15E148 GenshinHelper/1.0.0";
export const GAME_NAME_ZH_CN = "原神";
export const GAME_NAME_EN = "Genshin Impact";

export const API_WEB_BASE = "https://bbs-api.mihoyo.com/user/wapi";
export const API_AUTH_BASE = "https://api-takumi.mihoyo.com/auth/api";

export const API_AUTH_GET_USER_INFO_BY_TOKEN = `${API_AUTH_BASE}/getUserAccountInfoByLToken`;

export const MAIN_WINDOW_WIDTH = 970;
export const MAIN_WINDOW_HEIGHT = 600;

export const MENU: Record<string, string> = {
  alwaysOnTop: "置顶显示",
  open: `打开助手`,
  openDevTools: "DevTools",
  quit: "退出"
};

export const IPC_EVENTS: Record<string, string> = {
  clearCookie: "CLEAR_COOKIE",
  closeApp: "CLOSE_APP",
  getAppInfo: "GET_APP_INFO",
  getGachaUrl: "GET_GACHA_URL",
  getStoreKey: "GET_STORE_KEY",
  hideApp: "HIDE_APP",
  login: "LOGIN_VIA_MIHOYO_BBS",
  minimizeApp: "MONIMIZE_APP",
  setStoreKey: "SET_STORE_KEY"
};