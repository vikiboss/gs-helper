import type { Cookies } from "electron";

import getUserInfoByCookie from "../services/getUserInfoByCookie";

const verifyCookie = async (cks: Cookies) => {
  const mihoyoCks = await cks.get({ domain: "mihoyo.com" });
  let cookie = "";
  let buid = "";
  let hasLtoken = false;
  for (const ck of mihoyoCks) {
    if (ck.name === "ltuid") buid = ck.value;
    if (ck.name === "ltoken") hasLtoken = true;
    cookie += `${ck.name}=${ck.value}; `;
  }
  if (!hasLtoken) return { valid: false, cookie: "", buid: "" };
  cookie = cookie.trim();
  console.log(cookie);
  const data = await getUserInfoByCookie(cookie);
  return { valid: Boolean(data?.uid), cookie, buid, data };
};

export default verifyCookie;
