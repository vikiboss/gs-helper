import { store } from "../main";
import mergeGachaList from "./mergeGachaList";

import type { GachaData } from "../typings";

// 通过新的抽卡数据来更新配置文件里的抽卡数据
const updateStoreGachaList = (gacha: GachaData) => {
  // 获取配置文件里的所有账号的抽卡数据
  let gachas = store.get("gachas");

  // 尝试筛选出配置文件中此账号的旧数据
  const preList = gachas.filter((e) => e.info.uid === gacha.info.uid);

  // 如果存在这个账号的旧数据，进行合并操作,如果不存在，直接返回抽卡数据
  const list = preList[0].list.length ? mergeGachaList(preList[0].list, gacha.list) : gacha.list;

  // 删除旧数据
  gachas = gachas.filter((e) => e.info.uid !== gacha.info.uid);

  // 插入并保存新的数据
  gachas.push({ info: gacha.info, list });
  store.set("gachas", gachas);
};

export default updateStoreGachaList;
