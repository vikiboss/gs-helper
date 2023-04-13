import { sortGachaList } from './sortGachaList'

import type { GachaData } from '@/types'

// 新旧祈愿数据列表合并算法
export function mergeGachaList(pre: GachaData['list'], list: GachaData['list']) {
  // 先把新旧数据合并到同一个数组
  let results = pre.concat(list)
  // 创建一个 Set，它的值具有唯一性
  const ids = new Set<string>()

  // 通过 id 过滤掉重复的单条数据
  results = results.filter((e) => {
    if (ids.has(e.id)) {
      return false
    }
    return ids.add(e.id)
  })

  // 数据排序
  results = sortGachaList(results)

  // 返回合并后的数据
  return results
}
