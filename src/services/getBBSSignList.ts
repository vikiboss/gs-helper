import { LINK_BBS_REFERER } from "../constants";
import { store } from "../main";
import getServerByUid from "../utils/getServerByUid";
import request from "../utils/request";

// {
//   "retcode": 0,
//   "message": "OK",
//   "data": {
//     "month": 5,
//     "awards": [
//       {
//         "icon": "https://webstatic.mihoyo.com/upload/event/2020/09/29/01ba12730bd86c8858c1e2d86c7d150d_1448304511922419521.png",
//         "name": "冒险家的经验",
//         "cnt": 3
//       }
//     ],
//     "resign": true
//   }
// }

const getBBSSignList = async (act_id: string) => {
  const { cookie } = store.get("user");
  if (!cookie) return null;
  const config = {
    params: { act_id },
    headers: {
      Referer: LINK_BBS_REFERER,
      Cookie: cookie
    }
  };
  const url = `${LINK_BBS_REFERER}/event/bbs_sign_reward/home`;
  const { status, data } = await request.get(url, config);
  if (status !== 200 || data?.retcode !== 0) console.log("getBBSSignList: ", data);
  return data?.data || null;
};

export default getBBSSignList;
