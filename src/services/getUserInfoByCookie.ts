import request from "../utils/request";
import { store } from "../main";
import { API_WEB_BASE } from "../constants";

const getUserInfoByCookie = async (cookie?: string) => {
  cookie = cookie || store.get("user.cookie");
  if (!cookie) return null;
  const { data, status } = await request.get(`${API_WEB_BASE}/getUserFullInfo`, {
    params: { t: Date.now() },
    headers: { cookie }
  });
  console.log(data?.data);
  if (status === 200 && data?.retcode === 0) return data?.data?.user_info;
  return null;
};

export default getUserInfoByCookie;
