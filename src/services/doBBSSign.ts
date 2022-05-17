import { LINK_BBS_REFERER } from "../constants";
import { store } from "../main";
import getDS from "../utils/getDS";
import getServerByUid from "../utils/getServerByUid";
import request from "../utils/request";

const doBBSSign = async (act_id: string): Promise<boolean> => {
  const cookie = store.get("user.cookie") as string;
  if (!cookie) return null;
  const uid = store.get("user.uid") as string;
  const postData = { act_id, uid, region: getServerByUid(uid) };
  const config = {
    headers: {
      Referer: LINK_BBS_REFERER,
      Cookie: cookie,
      DS: getDS()
    }
  };
  const url = `${LINK_BBS_REFERER}/event/bbs_sign_reward/sign`;
  const res = await request.post(url, postData, config);
  if (res.data?.retcode !== 0) console.log("doBBSSign: ", res.data);
  return res.status === 200 && res.data?.retcode === 0;
};

export default doBBSSign;
