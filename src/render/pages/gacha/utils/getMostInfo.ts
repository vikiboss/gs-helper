import getListByType from './getListByType'

import type { GachaData, GachaType } from '../../../../typings'

export default function getMostInfo(gacha: GachaData) {
  const predestined = { name: '', count: 0, valid: false }
  const luckest = { name: '', count: 999, valid: false }
  const unluckest = { name: '', count: 0, valid: false }
  const i5 = [] as { count: number; name: string }[]

  for (const type of ['activity', 'weapon', 'normal'] as GachaType[]) {
    const list = getListByType(gacha.list, type)
    let lastIndex = -1
    for (const [i, e] of list.entries()) {
      if (e.rank_type === '5') {
        i5.push({ count: i - lastIndex, name: e.name })
        lastIndex = i
      }
    }
  }

  const memo: Record<string, number> = {}

  for (const e of i5) {
    if (e.count < luckest.count) {
      luckest.name = e.name
      luckest.count = e.count
      luckest.valid = true
    }

    if (e.count > unluckest.count) {
      unluckest.name = e.name
      unluckest.count = e.count
      unluckest.valid = true
    }

    if (memo[e.name]) {
      memo[e.name]++
    } else {
      memo[e.name] = 1
    }
  }

  for (const [k, v] of Object.entries(memo)) {
    if (Number(v) > predestined.count) {
      predestined.name = k
      predestined.count = v
      predestined.valid = true
    }
  }

  return { predestined, luckest, unluckest }
}
