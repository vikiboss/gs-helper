import request from "./request";
import { API_AUTH_GET_USER_INFO_BY_TOKEN } from "../constants";

const getUserInfoByToken = async (cookie: string) => {
  const { data, status } = await request.get(API_AUTH_GET_USER_INFO_BY_TOKEN, {
    params: { t: Date.now() },
    headers: { cookie }
  });
  console.log(data?.data);
  if (status === 200 && data?.retcode === 0) return data.data;
  return "";
};

export default getUserInfoByToken;
