import { API_TAKUMI, LINK_BBS_REFERER } from "../constants";
import getBBSSignActId from "./getBBSSignActId";
import getCurrentUser from "../main/IPC/getCurrentUser";
import getServerByUid from "../utils/getServerByUid";
import request from "../utils/request";

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
  if (!currentUser) return null;
  const { cookie, uid } = currentUser;
  const act_id = await getBBSSignActId();
  const params = { act_id, uid, region: getServerByUid(uid) };
  const url = `${API_TAKUMI}/event/bbs_sign_reward/info`;
  const headers = { referer: LINK_BBS_REFERER, cookie };
  const { status, data } = await request.get<BaseRes<SignInfo>>(url, { params, headers });
  // { data: null, message: '尚未登录', retcode: -100 }
  const isOK = status === 200 && data.retcode === 0;
  if (!isOK) console.log("getBBSSignInfo: ", data);
  return isOK ? data?.data || null : null;
};

export default getBBSSignInfo;
