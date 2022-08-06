import { API_TAKUMI, LINK_BBS_REFERER } from "../constants";
import { getSignDS } from "../utils/getDS";
import getBBSSignActId from "./getBBSSignActId";
import getCurrentUser from "../main/IPC/getCurrentUser";
import getServerByUid from "../utils/getServerByUid";
import request from "../utils/request";

import type { BaseRes } from "../typings";

interface DoSignData {
  code: string;
}

const doBBSSign = async (): Promise<boolean> => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  const { cookie, uid } = currentUser;
  const act_id = await getBBSSignActId();
  const postData = { act_id, region: getServerByUid(uid), uid };
  const headers = {
    referer: LINK_BBS_REFERER,
    cookie,
    DS: getSignDS()
  };
  const url = `${API_TAKUMI}/event/bbs_sign_reward/sign`;
  const { status, data } = await request.post<BaseRes<DoSignData>>(url, postData, { headers });
  const isOK = status === 200 && data.retcode === 0;
  if (!isOK) console.log("doBBSSign: ", data);
  return isOK;
};

export default doBBSSign;
