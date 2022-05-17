import { LINK_BBS_REFERER } from "../constants";
import { store } from "../main";
import getDS from "../utils/getDS";
import getServerByUid from "../utils/getServerByUid";
import request from "../utils/request";

// {
//   "retcode": 0,
//   "message": "OK",
//   "data": {
//     "code": "ok"
//   }
// }

const doBBSSign = async (act_id: string): Promise<boolean> => {
  const { cookie, uid } = store.get("user");
  if (!cookie) return null;
  const postData = { act_id, uid, region: getServerByUid(uid) };
  const config = {
    headers: {
      Referer: LINK_BBS_REFERER,
      Cookie: cookie,
      DS: getDS()
    }
  };
  const url = `${LINK_BBS_REFERER}/event/bbs_sign_reward/sign`;
  const { status, data } = await request.post(url, postData, config);
  if (status !== 200 || data?.retcode !== 0) console.log("doBBSSign: ", data);
  return status === 200 && data?.retcode === 0;
};

export default doBBSSign;
