import { API_RECORD_BASE, LINK_BBS_REFERER } from "../constants";
import { DailyNotesData } from "./../typings.d";
import { store } from "../main";
import getDS from "../utils/getDS";
import getServerByUid from "../utils/getServerByUid";
import qs from "../utils/qs";
import request from "../utils/request";

const getDailyNotesByCookie = async (cookie: string): Promise<DailyNotesData | null> => {
  cookie = cookie || store.get("user.cookie");
  if (!cookie) return null;
  const uid = store.get("user.uid") as string;
  const url = `${API_RECORD_BASE}/genshin/api/dailyNote`;
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
  if (res.status !== 200 || res.data?.retcode !== 0) {
    console.log("getDailyNotesByCookie: ", res.data);
    return null;
  }
  return res.data?.data;
};

export default getDailyNotesByCookie;
