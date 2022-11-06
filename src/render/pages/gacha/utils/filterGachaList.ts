import type { FilterType } from '..';
import type { GachaData, GachaItemType, GachaType } from '../../../../typings';

export const GachaTypeMap: Record<GachaType, string> = {
  weapon: '302',
  activity: '301',
  normal: '200',
  newer: '100',
};

export const ItemTypeMap: Record<GachaItemType, string> = {
  weapon: '武器',
  role: '角色',
};

const transformGachaType = (type: FilterType['gacha']): string[] => type.map((e) => GachaTypeMap[e]);

const transformItemType = (type: FilterType['item']): string[] => type.map((e) => ItemTypeMap[e]);

const transformStarType = (type: FilterType['star']): string[] => type.map((e) => String(e));

const filterGachaList = (list: GachaData['list'], type: FilterType) => {
  const { item: itemType, gacha: gachaType, star: starType } = type;

  let result = [...list];

  result = result.filter((e) => transformItemType(itemType).includes(e.item_type));
  result = result.filter((e) => transformGachaType(gachaType).includes(e.uigf_gacha_type));
  result = result.filter((e) => transformStarType(starType).includes(e.rank_type));

  return result;
};

export default filterGachaList;
