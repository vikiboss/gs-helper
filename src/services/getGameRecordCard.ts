import { API_TAKUMI_RECORD, LINK_BBS_REFERER } from "../constants";
import { qs } from "../utils/utils";
import getCurrentUser from "../main/IPC/getCurrentUser";
import getDS from "../utils/getDS";
import request from "../utils/request";

import type { BaseRes } from "../typings";

export type GameRecordCardData = GameRecordCardItem[];

export interface GameRecordCardItem {
  region_name: string;
  game_id: number;
  is_public: boolean;
  h5_data_switches: any[];
  url: string;
  level: number;
  has_role: boolean;
  data: Data[];
  region: string;
  data_switches: Data_switches[];
  game_role_id: string;
  nickname: string;
  background_image: string;
}

export interface Data {
  name: string;
  type: number;
  value: string;
}

export interface Data_switches {
  switch_name: string;
  switch_id: number;
  is_public: boolean;
}

const getGameRecordCard = async (uid?: string): Promise<GameRecordCardData | null> => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  uid = uid || currentUser.uid;
  const url = `${API_TAKUMI_RECORD}/game_record/app/card/wapi/getGameRecordCard`;
  const params = { uid };
  const headers = {
    referer: LINK_BBS_REFERER,
    DS: getDS(qs(params)),
    cookie: currentUser.cookie
  };
  const { status, data } = await request.get<BaseRes<{ list: GameRecordCardData }>>(url, {
    headers,
    params
  });
  const isOK = status === 200 && data.retcode === 0;
  console.log("getGameRecordCard: ", data);
  if (!isOK) console.log("getGameRecordCard: ", data);
  return isOK ? data?.data?.list || null : null;
};

export default getGameRecordCard;
