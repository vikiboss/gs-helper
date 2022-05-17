import { API_TAKUMI_RECORD, LINK_BBS_REFERER } from "../constants";
import { store } from "../main";
import getDS from "../utils/getDS";
import getServerByUid from "../utils/getServerByUid";
import qs from "../utils/qs";
import request from "../utils/request";

export type DispatchItem = {
  avatar_side_icon: string;
  status: string;
  remained_time: string;
};

export type DailyNotesData = {
  current_resin: number;
  max_resin: number;
  resin_recovery_time: string;
  finished_task_num: number;
  total_task_num: number;
  is_extra_task_reward_received: boolean;
  remain_resin_discount_num: number;
  resin_discount_num_limit: number;
  current_expedition_num: number;
  max_expedition_num: number;
  expeditions: DispatchItem[];
  current_home_coin: number;
  max_home_coin: number;
  home_coin_recovery_time: string;
  transformer: {
    obtained: boolean;
    recovery_time: { Day: number; Hour: number; Minute: number; Second: number; reached: true };
  };
};

const getDailyNotesByCookie = async (cookie: string): Promise<DailyNotesData | null> => {
  cookie = cookie || store.get("user.cookie");
  if (!cookie) return null;
  const uid = store.get("user.uid") as string;
  const url = `${API_TAKUMI_RECORD}/game_record/app/genshin/api/dailyNote`;
  const params = { role_id: uid, server: getServerByUid(uid) };
  const config = {
    params,
    headers: {
      Referer: LINK_BBS_REFERER,
      Cookie: cookie,
      DS: getDS(qs(params))
    }
  };
  const res = await request.get(url, config);
  if (res.status !== 200 || res.data.retcode !== 0) {
    console.log("getDailyNotesByCookie: ", res.data);
    return null;
  }
  return res.data.data;
};

export default getDailyNotesByCookie;
