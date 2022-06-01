import { API_HK4E, LINK_BBS_REFERER } from "../constants";
import { DefaultAppData } from "./../constants";
import { store } from "../main";

import getServerByUid from "../utils/getServerByUid";

import request, { BaseRes } from "../utils/request";

import { AppData } from "../typings";

type DayData = {
  current_primogems: number;
  current_mora: number;
  last_primogems: number;
  last_mora: number;
};

type GroupBy = {
  action_id: number;
  action: string;
  num: number;
  percent: number;
};

type MonthData = {
  current_primogems: number;
  current_mora: number;
  last_primogems: number;
  last_mora: number;
  current_primogems_level: number;
  primogems_rate: number;
  mora_rate: number;
  group_by: GroupBy[];
};

export type MonthInfo = {
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
};

const getMonthInfo = async (month: number = 0): Promise<MonthInfo | null> => {
  const { cookie, uid } = store.get<string, AppData["user"]>("user", DefaultAppData["user"]);
  const url = `${API_HK4E}/event/ys_ledger/monthInfo`;
  const params = { month, bind_uid: uid, bind_region: getServerByUid(uid) };
  const config = {
    params,
    headers: {
      referer: LINK_BBS_REFERER,
      cookie
    }
  };
  const { status, data } = await request.get<BaseRes<MonthInfo>>(url, config);
  const faild = status !== 200 || data.retcode !== 0;
  if (faild) console.log("getMonthInfo: ", data);
  return data?.data;
};

export default getMonthInfo;
