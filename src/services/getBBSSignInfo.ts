import { API_TAKUMI, DefaultAppData, LINK_BBS_REFERER } from "../constants";
import { store } from "../main";
import getBBSSignActId from "./getBBSSignActId";
import getServerByUid from "../utils/getServerByUid";
import request from "../utils/request";

import type { AppData } from "../typings";
import type { BaseRes } from "../utils/request";

export type SignInfo = {
  first_bind: boolean;
  is_sign: boolean;
  is_sub: boolean;
  month_first: boolean;
  sign_cnt_missed: number;
  today: string;
  total_sign_day: number;
};

const getBBSSignInfo = async (): Promise<SignInfo | null> => {
  const { cookie, uid } = store.get<string, AppData["user"]>("user", DefaultAppData["user"]);
  const act_id = await getBBSSignActId();
  const params = { act_id, uid, region: getServerByUid(uid) };
  const config = { params, headers: { referer: LINK_BBS_REFERER, cookie } };
  const url = `${API_TAKUMI}/event/bbs_sign_reward/info`;
  const { data, status } = await request.get<BaseRes<SignInfo>>(url, config);
  if (status !== 200 || data.retcode !== 0) console.log("getBBSSignInfo: ", data);
  return data?.data || null;
};

export default getBBSSignInfo;
