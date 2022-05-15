import { FilterType } from "./../render/pages/Gacha/index";
import { COLORS } from "../constants";
import { GachaData } from "../typings";

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

const ItemTypeMap = {
  all: ["角色", "武器"],
  weapon: ["武器"],
  role: ["角色"]
};

const GachaTypeMap = {
  weapon: "302",
  activity: "301",
  normal: "200",
  newer: "100"
};

const transformGachaType = (type: FilterType["gachaType"]): string[] => {
  switch (type) {
    case "all":
      return ["100", "200", "301", "302"];
    default:
      return type.map((e) => GachaTypeMap[e]);
  }
};

const transformGachaDataType = (list: GachaData["list"], type: FilterType) => {
  [n5, n4, n3].forEach((e) => (e.value = 0));
  const { itemType, gachaType } = type;
  list = list.filter((e) => ItemTypeMap[itemType].includes(e.item_type));
  list = list.filter((e) => transformGachaType(gachaType).includes(e.gacha_type));
  for (const item of list) {
    if (item.rank_type === "5") n5.value++;
    if (item.rank_type === "4") n4.value++;
    if (item.rank_type === "3") n3.value++;
  }
  console.log([n3, n4, n5]);
  return [n3, n4, n5];
};

export default transformGachaDataType;
