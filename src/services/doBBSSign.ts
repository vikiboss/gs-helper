import {
  API_TAKUMI,
  APP_USER_AGENT_BBS,
  APP_VERSION_BBS,
  DEFAULT_APP_DATA,
  LINK_BBS_REFERER
} from "../constants";
import { store } from "../main";
import getBBSSignActId from "./getBBSSignActId";
import { getSignDS } from "../utils/getDS";
import getServerByUid from "../utils/getServerByUid";
import request from "../utils/request";

import type { AppData } from "../typings";
import type { BaseRes } from "../utils/request";

type DoSignData = {
  code: string;
};

const doBBSSign = async (): Promise<boolean> => {
  const { cookie, uid } = store.get<string, AppData["user"]>("user", DEFAULT_APP_DATA["user"]);
  const act_id = await getBBSSignActId();
  const postData = JSON.stringify({ act_id, region: getServerByUid(uid), uid });
  const headers = {
    referer: LINK_BBS_REFERER,
    "x-rpc-app_version": "2.3.0",
    "User-Agent": " miHoYoBBS/2.3.0",
    cookie,
    DS: getSignDS()
  };
  const url = `${API_TAKUMI}/event/bbs_sign_reward/sign`;
  console.log(url, postData, headers);
  const { status, data } = await request.post<BaseRes<DoSignData>>(url, postData, { headers });
  if (status !== 200 || data.retcode !== 0) console.log("doBBSSign: ", data);
  return status === 200 && data.retcode === 0;
};

export default doBBSSign;
