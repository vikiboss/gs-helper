import { API_TAKUMI_RECORD, LINK_BBS_REFERER } from "../constants";
import getCurrentUser from "../main/ipcHandlers/getCurrentUser";
import getDS from "../main/getDS";
import getServerByUid from "../main/getServerByUid";
import request from "./request";

import type { BaseRes } from "../typings";

export interface RoleData {
  avatars: Role[];
}

export interface Role {
  id: number;
  image: string;
  icon: string;
  name: string;
  element: string;
  fetter: number;
  level: number;
  rarity: number;
  weapon: Weapon;
  reliquaries: Reliquarie[];
  constellations: Constellation[];
  actived_constellation_num: number;
  costumes: Costume[];
}

// 武器
export interface Weapon {
  id: number;
  name: string;
  icon: string;
  type: number;
  rarity: number;
  level: number;
  promote_level: number;
  type_name: string;
  desc: string;
  affix_level: number;
}

// 圣遗物
export interface Reliquarie {
  id: number;
  name: string;
  icon: string;
  pos: number;
  rarity: number;
  level: number;
  set: Set;
  pos_name: string;
}

// 命座
export interface Constellation {
  id: number;
  name: string;
  icon: string;
  effect: string;
  is_actived: boolean;
  pos: number;
}

// 衣装
export interface Costume {
  id: number;
  name: string;
  icon: string;
}

// 圣遗物属性
export interface Set {
  id: number;
  name: string;
  affixes: Affixes[];
}

// 圣遗物词缀
export interface Affixes {
  activation_number: number;
  effect: string;
}

const getOwnedRoleList = async (): Promise<Role[] | null> => {
  const currentUser = getCurrentUser();
  const { cookie, uid } = currentUser;
  const url = `${API_TAKUMI_RECORD}/game_record/app/genshin/api/character`;
  const postData = { role_id: uid, server: getServerByUid(uid) };
  const headers = {
    referer: LINK_BBS_REFERER,
    DS: getDS("", JSON.stringify(postData)),
    cookie
  };
  const { status, data } = await request.post<BaseRes<RoleData>>(url, postData, { headers });
  const faild = status !== 200 || data.retcode !== 0;
  if (faild) console.log("getOwnedRoleList: ", data);
  return data?.data?.avatars || null;
};

export default getOwnedRoleList;
