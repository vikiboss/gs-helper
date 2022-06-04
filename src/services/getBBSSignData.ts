import { API_TAKUMI, LINK_BBS_REFERER } from "../constants";
import getBBSSignActId from "./getBBSSignActId";
import request from "../utils/request";

import type { BaseRes } from "../utils/request";

export type SignItem = {
  cnt: number;
  icon: string;
  name: string;
};

export type SignData = {
  awards: SignItem[];
  month: number;
  resign: boolean;
};

const getBBSSignData = async (): Promise<SignData | null> => {
  const act_id = await getBBSSignActId();
  const config = {
    params: { act_id },
    headers: { referer: LINK_BBS_REFERER }
  };
  const url = `${API_TAKUMI}/event/bbs_sign_reward/home`;
  const { status, data } = await request.get<BaseRes<SignData>>(url, config);
  if (status !== 200 || data.retcode !== 0) console.log("getBBSSignData: ", data);
  return data?.data || null;
};

export default getBBSSignData;
