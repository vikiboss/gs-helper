import { Cookies } from "electron";

const transferCookiesToString = async (cookies: Cookies) => {
  // 获取所有 Cookie
  const cks = await cookies.get({});
  // 拼接 Cookie
  return cks.reduce((p, n) => p + `${n.name}=${n.value}; `, "").trim();
};

export default transferCookiesToString;
