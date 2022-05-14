import type { Cookies } from "electron";

import getRoleInfoByCookie from "../services/getUserInfoByCookie";

const verifyCookie = async (cks: Cookies) => {
  const mihoyoCks = await cks.get({ domain: "mihoyo.com" });
  let cookie = "";
  let hasLtoken = false;
  for (const ck of mihoyoCks) {
    if (ck.name === "ltoken") hasLtoken = true;
    cookie += `${ck.name}=${ck.value}; `;
  }
  if (!hasLtoken) return { valid: false, cookie: "", info: {} };
  cookie = cookie.trim();
  // console.log(cookie);
  const info = await getRoleInfoByCookie(cookie);
  return { valid: Boolean(info?.game_uid), cookie, info };
};

export default verifyCookie;
