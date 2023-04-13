import getListByType from './getListByType'
import { GachaMap } from '..'

import type { GachaData, GachaType } from '@/types'

function getComment(count: number) {
  // 抽卡期望 62 抽，以此为分界线，上下展开, 分为九个区间
  // >=80, 79-76, 75-70, 69-65, 64-60, 59-53, 53-48, 47-18, <=17

  switch (true) {
    case count >= 80:
      return '超级无敌大非酋'
    case count >= 76:
      return '无敌大非酋'
    case count >= 70:
      return '大非酋'
    case count >= 65:
      return '非酋'
    case count >= 60:
      return '中规中矩'
    case count >= 53:
      return '欧皇'
    case count >= 48:
      return '大欧皇'
    case count >= 18:
      return '大欧皇'
    case count >= 1:
      return '超级无敌大欧皇'
    default: // <= 0
      return '欧皇正在酝酿'
  }
}

export default function getGachaStatistics(gacha: GachaData) {
  const map = Object.keys(GachaMap).filter((e) => e !== 'newer') as GachaType[]

  const res: {
    all: number
    prestige: number
    number: number
    comment: string
    times: number
    // 未出金的抽数
    unluckyDays?: number
    // 未出紫的抽数
    unluckyDays_4?: number
    name: string
  }[] = []

  for (const type of map) {
    // 获取相应祈愿分类的所有数据
    const list = getListByType(gacha.list, type)
    // 存放所有 5 星的索引（1 开始）
    const i5 = []

    for (const [i, e] of list.entries()) {
      if (e.rank_type === '5') i5.push(i + 1)
    }

    // 存放所有 4 星及以上的索引（1 开始）
    const i4 = []

    for (const [i, e] of list.entries()) {
      if (Number(e.rank_type) === 4) i4.push(i + 1)
    }

    // 5 星平均出货次数
    const times = i5.length ? i5[i5.length - 1] / i5.length : 0
    // 累计未出 5 星的次数
    const unluckyDays = list.length - (i5.length ? i5[i5.length - 1] : 0)
    // 累计未出 4 星的次数
    const unluckyDays4 = list.length - (i4.length ? i4[i4.length - 1] : 0)

    res.push({
      all: list.length,
      number: i5.length,
      comment: getComment(times),
      times: Math.round(times),
      prestige: Math.round(times * 160),
      unluckyDays,
      unluckyDays_4: unluckyDays4,
      name: GachaMap[type]
    })
  }

  const all = res.reduce((p, n) => p + n.all, 0)
  const number = res.reduce((p, n) => p + n.number, 0)
  const validList = res.filter((e) => e.number !== 0)
  const times = validList.reduce((p, n) => p + Number(n.times) * n.number, 0)
  const count = validList.reduce((p, n) => p + n.number, 0)
  const allAverageTimes = times / (count || 1)

  res.push({
    name: '合计',
    all,
    comment: getComment(allAverageTimes),
    times: Math.round(allAverageTimes),
    number,
    prestige: Math.round(allAverageTimes * 160)
  })

  return res
}
