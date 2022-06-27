import { API_TAKUMI, GAME_BIZ, LINK_BBS_REFERER } from "../constants";
import request from "./request";

import type { Cookies } from "electron";
import type { GameRole, BaseRes, GameRolesData } from "../typings";

export interface AuthResState {
  cookie: string;
  valid: boolean;
  roleInfo: GameRole | null;
}

/** 将 Cookies 类转为 cookie 字符串的函数 */
const transferCookiesToString = async (cookies: Cookies) => {
  // 获取所有 Cookie
  const cks = await cookies.get({});
  // 拼接 Cookie
  return cks.reduce((p, n) => p + `${n.name}=${n.value}; `, "").trim();
};

/** 通过 Cookie 获取绑定的角色信息列表 */
const getUserRolesByCookie = async (cookie: string): Promise<GameRole[] | null> => {
  const url = `${API_TAKUMI}/binding/api/getUserGameRolesByCookie`;
  const config = { params: { game_biz: GAME_BIZ }, headers: { referer: LINK_BBS_REFERER, cookie } };
  const { data, status } = await request.get<BaseRes<GameRolesData>>(url, config);
  if (status !== 200 || data.retcode !== 0) console.log("getUserRolesByCookie: ", data);
  return data?.data?.list || null;
};

/** 验证 Cookie 有效性并尝试获取绑定的游戏角色 */
const verifyCookieAndGetGameRole = async (cks: Cookies): Promise<AuthResState> => {
  const cookie = await transferCookiesToString(cks);
  const hasLtoken = cookie.includes("ltoken");
  if (!hasLtoken) return { valid: false, cookie: "", roleInfo: null };
  const roles = await getUserRolesByCookie(cookie);
  const valid = Boolean(roles[0]?.game_uid);
  if (!valid) console.log("verifyCookie: ", cookie);
  return { valid: true, cookie, roleInfo: valid ? roles[0] : null };
};

export default verifyCookieAndGetGameRole;
