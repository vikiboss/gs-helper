import type { AppData, GachaData, GachaType, GameRole } from "./typings";

// main 进程 与 render 进程进行 IPC 通信的事件常量
export const IPCEvents: Record<string, string> = {
  changeUser: "CHANGE_USER",
  closeApp: "CLOSE_APP",
  deleteUser: "DELETE_USER",
  doBBSSign: "DO_BBS_SIGN",
  getAppInfo: "GET_APP_INFO",
  getBBSSignData: "GET_BBS_SIGN_DATA",
  getBBSSignInfo: "GET_BBS_SIGN_INFO",
  getCalenderList: "GET_CALENDER_LIST",
  getCurrentUser: "GET_CURRENT_USER",
  getDailyNotes: "GET_DAILY_NOTES",
  getGachaListByUrl: "GET_GACHA_LIST_BY_URL",
  getGachaUrl: "GET_GACHA_URL",
  getGameRoleInfo: "GET_GAME_ROLE_INFO",
  getHitokoto: "GET_HITOKOTO",
  getLocalGachaDatas: "GET_LOCAL_GACHA_DATAS",
  getMonthInfo: "GET_MONTH_INFO",
  getOwnedRoleList: "GET_OWNED_ROLE_LIST",
  getPublicRoleList: "GET_PUBLIC_ROLE_LIST",
  getStoreKey: "GET_STORE_KEY",
  getUserRole: "GET_USER_ROLE",
  hideApp: "HIDE_APP",
  loginByBBS: "LOGIN_BY_BBS",
  minimizeApp: "MONIMIZE_APP",
  openLink: "OPEN_LINK",
  openWindow: "OPEN_WINDOW",
  readClipboardText: "READ_CLIPBOARD_TEXT",
  request: "REQUEST",
  setStoreKey: "SET_STORE_KEY",
  writeClipboardText: "WRITE_CLIPBOARD_TEXT"
};

export const APP_NAME = "原神助手";

export const ANNUCEMENT =
  "「原神助手」 使用 MIT 协议开源，软件内的数据与素材主要来源于 「米游社」。数据可能存在延迟，请以游戏内的实时数据为准，详情请参阅 「关于」 页面。";

export const GAME_NAME: Record<string, string> = { "zh-CN": "原神", en: "Genshin Impact" };

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

export const LINK_BBS_REFERER = "https://webstatic.mihoyo.com";
export const LINK_GITHUB_REPO = "https://github.com/vikiboss/genshin-helper";
export const LINK_MIHOYO_BBS_LOGIN = "https://m.bbs.mihoyo.com/ys/#/login";
export const LINK_GENSHIN_MAP = `${LINK_BBS_REFERER}/ys/app/interactive-map`;

export const LINK_BBS_ABYSS = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/46";
export const LINK_BBS_ACTIVITY = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/48";
export const LINK_BBS_ANIMAL = "https://bbs.mihoyo.com/ys/obc/channel/map/189/49";
export const LINK_BBS_BOSS = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/43";
export const LINK_BBS_ELEMENT = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/41";
export const LINK_BBS_FOOD = "https://bbs.mihoyo.com/ys/obc/channel/map/189/21";
export const LINK_BBS_MATERIAL = "https://bbs.mihoyo.com/ys/obc/channel/map/189/13";
export const LINK_BBS_MYSTERY = "https://bbs.mihoyo.com/ys/obc/channel/map/189/54";
export const LINK_BBS_NEWER = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/38";
export const LINK_BBS_OBC = "https://bbs.mihoyo.com/ys/obc";
export const LINK_BBS_PV = "https://bbs.mihoyo.com/ys/obc/channel/map/80";
export const LINK_BBS_RELIQUARY = "https://bbs.mihoyo.com/ys/obc/channel/map/189/218";
export const LINK_BBS_ROLE = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/39";
export const LINK_BBS_STRATEGY = "https://bbs.mihoyo.com/ys/strategy";
export const LINK_BBS_TASK = "https://bbs.mihoyo.com/ys/strategy/channel/map/45/231";
export const LINK_BBS_TEAM = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/40";
export const LINK_BBS_VERSION = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/233";
export const LINK_BBS_WEAPON = "https://bbs.mihoyo.com/ys/obc/channel/map/189/5";

export const API_BBS = "https://bbs-api.mihoyo.com";
export const API_TAKUMI = "https://api-takumi.mihoyo.com";
export const API_TAKUMI_RECORD = "https://api-takumi-record.mihoyo.com";
export const API_HK4E = "https://hk4e-api.mihoyo.com";
export const API_STATIC = "https://api-static.mihoyo.com";
export const API_YS_CONTENT = "https://ys.mihoyo.com/content";

export const GachaMap: Record<GachaType, string> = {
  activity: "活动祈愿",
  weapon: "武器祈愿",
  normal: "常驻祈愿",
  newer: "新手祈愿"
};

export const Colors: Record<string, string> = {
  blue: "#73abcd",
  purple: "#9779c2",
  golden: "#ffa564",
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

export const GachaTypeMap: Record<string, string> = {
  "301": "角色活动祈愿",
  "302": "武器活动祈愿",
  "200": "常驻祈愿",
  "100": "新手祈愿"
};

export const DefaultAppData: AppData = {
  currentUid: "",
  users: [],
  settings: { alwaysOnTop: false, deviceId: "" }
};

export const DefaultGameRole: GameRole = {
  game_biz: "hk4e_cn",
  game_uid: "00000000",
  is_chosen: true,
  is_official: true,
  level: 1,
  nickname: "旅行者",
  region_name: "天空岛",
  region: "cn_gf01"
};

export const DefaultGachaData: GachaData = {
  info: {
    uid: "",
    lang: "zh-cn",
    export_app: APP_NAME,
    export_app_version: "1.0.0",
    export_time: "",
    export_timestamp: "",
    update_time: "",
    uigf_version: "v2.2"
  },
  list: []
};

// nivo 图表库的主题数据
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
