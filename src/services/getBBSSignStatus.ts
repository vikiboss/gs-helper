import { API_TAKUMI, LINK_BBS_REFERER } from "../constants";
import { store } from "../main";
import getServerByUid from "../utils/getServerByUid";
import request, { BaseRes } from "../utils/request";
import getBBSSignActId from "./getBBSSignActId";

export type SignInfo = {
  total_sign_day: number;
  today: string;
  is_sign: boolean;
  first_bind: boolean;
  is_sub: boolean;
  month_first: boolean;
  sign_cnt_missed: number;
};

const getBBSSignStatus = async (): Promise<SignInfo | null> => {
  const { cookie, uid } = store.get("user");
  if (!cookie) return null;
  const act_id = await getBBSSignActId();
  const params = { act_id, uid, region: getServerByUid(uid) };
  const config = {
    params,
    headers: {
      Referer: LINK_BBS_REFERER,
      Cookie: cookie
    }
  };
  const url = `${API_TAKUMI}/event/bbs_sign_reward/info`;
  const { data, status } = await request.get<BaseRes<SignInfo>>(url, config);
  if (status !== 200 || data.retcode !== 0) console.log("getBBSSignStatus: ", data);
  return data.data || null;
};

export default getBBSSignStatus;
