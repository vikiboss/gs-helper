import { LINK_BBS_REFERER } from "../constants";
import { store } from "../main";
import request from "../utils/request";

import type { BaseRes } from "../utils/request";

type Navigator = {
  id: number;
  name: string;
  icon: string;
  app_path: string;
  reddot_online_time: string;
};

type BBSHomeData = {
  navigator: Navigator[];
  discussion: any;
  background: any;
  official: any;
  carousels: any;
  hot_topics: any;
  game_receptions: any[];
  posts: any[];
};

const getBBSSignActId = async (): Promise<string> => {
  const { cookie } = store.get("user");
  if (!cookie) return null;
  const config = {
    headers: {
      Referer: LINK_BBS_REFERER,
      Cookie: cookie
    }
  };
  const url = `${LINK_BBS_REFERER}/apihub/api/home/new?gids=2`;
  const { status, data } = await request.get<BaseRes<BBSHomeData>>(url, config);
  if (status !== 200 || data.retcode !== 0) console.log("getBBSSignActId: ", data);
  const signPageUrl =
    data.data.navigator.filter((e: any) => e.name.contains("签到"))[0].app_path || "";
  const params = new URLSearchParams(signPageUrl.split("?").reverse()[0]);
  console.log("getBBSSignActId: ", params.get("act_id"));
  return params.get("act_id") || "e202009291139501";
};

export default getBBSSignActId;
