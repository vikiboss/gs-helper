import { API_TAKUMI, GAME_BIZ } from "../constants";
import { store } from "../main";
import request, { BaseRes } from "../utils/request";

export type GameRole = {
  region: string;
  game_biz: string;
  nickname: string;
  level: number;
  is_official: boolean;
  region_name: string;
  game_uid: string;
  is_chosen: boolean;
};

export type GameRolesData = {
  list: GameRole[];
};

const getUserGameRolesByCookie = async (cookie?: string): Promise<GameRole[]> => {
  cookie = cookie || store.get("user.cookie");
  if (!cookie) return null;
  const url = `${API_TAKUMI}/binding/api/getUserGameRolesByCookie`;
  const { data, status } = await request.get<BaseRes<GameRolesData>>(url, {
    params: { game_biz: GAME_BIZ },
    headers: { cookie }
  });
  if (status !== 200 || data.retcode !== 0) {
    console.log("getUserGameRolesByCookie: ", data);
    return null;
  }
  return data.data.list;
};

export default getUserGameRolesByCookie;
