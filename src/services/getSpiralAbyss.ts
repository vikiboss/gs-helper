import { API_TAKUMI_RECORD, LINK_BBS_REFERER } from '../constants';
import { qs } from '../utils/utils';
import getCurrentUser from '../main/IPC/getCurrentUser';
import getDS from '../utils/getDS';
import getServerByUid from '../utils/getServerByUid';
import request from '../utils/request';

import type { BaseRes } from '../typings';

export interface SpiralAbyssData {
  schedule_id: number;
  start_time: string;
  end_time: string;
  total_battle_times: number;
  total_win_times: number;
  max_floor: string;
  reveal_rank: Reveal_rank[];
  defeat_rank: Defeat_rank[];
  damage_rank: Damage_rank[];
  take_damage_rank: Take_damage_rank[];
  normal_skill_rank: Normal_skill_rank[];
  energy_skill_rank: Energy_skill_rank[];
  floors: Floors[];
  total_star: number;
  is_unlock: boolean;
}

interface Reveal_rank {
  avatar_id: number;
  avatar_icon: string;
  value: number;
  rarity: number;
}

interface Defeat_rank {
  avatar_id: number;
  avatar_icon: string;
  value: number;
  rarity: number;
}

interface Damage_rank {
  avatar_id: number;
  avatar_icon: string;
  value: number;
  rarity: number;
}

interface Take_damage_rank {
  avatar_id: number;
  avatar_icon: string;
  value: number;
  rarity: number;
}

interface Normal_skill_rank {
  avatar_id: number;
  avatar_icon: string;
  value: number;
  rarity: number;
}

interface Energy_skill_rank {
  avatar_id: number;
  avatar_icon: string;
  value: number;
  rarity: number;
}

interface Floors {
  index: number;
  icon: string;
  is_unlock: boolean;
  settle_time: string;
  star: number;
  max_star: number;
  levels: Levels[];
}

interface Levels {
  index: number;
  star: number;
  max_star: number;
  battles: Battles[];
}

interface Battles {
  index: number;
  timestamp: string;
  avatars: Avatars[];
}

interface Avatars {
  id: number;
  icon: string;
  level: number;
  rarity: number;
}

const getSpiralAbyss = async (
  uid?: string
): Promise<SpiralAbyssData | null> => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return null;
  }

  uid = uid || currentUser.uid;

  const url = `${API_TAKUMI_RECORD}/game_record/app/genshin/api/spiralAbyss`;
  const params = {
    role_id: uid,
    schedule_type: '1',
    server: getServerByUid(uid),
  };
  const headers = {
    referer: LINK_BBS_REFERER,
    DS: getDS(qs(params)),
    cookie: currentUser.cookie,
  };

  const { status, data } = await request.get<BaseRes<SpiralAbyssData>>(url, {
    headers,
    params,
  });

  const isOK = status === 200 && data.retcode === 0;

  if (!isOK) {
    console.log('getSpiralAbyss: ', data);
  }
  return isOK ? data?.data || null : null;
};

export default getSpiralAbyss;
