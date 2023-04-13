import getListByType from './getListByType'
import { NormalItemList } from '../../../../constants'

import type { GachaData } from '../../../../typings'

export default function getLuckInfo(gacha: GachaData) {
  let count = 0
  let miss = 0

  // 0 为 小保底，1 为大保底
  let status = 0

  const ActivityList = getListByType(gacha.list, 'activity')

  for (const e of ActivityList) {
    if (e.rank_type === '5') {
      if (status === 1) {
        status = 0
      } else {
        const isMiss = NormalItemList.includes(e.name)
        count++

        if (isMiss) {
          miss++
        }

        status = isMiss ? 1 : 0
      }
    }
  }
  return { count, miss, rate: ((100 * miss) / (count || 1)).toFixed(2) }
}
