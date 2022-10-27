import request from '../utils/request';
import { API_REPO_DATA } from '../constants';

const Api = `${API_REPO_DATA}/strategies.json`;

const DefaultsStrategyList: StrategyItem[] =[
  {
    name: "观测枢 - 攻略",
    url: "https://bbs.mihoyo.com/ys/strategy"
  },
  {
    name: "观测枢 - 百科",
    url: "https://bbs.mihoyo.com/ys/obc"
  },
  {
    name: "任务手册",
    url: "https://bbs.mihoyo.com/ys/strategy/channel/map/45/231"
  },
  {
    name: "活动集锦",
    url: "https://bbs.mihoyo.com/ys/strategy/channel/map/37/48"
  },
  {
    name: "版本合集",
    url: "https://bbs.mihoyo.com/ys/strategy/channel/map/37/233"
  },
  {
    name: "角色攻略",
    url: "https://bbs.mihoyo.com/ys/strategy/channel/map/37/39"
  },
  {
    name: "装备解析",
    url: "https://bbs.mihoyo.com/ys/obc/channel/map/189/5"
  },
  {
    name: "圣遗物图鉴",
    url: "https://bbs.mihoyo.com/ys/obc/channel/map/189/218"
  },
  {
    name: "阵容攻略",
    url: "https://bbs.mihoyo.com/ys/strategy/channel/map/37/40"
  },
  {
    name: "新手合集",
    url: "https://bbs.mihoyo.com/ys/strategy/channel/map/37/38"
  },
  {
    name: "材料图鉴",
    url: "https://bbs.mihoyo.com/ys/obc/channel/map/189/13"
  },
  {
    name: "动物图鉴",
    url: "https://bbs.mihoyo.com/ys/obc/channel/map/189/49"
  },
  {
    name: "讨伐BOSS",
    url: "https://bbs.mihoyo.com/ys/strategy/channel/map/37/43"
  },
  {
    name: "元素攻略",
    url: "https://bbs.mihoyo.com/ys/strategy/channel/map/37/41"
  },
  {
    name: "料理大全",
    url: "https://bbs.mihoyo.com/ys/obc/channel/map/189/21"
  },
  {
    name: "秘境图鉴",
    url: "https://bbs.mihoyo.com/ys/obc/channel/map/189/54"
  },
  {
    name: "深境螺旋",
    url: "https://bbs.mihoyo.com/ys/strategy/channel/map/37/46"
  },
  {
    name: "PV合辑",
    url: "https://bbs.mihoyo.com/ys/obc/channel/map/80"
  },
  {
    name: "你的影月月 (B站)",
    url: "https://space.bilibili.com/431073645/video?tid=4&keyword=&order=pubdate"
  },
  {
    name: "莴苣某人 (B站)",
    url: "https://space.bilibili.com/1773346/video?tid=4&keyword=&order=pubdate"
  }
];

export interface StrategyItem {
  name: string,
  url: string,
  hightlight?: boolean;
  alt?: string
}

const getStrategyList = async (): Promise<StrategyItem[]> => {
  try {
    const { status, data } = await request.get<StrategyItem[]>(Api);
    return status === 200 ? data : DefaultsStrategyList;
  } catch {
    return DefaultsStrategyList;
  }
};

export default getStrategyList;
