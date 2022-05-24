import type { Cookies } from "electron";

import { DefaultGameData } from "../constants";
import getUserGameRoles from "../services/getUserGameRolesByCookie";

import type { GameRole } from "../services/getUserGameRolesByCookie";

type AuthResState = { cookie: string; valid: boolean; info: GameRole };

const verifyCookie = async (cks: Cookies): Promise<AuthResState> => {
  const mihoyoCks = await cks.get({ domain: "mihoyo.com" });
  let cookie = "";
  let hasLtoken = false;
  for (const ck of mihoyoCks) {
    if (ck.name === "ltoken") hasLtoken = true;
    cookie += `${ck.name}=${ck.value}; `;
  }
  if (!hasLtoken) return { valid: false, cookie: "", info: DefaultGameData };
  cookie = cookie.trim();
  const roles = await getUserGameRoles(cookie);
  const valid = Boolean(roles[0]?.game_uid);
  if (!valid) console.log("verifyCookie: ", cookie);
  return { valid, cookie, info: roles[0] };
};

export default verifyCookie;
