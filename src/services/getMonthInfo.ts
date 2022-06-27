import { API_HK4E, LINK_BBS_REFERER } from "../constants";
import getCurrentUser from "../main/IPC/getCurrentUser";
import getServerByUid from "../utils/getServerByUid";
import request from "../utils/request";

import type { BaseRes } from "../typings";

interface DayData {
  current_primogems: number;
  current_mora: number;
  last_primogems: number;
  last_mora: number;
}

interface GroupBy {
  action_id: number;
  action: string;
  num: number;
  percent: number;
}

interface MonthData {
  current_primogems: number;
  current_mora: number;
  last_primogems: number;
  last_mora: number;
  current_primogems_level: number;
  primogems_rate: number;
  mora_rate: number;
  group_by: GroupBy[];
}

export interface MonthInfo {
  uid: number;
  region: string;
  account_id: number;
  nickname: string;
  date: string;
  month: number;
  optional_month: number[];
  data_month: number;
  data_last_month: number;
  day_data: DayData;
  month_data: MonthData;
  lantern: boolean;
}

const getMonthInfo = async (month: number = 0): Promise<MonthInfo | null> => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  const { cookie, uid } = currentUser;
  const url = `${API_HK4E}/event/ys_ledger/monthInfo`;
  const params = { month, bind_uid: uid, bind_region: getServerByUid(uid) };
  const headers = { referer: LINK_BBS_REFERER, cookie };
  const { status, data } = await request.get<BaseRes<MonthInfo>>(url, { params, headers });
  const isOK = status === 200 && data.retcode === 0;
  if (!isOK) console.log("getMonthInfo: ", data);
  return isOK ? data?.data || null : null;
};

export default getMonthInfo;
