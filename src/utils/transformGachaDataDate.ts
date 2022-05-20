import filterGachaList from "./filterGachaList";

import type { FilterType } from "./../render/pages/Gacha/index";
import type { GachaData } from "../typings";

const transformGachaDataDate = (list: GachaData["list"], type: FilterType) => {
  list = filterGachaList(list, type);
  const dateMap = new Map<string, number>();
  for (const item of list) {
    const date = item.time.slice(0, 10);
    dateMap.set(date, dateMap.has(date) ? dateMap.get(date) + 1 : 1);
  }
  const res = [] as { day: string; value: number }[];
  dateMap.forEach((v, k) => res.push({ day: k, value: v }));
  return res;
};

export default transformGachaDataDate;
