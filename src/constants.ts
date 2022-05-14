export const APP_NAME = "原神助手";
export const EXPOSED_API_FROM_ELECTRON = "nativeApi";
export const WINDOW_BACKGROUND_COLOR = "#f9f6f2";
export const APP_USER_AGENT_MOBILE = "Mozilla/5.0 Mobile/15E148 GenshinHelper/1.0.0";
export const APP_USER_AGENT_DESKTOP = "Mozilla/5.0 GenshinHelper/1.0.0";
export const APP_USER_AGENT_BBS = "Mozilla/5.0 miHoYoBBS/2.27.1";
export const GAME_NAME_ZH_CN = "原神";
export const GAME_NAME_EN = "Genshin Impact";
export const ANNUCEMENT = "本工具使用 MIT 协议开源，部分内容来源于米游社，仅供学习交流，开源地址：";

export const DOMAIN_MIHOYO = "mihoyo.com";

export const LINK_GITHUB_REPO = "https://github.com/vikiboss/genshin-helper";
export const LINK_MIHOYO_BBS_LOGIN = "https://m.bbs.mihoyo.com/ys/#/login";
export const LINK_GENSHIN_MAP = "https://webstatic.mihoyo.com/ys/app/interactive-map";
export const LINK_BBS_YS_OBC = "https://bbs.mihoyo.com/ys/obc/";

export const API_WEB_BASE = "https://bbs-api.mihoyo.com/user/wapi";
export const API_GACHA_BASE = "https://hk4e-api.mihoyo.com/event/gacha_info/api";

export const MAIN_WINDOW_WIDTH = 970;
export const MAIN_WINDOW_HEIGHT = 600;

export const MENU: Record<string, string> = {
  alwaysOnTop: "置顶显示",
  open: "打开助手",
  openDevTools: "DevTools",
  quit: "退出"
};

export const GACHA_TYPES: Record<string, string> = {
  "301": "角色活动祈愿",
  "302": "武器活动祈愿",
  "200": "常驻祈愿",
  "100": "新手祈愿"
};

export const IPC_EVENTS: Record<string, string> = {
  clearCookie: "CLEAR_COOKIE",
  closeApp: "CLOSE_APP",
  openLink: "OPEN_LINK",
  openWindow: "OPEN_WINDOW",
  getAppInfo: "GET_APP_INFO",
  getGachaUrl: "GET_GACHA_URL",
  getStoreKey: "GET_STORE_KEY",
  getGachaListByUrl: "GET_GACHA_LIST_BY_URL",
  hideApp: "HIDE_APP",
  loginViaMihoyoBBS: "LOGIN_VIA_MIHOYO_BBS",
  minimizeApp: "MONIMIZE_APP",
  setStoreKey: "SET_STORE_KEY"
};

export const SCRIPT_REFINE_BBS = `
var items = ["mhy-bbs-app-header", "mhy-button", "app-guide", "header-bar", "bbs-qr"];
for (const item of items) {
  const els = document.getElementsByClassName(item);
  if (els.length) Array.from(els).forEach((e) => (e.style.display = "none"));
}
`;
