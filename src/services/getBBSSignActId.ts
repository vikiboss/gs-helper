import { API_BBS, LINK_BBS_REFERER } from "./../constants";
import request from "../utils/request";

import type { BaseRes } from "../utils/request";

type Navigator = {
  app_path: string;
  icon: string;
  id: number;
  name: string;
  reddot_online_time: string;
};

type BBSHomeData = {
  background: any;
  carousels: any;
  discussion: any;
  game_receptions: any[];
  hot_topics: any;
  navigator: Navigator[];
  official: any;
  posts: any[];
};

const getBBSSignActId = async (): Promise<string> => {
  const headers = { referer: LINK_BBS_REFERER };
  const url = `${API_BBS}/apihub/api/home/new?gids=2`;
  const { status, data } = await request.get<BaseRes<BBSHomeData>>(url, { headers });
  if (status !== 200 || data.retcode !== 0) console.log("getBBSSignActId: ", data);
  const signPageUrl =
    data.data.navigator.filter((e: any) => e.name.includes("签到"))[0].app_path || "";
  const params = new URLSearchParams(signPageUrl.split("?").reverse()[0]);
  console.log("getBBSSignActId: ", params.get("act_id"));
  return params.get("act_id") || "e202009291139501";
};

export default getBBSSignActId;
