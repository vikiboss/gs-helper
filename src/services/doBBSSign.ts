import { API_TAKUMI, LINK_BBS_REFERER } from "../constants";
import { store } from "../main";
import getBBSSignActId from "./getBBSSignActId";
import getDS from "../utils/getDS";
import getServerByUid from "../utils/getServerByUid";
import request from "../utils/request";

import type { BaseRes } from "../utils/request";

type DoSignData = {
  code: string;
};

const doBBSSign = async (): Promise<boolean> => {
  const { cookie, uid } = store.get("user");
  if (!cookie) return null;
  const act_id = await getBBSSignActId();
  const postData = { act_id, uid, region: getServerByUid(uid) };
  const config = {
    headers: {
      Referer: LINK_BBS_REFERER,
      Cookie: cookie,
      DS: getDS()
    }
  };
  const url = `${API_TAKUMI}/event/bbs_sign_reward/sign`;
  const { status, data } = await request.post<BaseRes<DoSignData>>(url, postData, config);
  if (status !== 200 || data.retcode !== 0) console.log("doBBSSign: ", data);
  return status === 200 && data.retcode === 0;
};

export default doBBSSign;
