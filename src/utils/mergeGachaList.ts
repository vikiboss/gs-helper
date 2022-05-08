import { GachaData } from "../typings";

// 新旧数据合并算法
const mergeGachaList = (pre: GachaData, list: GachaData) => {
  // 先把新旧数据合并到同一个数组
  pre.list = pre.list.concat(list.list);
  // 创建一个 Set，它的值具有唯一性
  const ids = new Set<string>();

  // 通过 id 过滤掉重复的单条数据
  pre.list = pre.list.filter((e) => {
    if (ids.has(e.id)) return false;
    return ids.add(e.id);
  });

  // 通过 id 进行时间排序
  pre.list.sort((p, n) => {
    // 前九位代表一个时间段，每个小时过六分
    const time = Number(p.id.slice(0, 9)) - Number(n.id.slice(0, 9));
    // 后面的数字代表抽卡次序，每个时间段内依次递增
    const order = Number(p.id.slice(9)) - Number(n.id.slice(9));
    // 先按照时间段排序，如果时间段相同，再按照抽卡次序
    return time === 0 ? order : time;
  });

  // 返回合并后的数据
  return pre;
};

export default mergeGachaList;
