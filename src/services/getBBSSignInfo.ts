import { API_TAKUMI, LINK_BBS_REFERER } from "../constants";
import getBBSSignActId from "./getBBSSignActId";
import getCurrentUser from "../main/ipcHandlers/getCurrentUser";
import getServerByUid from "../main/getServerByUid";
import request from "./request";

import type { BaseRes } from "../typings";

export interface SignInfo {
  first_bind: boolean;
  is_sign: boolean;
  is_sub: boolean;
  month_first: boolean;
  sign_cnt_missed: number;
  today: string;
  total_sign_day: number;
}

const getBBSSignInfo = async (): Promise<SignInfo | null> => {
  const currentUser = getCurrentUser();
  const { cookie, uid } = currentUser;
  const act_id = await getBBSSignActId();
  const params = { act_id, uid, region: getServerByUid(uid) };
  const url = `${API_TAKUMI}/event/bbs_sign_reward/info`;
  const headers = { referer: LINK_BBS_REFERER, cookie };
  const { status, data } = await request.get<BaseRes<SignInfo>>(url, { params, headers });
  if (status !== 200 || data.retcode !== 0) console.log("getBBSSignInfo: ", data);
  return data?.data || null;
};

export default getBBSSignInfo;
