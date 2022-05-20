import { COLORS } from "../constants";
import filterGachaList from "./filterGachaList";

import type { FilterType } from "./../render/pages/Gacha/index";
import type { GachaData } from "../typings";

const n5 = {
  id: "五星",
  label: "五星",
  value: 0,
  color: COLORS.golden
};

const n4 = {
  id: "四星",
  label: "四星",
  value: 0,
  color: COLORS.purple
};

const n3 = {
  id: "三星",
  label: "三星",
  value: 0,
  color: COLORS.blue
};

const transformGachaDataType = (list: GachaData["list"], type: FilterType) => {
  list = filterGachaList(list, type);
  [n5, n4, n3].forEach((e) => (e.value = 0));
  for (const item of list) {
    if (item.rank_type === "5") n5.value++;
    if (item.rank_type === "4") n4.value++;
    if (item.rank_type === "3") n3.value++;
  }
  return [n3, n4, n5];
};

export default transformGachaDataType;
