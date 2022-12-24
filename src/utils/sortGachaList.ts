import type { GachaData } from '../typings'

// 通过 id （时间）进行列表排序
export function sortGachaList(list: GachaData['list']) {
  list.sort((p, n) => {
    // 前九位代表一个时间段，每个小时过六分
    const time = Number(p.id.slice(0, 9)) - Number(n.id.slice(0, 9))
    // 后面的数字代表抽卡次序，每个时间段内依次递增
    const order = Number(p.id.slice(9)) - Number(n.id.slice(9))
    // 先按照时间段排序，如果时间段相同，再按照抽卡次序
    return time === 0 ? order : time
  })
  return list
}
