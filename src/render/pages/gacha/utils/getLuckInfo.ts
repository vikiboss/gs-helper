import { NormalItemList } from "../../../../constants";
import getListByType from "./getListByType";

import type { GachaData } from "../../../../typings";

const getLuckInfo = (gacha: GachaData) => {
  // 0 为 小保底，1 为大保底
  let [count, miss] = [0, 0];
  let status = 0;
  const ActivityList = getListByType(gacha.list, "activity");
  for (const e of ActivityList) {
    if (e.rank_type === "5") {
      if (status === 1) {
        status = 0;
      } else {
        const isMiss = NormalItemList.includes(e.name);
        count++;
        isMiss && miss++;
        status = isMiss ? 1 : 0;
      }
    }
  }
  return { count, miss, rate: ((100 * miss) / (count || 1)).toFixed(2) };
};

export default getLuckInfo;
