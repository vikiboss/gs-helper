import { ItemTypeMap } from './filterGachaList'
import { NormalItemList } from '../../../../constants'
import getListByType from './getListByType'

import type { GachaData, GachaItemType } from '../../../../typings'

const getAverageTimes = (gacha: GachaData, type: GachaItemType, isLimit = true) => {
  const list = getListByType(gacha.list, type === 'role' ? 'activity' : 'weapon')
  const i5 = []
  for (const [i, e] of list.entries()) {
    const limit = isLimit ? !NormalItemList.includes(e.name) : true
    const isTypeRight = e.item_type === ItemTypeMap[type]
    if (e.rank_type === '5' && isTypeRight && limit) {
      i5.push(i + 1)
    }
  }
  const times = i5.length ? i5[i5.length - 1] / i5.length : 0
  return Math.round(times)
}

export default getAverageTimes
