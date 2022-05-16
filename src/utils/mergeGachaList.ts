import { GachaData } from "../typings";
import sortGachaList from "./sortGachaList";

// 新旧数据合并算法
const mergeGachaList = (pre: GachaData["list"], list: GachaData["list"]) => {
  // 先把新旧数据合并到同一个数组
  pre = pre.concat(list);
  // 创建一个 Set，它的值具有唯一性
  const ids = new Set<string>();

  // 通过 id 过滤掉重复的单条数据
  pre = pre.filter((e) => {
    if (ids.has(e.id)) return false;
    return ids.add(e.id);
  });

  // 数据排序
  pre = sortGachaList(pre);

  // 返回合并后的数据
  return pre;
};

export default mergeGachaList;
