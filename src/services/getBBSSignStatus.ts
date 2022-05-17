import { LINK_BBS_REFERER } from "../constants";
import { store } from "../main";
import getServerByUid from "../utils/getServerByUid";
import request from "../utils/request";

// {
//   "retcode": 0,
//   "message": "OK",
//   "data": {
//     "total_sign_day": 14,
//     "today": "2022-05-17",
//     "is_sign": false,
//     "first_bind": false,
//     "is_sub": true,
//     "month_first": false,
//     "sign_cnt_missed": 2
//   }
// }

const getBBSSignStatus = async (act_id: string) => {
  const { cookie, uid } = store.get("user");
  if (!cookie) return null;
  const params = { act_id, uid, region: getServerByUid(uid) };
  const config = {
    params,
    headers: {
      Referer: LINK_BBS_REFERER,
      Cookie: cookie
    }
  };
  const url = `${LINK_BBS_REFERER}/event/bbs_sign_reward/info`;
  const { data, status } = await request.get(url, config);
  if (status !== 200 || data?.retcode !== 0) console.log("getBBSSignStatus: ", data);
  return data?.data || null;
};

export default getBBSSignStatus;
