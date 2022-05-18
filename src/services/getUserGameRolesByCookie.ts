import { API_TAKUMI, GAME_BIZ } from "../constants";
import { LINK_BBS_REFERER } from "./../constants";
import { store } from "../main";
import request from "../utils/request";

import type { BaseRes } from "../utils/request";

export type GameRole = {
  game_biz: string;
  game_uid: string;
  is_chosen: boolean;
  is_official: boolean;
  level: number;
  nickname: string;
  region_name: string;
  region: string;
};

export type GameRolesData = {
  list: GameRole[];
};

const getUserGameRolesByCookie = async (cookie: string = ""): Promise<GameRole[] | null> => {
  cookie = cookie || store.get<string, string>("user.cookie", "");
  const url = `${API_TAKUMI}/binding/api/getUserGameRolesByCookie`;
  const config = { params: { game_biz: GAME_BIZ }, headers: { referer: LINK_BBS_REFERER, cookie } };
  const { data, status } = await request.get<BaseRes<GameRolesData>>(url, config);
  if (status !== 200 || data.retcode !== 0) console.log("getUserGameRolesByCookie: ", data);
  return data?.data?.list;
};

export default getUserGameRolesByCookie;
