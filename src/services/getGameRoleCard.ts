import { API_TAKUMI_RECORD, LINK_BBS_REFERER } from '../constants';
import { qs } from '../utils/utils';
import getCurrentUser from '../main/IPC/getCurrentUser';
import getDS from '../utils/getDS';
import getServerByUid from '../utils/getServerByUid';
import request from '../utils/request';

import type { BaseRes } from '../typings';

interface Role {
  AvatarUrl: string;
  nickname: string;
  region: string;
  level: number;
}

interface Stats {
  active_day_number: number;
  achievement_number: number;
  anemoculus_number: number;
  geoculus_number: number;
  avatar_number: number;
  way_point_number: number;
  domain_number: number;
  spiral_abyss: string;
  precious_chest_number: number;
  luxurious_chest_number: number;
  exquisite_chest_number: number;
  dendroculus_number: number;
  common_chest_number: number;
  electroculus_number: number;
  magic_chest_number: number;
}

interface Homes {
  level: number;
  visit_num: number;
  comfort_num: number;
  item_num: number;
  name: string;
  icon: string;
  comfort_level_name: string;
  comfort_level_icon: string;
}

interface Offerings {
  name: string;
  level: number;
  icon: string;
}

interface World_explorations {
  level: number;
  exploration_percentage: number;
  icon: string;
  name: string;
  type: string;
  offerings: Offerings[];
  id: number;
  parent_id: number;
  map_url: string;
  strategy_url: string;
  background_image: string;
  inner_icon: string;
  cover: string;
}

interface Avatars {
  id: number;
  image: string;
  name: string;
  element: string;
  fetter: number;
  level: number;
  rarity: number;
  actived_constellation_num: number;
  card_image: string;
  is_chosen: boolean;
}

export interface GameRoleCardData {
  role: Role;
  avatars: Avatars[];
  stats: Stats;
  city_explorations: any[];
  world_explorations: World_explorations[];
  homes: Homes[];
}

const getGameRoleCard = async (uid?: string): Promise<GameRoleCardData | null> => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const targetUid = uid || currentUser.uid;

  const url = `${API_TAKUMI_RECORD}/game_record/app/genshin/api/index`;
  const params = { role_id: targetUid, server: getServerByUid(targetUid) };
  const headers = {
    referer: LINK_BBS_REFERER,
    DS: getDS(qs(params)),
    cookie: currentUser.cookie,
  };

  const config = { headers, params };

  const { status, data } = await request.get<BaseRes<GameRoleCardData>>(url, config);

  const isOK = status === 200 && data.retcode === 0;

  if (!isOK) {
    console.log('getGameRoleCard: ', data);
  }

  return isOK ? data?.data || null : null;
};

export default getGameRoleCard;
