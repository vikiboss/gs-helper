import getUserInfoByToken from "../services/getUserInfoByToken";

import type { Cookies } from "electron";

const verifyCookie = async (cks: Cookies) => {
  const mihoyoCks = await cks.get({ domain: "mihoyo.com" });
  let cookie = "";
  let buid = "";
  let hasLtoken = false;
  for (const ck of mihoyoCks) {
    if (ck.name === "account_id") buid = ck.value;
    if (ck.name === "ltoken") hasLtoken = true;
    cookie += `${ck.name}=${ck.value}; `;
  }
  if (!hasLtoken) return { valid: false, cookie: "", buid: "" };
  cookie = cookie.trim();
  console.log(cookie);
  const info = await getUserInfoByToken(cookie);
  return { valid: Boolean(info?.account_id), cookie, buid };
};

export default verifyCookie;
