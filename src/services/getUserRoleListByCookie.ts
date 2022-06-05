import { API_TAKUMI, GAME_BIZ, LINK_BBS_REFERER } from "../constants";
import request from "./request";

import type { GameRole, BaseRes, GameRolesData } from "../typings";

/** 通过 Cookie 获取绑定的角色信息列表 */
const getUserRolesByCookie = async (cookie: string): Promise<GameRole[] | null> => {
  const url = `${API_TAKUMI}/binding/api/getUserGameRolesByCookie`;
  const params = { game_biz: GAME_BIZ };
  const headers = { referer: LINK_BBS_REFERER, cookie };
  const { status, data } = await request.get<BaseRes<GameRolesData>>(url, { params, headers });
  if (status !== 200 || data.retcode !== 0) console.log("getUserRolesByCookie: ", data);
  return data?.data?.list || null;
};

export default getUserRolesByCookie;
