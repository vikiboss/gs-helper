// main 进程 与 render 进程进行 IPC 通信的事件常量
export const IPCEvents: Record<string, string> = {
  changeUser: "CHANGE_USER",
  closeApp: "CLOSE_APP",
  clearData: "CLEAR_DATA",
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
  getGameRecordCard: "GET_GAME_RECORD_CARD",
  getGameRoleCard: "GET_GAME_ROLE_CARD",
  getGameRoleInfo: "GET_GAME_ROLE_INFO",
  getHitokoto: "GET_HITOKOTO",
  getLocalGachaDatas: "GET_LOCAL_GACHA_DATAS",
  getMonthInfo: "GET_MONTH_INFO",
  getOwnedRoleList: "GET_OWNED_ROLE_LIST",
  getPublicRoleList: "GET_PUBLIC_ROLE_LIST",
  getSpiralAbyss: "GET_SPIRAL_ABYSS",
  getStoreKey: "GET_STORE_KEY",
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

export const EXPOSED_API_FROM_ELECTRON = "nativeApi";

export const GAME_NAME: Record<string, string> = { "zh-CN": "原神", en: "Genshin Impact" };
export const APP_USER_AGENT_BBS = `Mozilla/5.0 miHoYoBBS/2.32.1`;
export const APP_USER_AGENT_DESKTOP = `Mozilla/5.0 GenshinHelper/`;
export const APP_USER_AGENT_MOBILE = `Mozilla/5.0 Mobile/15E148 GenshinHelper/`;
export const GAME_BIZ = "hk4e_cn";

export const LINK_BBS_REFERER = "https://webstatic.mihoyo.com";
export const LINK_GITHUB_REPO = "https://github.com/vikiboss/genshin-helper";
export const LINK_MIHOYO_BBS_LOGIN = "https://m.bbs.mihoyo.com/ys/#/login";
export const LINK_GENSHIN_MAP = `${LINK_BBS_REFERER}/ys/app/interactive-map`;

export const API_BBS = "https://bbs-api.mihoyo.com";
export const API_TAKUMI = "https://api-takumi.mihoyo.com";
export const API_TAKUMI_RECORD = "https://api-takumi-record.mihoyo.com";
export const API_HK4E = "https://hk4e-api.mihoyo.com";
export const API_STATIC = "https://api-static.mihoyo.com";
export const API_YS_CONTENT = "https://ys.mihoyo.com/content";

export const ElementTypes: Record<string, string> = {
  Cryo: "冰",
  Electro: "雷",
  Pyro: "火",
  Anemo: "风",
  Geo: "岩",
  Dendro: "草",
  Hydro: "水"
};

export const GachaTypeMap: Record<string, string> = {
  "301": "角色活动祈愿",
  "400": "角色活动祈愿2",
  "302": "武器活动祈愿",
  "200": "常驻祈愿",
  "100": "新手祈愿"
};

export const NormalItemList: string[] = [
  "刻晴",
  "莫娜",
  "七七",
  "迪卢克",
  "琴",
  "阿莫斯之弓",
  "天空之翼",
  "四风原典",
  "天空之卷",
  "和璞鸢",
  "天空之脊",
  "狼的末路",
  "天空之傲",
  "天空之刃",
  "风鹰剑"
];

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
