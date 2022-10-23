import type { FilterType } from "..";
import type { GachaData, GachaItemType, GachaType } from "../../../../typings";

export const GachaTypeMap: Record<GachaType, string> = {
  weapon: "302",
  activity: "301",
  normal: "200",
  newer: "100"
};

export const ItemTypeMap: Record<GachaItemType, string> = {
  weapon: "武器",
  role: "角色"
};

const transformGachaType = (type: FilterType["gacha"]): string[] => {
  return type.map((e) => GachaTypeMap[e]);
};

const transformItemType = (type: FilterType["item"]): string[] => {
  return type.map((e) => ItemTypeMap[e]);
};

const transformStarType = (type: FilterType["star"]): string[] => {
  return type.map((e) => String(e));
};

const filterGachaList = (list: GachaData["list"], type: FilterType) => {
  const { item: itemType, gacha: gachaType, star: starType } = type;
  list = list.filter((e) => transformItemType(itemType).includes(e.item_type));
  list = list.filter((e) => transformGachaType(gachaType).includes(e.uigf_gacha_type));
  list = list.filter((e) => transformStarType(starType).includes(e.rank_type));
  return list;
};

export default filterGachaList;
