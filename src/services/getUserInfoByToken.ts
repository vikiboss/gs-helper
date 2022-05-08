import request from "./request";
import { API_AUTH_BASE } from "../constants";

const getUserInfoByToken = async (cookie: string) => {
  const { data, status } = await request.get(`${API_AUTH_BASE}/getUserAccountInfoByLToken`, {
    params: { t: Date.now() },
    headers: { cookie }
  });
  console.log(data?.data);
  if (status === 200 && data?.retcode === 0) return data?.data;
  return null;
};

export default getUserInfoByToken;
