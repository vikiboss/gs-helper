import { API_BBS_BASE } from "../constants";
import { store } from "../main";
import request from "../utils/request";

const getRoleInfoByCookie = async (cookie?: string) => {
  cookie = cookie || store.get("user.cookie");
  if (!cookie) return null;
  const { data, status } = await request.get(`${API_BBS_BASE}/getUserGameRolesByCookie`, {
    params: { game_biz: "hk4e_cn" },
    headers: { cookie }
  });
  if (status !== 200 || data?.retcode !== 0) {
    console.log("getRoleInfoByCookie: ", data);
    return null;
  }
  return data?.data?.list[0];
};

export default getRoleInfoByCookie;
