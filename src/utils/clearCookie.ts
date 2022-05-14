import { defaultData } from "./../main/initStore";
import { session } from "electron";

import { store } from "../main";

const clearCookie = async (domain: string = "mihoyo.com") => {
  store.set("user", defaultData["user"]);
  const ses = session.defaultSession;
  const mihoyoCks = await ses.cookies.get({ domain });
  for (const ck of mihoyoCks) {
    const protocal = ck.secure ? "https://" : "http://";
    const link = ck.domain + ck.path;
    ses.cookies.remove(protocal + link, ck.name);
  }
};

export default clearCookie;
