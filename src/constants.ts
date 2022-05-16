import { AppData, DailyNotesData, GachaData } from "./typings.d";
export const APP_NAME = "原神助手";
export const EXPOSED_API_FROM_ELECTRON = "nativeApi";
export const WINDOW_BACKGROUND_COLOR = "#f9f6f2";
export const APP_USER_AGENT_MOBILE = "Mozilla/5.0 Mobile/15E148 GenshinHelper/1.0.0";
export const APP_USER_AGENT_DESKTOP = "Mozilla/5.0 GenshinHelper/1.0.0";
export const APP_USER_AGENT_BBS = "Mozilla/5.0 miHoYoBBS/2.27.1";
export const GAME_NAME_ZH_CN = "原神";
export const GAME_NAME_EN = "Genshin Impact";
export const ANNUCEMENT =
  "本软件使用 MIT 协议开源，部分内容来源于米游社，仅供学习交流使用。数据可能存在延迟，请以游戏内数据为准。";
export const WELCOME_TIP = "欢迎你，旅行者。👋";
export const LOGIN_TIP = "建议登录 「米游社」 账号以获得最佳使用体验。";

export const LOGIN_GUIDES = [
  "① 点击 「登录米游社」 按钮打开登录窗口",
  "② 在登录窗口中登录 「米游社」 账号",
  "③ 完成登录后关闭登录窗口",
  "④ 点击 「刷新状态」 按钮完成登录"
];

export const DOMAIN_MIHOYO = "mihoyo.com";

export const LINK_BBS_REFERER = "https://webstatic.mihoyo.com";
export const LINK_GITHUB_REPO = "https://github.com/vikiboss/genshin-helper";
export const LINK_MIHOYO_BBS_LOGIN = "https://m.bbs.mihoyo.com/ys/#/login";
export const LINK_GENSHIN_MAP = `${LINK_BBS_REFERER}/ys/app/interactive-map`;
export const LINK_BBS_YS_OBC = "https://bbs.mihoyo.com/ys/obc/";

export const API_BBS_BASE = "https://api-takumi.mihoyo.com/binding/api";
export const API_RECORD_BASE = "https://api-takumi-record.mihoyo.com/game_record/app";
export const API_HK4E_BASE = "https://hk4e-api.mihoyo.com";
export const API_GACHA_BASE = `${API_HK4E_BASE}/event/gacha_info/api`;

export const MAIN_WINDOW_WIDTH = 970;
export const MAIN_WINDOW_HEIGHT = 600;

export const COLORS = {
  blue: "#73abcd",
  purple: "#9779c2",
  golden: "#da9559",
  red: "#da4e55"
};

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
  getAppInfo: "GET_APP_INFO",
  getDailyNotes: "GET_DAILY_NOTES",
  getGachaListByUrl: "GET_GACHA_LIST_BY_URL",
  getGachaUrl: "GET_GACHA_URL",
  getStoreKey: "GET_STORE_KEY",
  hideApp: "HIDE_APP",
  loginViaMihoyoBBS: "LOGIN_VIA_MIHOYO_BBS",
  minimizeApp: "MONIMIZE_APP",
  openLink: "OPEN_LINK",
  openWindow: "OPEN_WINDOW",
  readClipboardText: "READ_CLIPBOARD_TEXT",
  refreshUserInfo: "REFRESH_USER_INFO",
  setStoreKey: "SET_STORE_KEY",
  writeClipboardText: "WRITE_CLIPBOARD_TEXT"
};

export const defaultAppData: AppData = {
  user: {
    uid: "000000000",
    nickname: "旅行者",
    level: 1,
    isOfficial: true,
    regionName: "天空岛",
    cookie: ""
  },
  gachas: [],
  settings: { alwaysOnTop: false }
};

export const defaultGachaData: GachaData = {
  info: {
    uid: "",
    lang: "zh-cn",
    export_app: APP_NAME,
    export_app_version: "1.0.0",
    export_time: "",
    export_timestamp: "",
    uigf_version: "v2.2"
  },
  list: []
};

export const CHART_THEME = {
  background: "#f9f6f2",
  textColor: "#333333",
  fontSize: 11,
  axis: {
    domain: {
      line: {
        stroke: "#777777",
        strokeWidth: 1
      }
    },
    legend: {
      text: {
        fontSize: 12,
        fill: "#333333"
      }
    },
    ticks: {
      line: {
        stroke: "#777777",
        strokeWidth: 1
      },
      text: {
        fontSize: 11,
        fill: "#333333"
      }
    }
  },
  grid: {
    line: {
      stroke: "#dddddd",
      strokeWidth: 1
    }
  },
  legends: {
    title: {
      text: {
        fontSize: 12,
        fill: "#3b4354"
      }
    },
    text: {
      fontSize: 11,
      fill: "#3b4354"
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: "#333333"
      }
    }
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: "#333333",
      outlineWidth: 2,
      outlineColor: "#f9f6f2",
      outlineOpacity: 1
    },
    link: {
      stroke: "#000000",
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1
    },
    outline: {
      stroke: "#000000",
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1
    },
    symbol: {
      fill: "#000000",
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1
    }
  },
  tooltip: {
    container: {
      background: "#f9f6f2",
      color: "#3b4354",
      fontSize: 12
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {}
  }
};

export const defaultNotes: DailyNotesData = {
  current_resin: 160,
  max_resin: 160,
  resin_recovery_time: "0",
  finished_task_num: 0,
  total_task_num: 4,
  is_extra_task_reward_received: false,
  remain_resin_discount_num: 3,
  resin_discount_num_limit: 3,
  current_expedition_num: 0,
  max_expedition_num: 5,
  expeditions: [],
  current_home_coin: 900,
  max_home_coin: 900,
  home_coin_recovery_time: "0",
  transformer: {
    obtained: false,
    recovery_time: { Day: 0, Hour: 0, Minute: 0, Second: 0, reached: true }
  }
};

export const SCRIPT_REFINE_BBS = `
var items = ["mhy-bbs-app-header", "mhy-button", "header-bar", "bbs-qr"];
for (const item of items) {
  const els = document.getElementsByClassName(item);
  if (els.length) Array.from(els).forEach((e) => (e.style.display = "none"));
}
`;
