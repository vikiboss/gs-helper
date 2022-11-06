import { GachaTypeMap } from './filterGachaList';

import type { GachaData, GachaType } from '../../../../typings';

const getListByType = (list: GachaData['list'], type: GachaType) => list.filter((e) => {
  const target = GachaTypeMap[type];
  if (Array.isArray(target)) {
    return target.includes(e.uigf_gacha_type);
  }
  return target === e.uigf_gacha_type;
});

export default getListByType;
