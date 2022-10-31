import { GachaMap } from '..';
import getListByType from './getListByType';

import type { GachaData, GachaType } from '../../../../typings';

const getComment = (times: number) => {
  return times === 0
    ? '欧皇正在酝酿'
    : times >= 80
    ? '最强超级无敌大非酋'
    : times >= 76
    ? '超级无敌大非酋'
    : times >= 72
    ? '无敌大非酋'
    : times >= 68
    ? '大非酋'
    : times >= 64
    ? '非酋本酋'
    : times >= 60
    ? '欧皇本皇'
    : times >= 56
    ? '大欧皇'
    : times >= 52
    ? '无敌大欧皇'
    : times >= 48
    ? '超级无敌大欧皇'
    : times >= 32
    ? '最强超级无敌大欧皇'
    : '宇宙最强超级无敌大欧皇';
};

const getGachaStatictics = (gacha: GachaData) => {
  const map = Object.keys(GachaMap).filter((e) => e !== 'newer') as GachaType[];
  const res: {
    all: number;
    prestige: number;
    number: number;
    comment: string;
    times: number;
    // 未出金的抽数
    unluckyDays?: number;
    // 未出紫及以上的抽数
    unluckyDays_4?: number;
    name: string;
  }[] = [];
  for (const type of map) {
    // 获取相应祈愿分类的所有数据
    const list = getListByType(gacha.list, type);
    // 存放所有 5 星的索引（1 开始）
    const i_5 = [];
    for (const [i, e] of list.entries()) if (e.rank_type === '5') i_5.push(i + 1);
    // 存放所有 4 星及以上的索引（1 开始）
    const i_4 = [];
    for (const [i, e] of list.entries()) if (Number(e.rank_type) >= 4) i_4.push(i + 1);
    // 5 星平均出货次数
    const times = i_5.length ? i_5[i_5.length - 1] / i_5.length : 0;
    // 累计未出 5 星的次数
    const unluckyDays = list.length - (i_5.length ? i_5[i_5.length - 1] : 0);
    // 累计未出 4 星的次数
    const unluckyDays_4 = list.length - (i_4.length ? i_4[i_4.length - 1] : 0);
    res.push({
      all: list.length,
      number: i_5.length,
      comment: getComment(times),
      times: Math.round(times),
      prestige: Math.round(times * 160),
      unluckyDays,
      unluckyDays_4,
      name: GachaMap[type]
    });
  }
  const all = res.reduce((p, n) => p = p + n.all, 0);
  const number = res.reduce((p, n) => p = p + n.number, 0);
  const validList = res.filter((e) => e.number !== 0);
  const _times = validList.reduce((p, n) => p = p + Number(n.times) * n.number, 0);
  const count = validList.reduce((p, n) => p = p + n.number, 0);
  const allAverageTimes = _times / (count || 1);
  res.push({
    name: '合计',
    all,
    comment: getComment(allAverageTimes),
    times: Math.round(allAverageTimes),
    number,
    prestige: Math.round(allAverageTimes * 160)
  });
  return res;
};

export default getGachaStatictics;
