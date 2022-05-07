import { Cookies } from "electron";
import getUserInfoByToken from "../services/getUserInfoByToken";

const verifyCookie = async (cks: Cookies) => {
  const mihoyoCks = await cks.get({ domain: "mihoyo.com" });
  let cookie = "";
  let buid = "";
  for (const ck of mihoyoCks) {
    if (ck.name === "ltuid") buid = ck.value;
    cookie += `${ck.name}=${ck.value}; `;
  }
  cookie = cookie.trim();
  console.log(cookie);
  if (mihoyoCks.length >= 1) {
    const info = await getUserInfoByToken(cookie);
    return { valid: Boolean(info?.account_id), cookie, buid };
  } else {
    return { valid: false, cookie: "", buid: "" };
  }
};

export default verifyCookie;
