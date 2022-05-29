import type { AppData, GachaData, GachaType } from "./typings";
import type { DailyNotesData } from "./services/getDailyNotes";
import type { GameRole } from "./services/getUserGameRolesByCookie";
import type { SignInfo } from "./services/getBBSSignInfo";
import type { SignData } from "./services/getBBSSignData";
import type { MonthInfo } from "./services/getMonthInfo";

// main 进程 与 render 进程进行 IPC 通信的事件常量
export const IPCEvents: Record<string, string> = {
  clearCookie: "CLEAR_COOKIE",
  closeApp: "CLOSE_APP",
  doBBSSign: "DO_BBS_SIGN",
  getAppInfo: "GET_APP_INFO",
  getBBSSignData: "GET_BBS_SIGN_DATA",
  getBBSSignInfo: "GET_BBS_SIGN_INFO",
  getDailyNotes: "GET_DAILY_NOTES",
  getGachaListByUrl: "GET_GACHA_LIST_BY_URL",
  getGachaUrl: "GET_GACHA_URL",
  getHitokoto: "GET_HITOKOTO",
  getMonthInfo: "GET_MONTH_INFO",
  getOwnedRoles: "GET_OWNED_ROLES",
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

export const ANNUCEMENT_DATA_DELAY = "数据可能存在延迟，请以游戏内的实时数据为准。";
export const ANNUCEMENT_OPEN_SOURCE = "本软件使用 MIT 协议开源，仅供学习交流使用。";
export const APP_NAME = "原神助手";
export const GAME_NAME_EN = "Genshin Impact";
export const GAME_NAME_ZH_CN = "原神";
export const LOGIN_TIP = "建议登录 「米游社」 账号以获得最佳使用体验。";
export const WELCOME_TIP = "欢迎你，旅行者。👋";
export const WINDOW_BACKGROUND_COLOR = "#F9F6F2";

export const APP_VERSION = "1.0.0";
export const APP_VERSION_BBS = "2.28.1";
export const APP_USER_AGENT_BBS = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/${APP_VERSION_BBS}`;
export const APP_USER_AGENT_DESKTOP = `Mozilla/5.0 GenshinHelper/${APP_VERSION}`;
export const APP_USER_AGENT_MOBILE = `Mozilla/5.0 Mobile/15E148 GenshinHelper/${APP_VERSION}`;
export const DOMAIN_MIHOYO = "mihoyo.com";
export const EXPOSED_API_FROM_ELECTRON = "nativeApi";
export const GAME_BIZ = "hk4e_cn";

export const LoginGuids = [
  "① 点击 「登录米游社」 按钮打开登录窗口",
  "② 在登录窗口中登录 「米游社」 账号",
  "③ 完成登录后关闭登录窗口",
  "④ 点击 「刷新状态」 按钮完成登录"
];

export const LINK_BBS_REFERER = "https://webstatic.mihoyo.com";
export const LINK_GITHUB_REPO = "https://github.com/vikiboss/genshin-helper";
export const LINK_MIHOYO_BBS_LOGIN = "https://m.bbs.mihoyo.com/ys/#/login";
export const LINK_GENSHIN_MAP = `${LINK_BBS_REFERER}/ys/app/interactive-map`;
export const LINK_BBS_YS_OBC = "https://bbs.mihoyo.com/ys/obc/";

export const API_BBS = "https://bbs-api.mihoyo.com";
export const API_TAKUMI = "https://api-takumi.mihoyo.com";
export const API_TAKUMI_RECORD = "https://api-takumi-record.mihoyo.com";
export const API_HK4E = "https://hk4e-api.mihoyo.com";

export const MAIN_WINDOW_WIDTH = 970;
export const MAIN_WINDOW_HEIGHT = 600;

export const GachaMap: Record<GachaType, string> = {
  activity: "活动祈愿",
  weapon: "武器祈愿",
  normal: "常驻祈愿",
  newer: "新手祈愿"
};

export const Colors: Record<string, string> = {
  blue: "#73abcd",
  purple: "#9779c2",
  golden: "#da9559",
  red: "#da4e55"
};

export const ElementTypes: Record<string, string> = {
  Cryo: "冰",
  Electro: "雷",
  Pyro: "火",
  Anemo: "风",
  Geo: "岩",
  Dendro: "草",
  Hydro: "水"
};

export const Servers: string[] = [
  "cn_gf01", // 1 开头，国区官服-天空岛
  "cn_gf01", // 2 开头，国区官服-天空岛
  "cn_gf01", // 3 开头，国区官服-天空岛
  "cn_gf01", // 4 开头，国区官服-天空岛
  "cn_qd01", // 5 开头，国区渠道服-世界树
  "os_usa", // 6 开头，美国服
  "os_euro", // 7 开头，欧洲服
  "os_aisa", // 8 开头，亚洲服
  "os_cht" // 9 开头，港澳台服
];

export const Menus: Record<string, string> = {
  alwaysOnTop: "置顶显示",
  open: "打开助手",
  openDevTools: "DevTools",
  quit: "退出"
};

export const GachaTypeMap: Record<string, string> = {
  "301": "角色活动祈愿",
  "302": "武器活动祈愿",
  "200": "常驻祈愿",
  "100": "新手祈愿"
};

export const DefaultAppData: AppData = {
  user: {
    uid: "000000000",
    nickname: "旅行者",
    level: 1,
    isOfficial: true,
    regionName: "天空岛",
    cookie: ""
  },
  gachas: [],
  settings: { alwaysOnTop: false, deviceId: "" }
};

export const DefaultGachaData: GachaData = {
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

export const ChartTheme = {
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

export const ScriptRefineBBS = `
var items = ["mhy-bbs-app-header", "mhy-button", "header-bar", "bbs-qr"];
for (const item of items) {
  const els = document.getElementsByClassName(item);
  if (els.length) Array.from(els).forEach((e) => (e.style.display = "none"));
}
`;

export const DefaultNotes: DailyNotesData = {
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

export const DefaultGameData: GameRole = {
  region: "",
  game_biz: "",
  nickname: "",
  level: 0,
  is_official: true,
  region_name: "",
  game_uid: "",
  is_chosen: false
};

export const DefaultSignInfo: SignInfo = {
  total_sign_day: 0,
  today: "2022-01-01",
  is_sign: false,
  first_bind: false,
  is_sub: false,
  month_first: false,
  sign_cnt_missed: 0
};

export const DefaultSignData: SignData = {
  month: 1,
  awards: [],
  resign: true
};

export const DefaultMonthInfo: MonthInfo = {
  uid: 0,
  region: "cn_gf01",
  account_id: 0,
  nickname: "旅行者",
  date: "2022-01-01",
  month: 1,
  optional_month: [],
  data_month: 1,
  data_last_month: 12,
  day_data: {
    current_primogems: 0,
    current_mora: 0,
    last_primogems: 0,
    last_mora: 0
  },
  month_data: {
    current_primogems: 0,
    current_mora: 0,
    last_primogems: 0,
    last_mora: 0,
    current_primogems_level: 0,
    primogems_rate: 0,
    mora_rate: 0,
    group_by: []
  },
  lantern: false
};
