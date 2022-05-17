import { LINK_BBS_REFERER } from "../constants";
import { store } from "../main";
import getBBSSignActId from "./getBBSSignActId";
import request from "../utils/request";

import type { BaseRes } from "../utils/request";

export type SignItem = {
  icon: string;
  name: string;
  cnt: number;
};

export type SignListData = {
  month: number;
  awards: SignItem[];
  resign: boolean;
};

const getBBSSignList = async (): Promise<SignListData | null> => {
  const { cookie } = store.get("user");
  if (!cookie) return null;
  const act_id = await getBBSSignActId();
  const config = {
    params: { act_id },
    headers: {
      Referer: LINK_BBS_REFERER,
      Cookie: cookie
    }
  };
  const url = `${LINK_BBS_REFERER}/event/bbs_sign_reward/home`;
  const { status, data } = await request.get<BaseRes<SignListData>>(url, config);
  if (status !== 200 || data.retcode !== 0) console.log("getBBSSignList: ", data);
  return data.data || null;
};

export default getBBSSignList;
