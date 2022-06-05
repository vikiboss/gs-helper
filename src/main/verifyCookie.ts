import { API_TAKUMI, GAME_BIZ, LINK_BBS_REFERER } from "../constants";
import request from "../services/request";

import type { Cookies } from "electron";
import type { GameRole, BaseRes, GameRolesData } from "../typings";

export const DefaultGameData: GameRole = {
  region: "",
  game_biz: "",
  nickname: "",
  level: 0,
  is_official: true,
  region_name: "",
  game_uid: "",
  is_chosen: false
};

export interface AuthResState {
  cookie: string;
  valid: boolean;
  roleInfo: GameRole;
}

/** 通过 Cookie 获取绑定的角色信息列表 */
const getUserRolesByCookie = async (cookie: string): Promise<GameRole[] | null> => {
  const url = `${API_TAKUMI}/binding/api/getUserGameRolesByCookie`;
  const config = { params: { game_biz: GAME_BIZ }, headers: { referer: LINK_BBS_REFERER, cookie } };
  const { data, status } = await request.get<BaseRes<GameRolesData>>(url, config);
  if (status !== 200 || data.retcode !== 0) console.log("getUserRolesByCookie: ", data);
  return data?.data?.list || null;
};

/** 验证 Cookie 有效性 */
const verifyCookie = async (cks: Cookies): Promise<AuthResState> => {
  const mihoyoCks = await cks.get({ domain: "mihoyo.com" });
  let cookie = "";
  let hasLtoken = false;
  for (const ck of mihoyoCks) {
    if (ck.name === "ltoken") hasLtoken = true;
    cookie += `${ck.name}=${ck.value}; `;
  }
  if (!hasLtoken) return { valid: false, cookie: "", roleInfo: DefaultGameData };
  cookie = cookie.trim();
  const roles = await getUserRolesByCookie(cookie);
  const valid = Boolean(roles[0]?.game_uid);
  if (!valid) console.log("verifyCookie: ", cookie);
  return { valid, cookie, roleInfo: roles[0] };
};

export default verifyCookie;
