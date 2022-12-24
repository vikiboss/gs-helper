// main 进程 与 render 进程进行 IPC 通信的事件常量
export const IpcEvents = {
  changeUser: 'CHANGE_USER',
  closeApp: 'CLOSE_APP',
  clearData: 'CLEAR_DATA',
  deleteUser: 'DELETE_USER',
  doBBSSign: 'DO_BBS_SIGN',
  getAppInfo: 'GET_APP_INFO',
  getBBSSignData: 'GET_BBS_SIGN_DATA',
  getBBSSignInfo: 'GET_BBS_SIGN_INFO',
  getCalenderEvents: 'GET_CALENDER_EVENTS',
  getCabinetRoles: 'GET_CABINET_ROLES',
  getCurrentUser: 'GET_CURRENT_USER',
  getDailyNotes: 'GET_DAILY_NOTES',
  getGachaListByUrl: 'GET_GACHA_LIST_BY_URL',
  getGachaUrl: 'GET_GACHA_URL',
  getGameRecordCard: 'GET_GAME_RECORD_CARD',
  getGameRoleCard: 'GET_GAME_ROLE_CARD',
  getGameRoleInfo: 'GET_GAME_ROLE_INFO',
  getHitokoto: 'GET_HITOKOTO',
  getLocalGachaDatas: 'GET_LOCAL_GACHA_DATAS',
  getMonthInfo: 'GET_MONTH_INFO',
  getOwnedRoles: 'GET_OWNED_ROLES',
  getPublicRoles: 'GET_PUBLIC_ROLES',
  getSpiralAbyss: 'GET_SPIRAL_ABYSS',
  getStoreKey: 'GET_STORE_KEY',
  getRepoData: 'GET_REPO_DATA',
  hideApp: 'HIDE_APP',
  importGacha: 'IMPORT_GACHA',
  loginByBBS: 'LOGIN_BY_BBS',
  minimizeApp: 'MONIMIZE_APP',
  openGame: 'OPEN_GAME',
  openWindow: 'OPEN_WINDOW',
  readClipboard: 'READ_CLIPBOARD',
  request: 'REQUEST',
  setStoreKey: 'SET_STORE_KEY',
  writeClipboard: 'WRITE_CLIPBOARD',
  exportGacha: 'EXPORT_GACHA'
} as const

export const EXPOSED_API_FROM_ELECTRON = 'nativeApi'
export const BBS_VERSION = '2.42.1'

export const AppName = {
  zh: '原神助手',
  en: 'Genshin Helper'
} as const

export const GAME_NAME = {
  zh: '原神',
  en: 'Genshin Impact'
} as const

export const APP_USER_AGENT_BBS = `Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/${BBS_VERSION}`
export const APP_USER_AGENT_DESKTOP = 'Mozilla/5.0 GenshinHelper/'
export const APP_USER_AGENT_MOBILE = 'Mozilla/5.0 Mobile/15E148 GenshinHelper/'
export const GAME_BIZ = 'hk4e_cn'

export const LINK_BBS_REFERER = 'https://webstatic.mihoyo.com/'
export const LINK_GITHUB_REPO = 'https://github.com/vikiboss/genshin-helper'
export const LINK_MIHOYO_BBS_LOGIN = 'https://m.bbs.mihoyo.com/ys/'
export const LINK_GENSHIN_MAP = 'https://webstatic.mihoyo.com/ys/app/interactive-map'

export const API_BBS = 'https://bbs-api.mihoyo.com'
export const API_TAKUMI = 'https://api-takumi.mihoyo.com'
export const API_TAKUMI_RECORD = 'https://api-takumi-record.mihoyo.com'
export const API_HK4E = 'https://hk4e-api.mihoyo.com'
export const API_STATIC = 'https://api-static.mihoyo.com'
export const API_YS_CONTENT = 'https://ys.mihoyo.com/content'
export const API_REPO_DATA = 'https://gh-raw.deno.dev/vikiboss/genshin-helper/main/data'
export const API_REPO_DATA_BAK = 'https://raw.fastgit.org/vikiboss/genshin-helper/main/data'

export const ElementTypes: Record<string, string> = {
  Cryo: '冰',
  Electro: '雷',
  Pyro: '火',
  Anemo: '风',
  Geo: '岩',
  Dendro: '草',
  Hydro: '水'
}

export const GachaTypeMap: Record<string, string> = {
  301: '角色活动祈愿',
  400: '角色活动祈愿2',
  302: '武器活动祈愿',
  200: '常驻祈愿',
  100: '新手祈愿'
}

export const TypeToUIGFTypeMap: Record<string, string> = {
  100: '100',
  200: '200',
  301: '301',
  400: '301',
  302: '302'
}

export const NormalItemList: string[] = [
  '刻晴',
  '莫娜',
  '七七',
  '迪卢克',
  '琴',
  '阿莫斯之弓',
  '天空之翼',
  '四风原典',
  '天空之卷',
  '和璞鸢',
  '天空之脊',
  '狼的末路',
  '天空之傲',
  '天空之刃',
  '风鹰剑',
  '提纳里'
]

// nivo 图表库的主题数据
export const ChartTheme = {
  background: '#f9f6f2',
  textColor: '#333333',
  fontSize: 11,
  axis: {
    domain: {
      line: {
        stroke: '#777777',
        strokeWidth: 1
      }
    },
    legend: {
      text: {
        fontSize: 12,
        fill: '#333333'
      }
    },
    ticks: {
      line: {
        stroke: '#777777',
        strokeWidth: 1
      },
      text: {
        fontSize: 11,
        fill: '#333333'
      }
    }
  },
  grid: {
    line: {
      stroke: '#dddddd',
      strokeWidth: 1
    }
  },
  legends: {
    title: {
      text: {
        fontSize: 12,
        fill: '#3b4354'
      }
    },
    text: {
      fontSize: 11,
      fill: '#3b4354'
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: '#333333'
      }
    }
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: '#333333',
      outlineWidth: 2,
      outlineColor: '#f9f6f2',
      outlineOpacity: 1
    },
    link: {
      stroke: '#000000',
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1
    },
    outline: {
      stroke: '#000000',
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1
    },
    symbol: {
      fill: '#000000',
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1
    }
  },
  tooltip: {
    container: {
      background: '#f9f6f2',
      color: '#3b4354',
      fontSize: 12
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {}
  }
}
