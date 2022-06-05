import { session } from "electron";

/** 清空 Session 中所有有关米哈游的 Cookie 信息 */
const clearSessionCookie = async () => {
  const ses = session.defaultSession;
  const mihoyoCks = await ses.cookies.get({ domain: "mihoyo.com" });
  for (const ck of mihoyoCks) {
    const protocal = ck.secure ? "https://" : "http://";
    const link = ck.domain + ck.path;
    ses.cookies.remove(protocal + link, ck.name);
  }
};

export default clearSessionCookie;
