import { API_TAKUMI_RECORD, LINK_BBS_REFERER } from "../constants";
import { DefaultAppData } from "./../constants";
import { store } from "../main";

import getServerByUid from "../utils/getServerByUid";
import request, { BaseRes } from "../utils/request";

import { AppData } from "../typings";
import getDS from "../utils/getDS";

export type RoleData = {
  avatars: Role[];
};

export type Role = {
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
};

// 武器
export type Weapon = {
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
};

// 圣遗物
export type Reliquarie = {
  id: number;
  name: string;
  icon: string;
  pos: number;
  rarity: number;
  level: number;
  set: Set;
  pos_name: string;
};

// 命座
export type Constellation = {
  id: number;
  name: string;
  icon: string;
  effect: string;
  is_actived: boolean;
  pos: number;
};

// 衣装
export type Costume = {
  id: number;
  name: string;
  icon: string;
};

// 圣遗物属性
export type Set = {
  id: number;
  name: string;
  affixes: Affixes[];
};

// 圣遗物词缀
export type Affixes = {
  activation_number: number;
  effect: string;
};

const getOwnedRoles = async (): Promise<Role[]> => {
  const { cookie, uid } = store.get<string, AppData["user"]>("user", DefaultAppData["user"]);
  const url = `${API_TAKUMI_RECORD}/game_record/app/genshin/api/character`;
  const postData = { role_id: uid, server: getServerByUid(uid) };
  const config = {
    headers: {
      referer: LINK_BBS_REFERER,
      DS: getDS("", JSON.stringify(postData)),
      cookie
    }
  };
  const { status, data } = await request.post<BaseRes<RoleData>>(url, postData, config);
  const faild = status !== 200 || data.retcode !== 0;
  if (faild) console.log("getOwnedRoles: ", data);
  return data?.data?.avatars || [];
};

export default getOwnedRoles;
