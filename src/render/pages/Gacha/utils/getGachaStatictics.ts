import { GachaMap } from "..";
import getListByType from "./getListByType";

import type { GachaData, GachaType } from "../../../../typings";

const getGachaStatictics = (gacha: GachaData) => {
  const map = Object.keys(GachaMap).filter((e) => e !== "newer") as GachaType[];
  const res: {
    all: number;
    number: number;
    comment: string;
    times: number;
    unluckyDays: number;
    name: string;
  }[] = [];
  for (const type of map) {
    // 获取相应祈愿分类的所有数据
    const list = getListByType(gacha.list, type);
    // 存放所有5星的索引（1 开始）
    const i_5 = [];
    for (const [i, e] of list.entries()) if (e.rank_type === "5") i_5.push(i + 1);
    // 5星平均出货次数
    const times = i_5.length ? i_5[i_5.length - 1] / i_5.length : 0;
    // 累计未出5星的次数
    const unluckyDays = list.length - (i_5.length ? i_5[i_5.length - 1] : 0);
    res.push({
      all: list.length,
      number: i_5.length,
      comment:
        times === 0
          ? "欧皇正在酝酿"
          : times >= 80
          ? "最强超级无敌大非酋"
          : times >= 76
          ? "超级无敌大非酋"
          : times >= 72
          ? "无敌大非酋"
          : times >= 68
          ? "大非酋"
          : times >= 64
          ? "非酋本酋"
          : times >= 60
          ? "欧皇本皇"
          : times >= 56
          ? "大欧皇"
          : times >= 52
          ? "无敌大欧皇"
          : times >= 48
          ? "超级无敌大欧皇"
          : times >= 32
          ? "最强超级无敌大欧皇"
          : "宇宙最强超级无敌大欧皇",
      times,
      unluckyDays,
      name: GachaMap[type]
    });
  }
  return res;
};

export default getGachaStatictics;
