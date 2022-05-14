import request from "../utils/request";
import { store } from "../main";
import { API_BBS_BASE } from "../constants";

const getRoleInfoByCookie = async (cookie?: string) => {
  cookie = cookie || store.get("user.cookie");
  if (!cookie) return null;
  const { data, status } = await request.get(`${API_BBS_BASE}/getUserGameRolesByCookie`, {
    params: { game_biz: "hk4e_cn" },
    headers: { cookie }
  });
  console.log(data?.data?.list);
  if (status === 200 && data?.retcode === 0) return data?.data?.list[0];
  return null;
};

export default getRoleInfoByCookie;
