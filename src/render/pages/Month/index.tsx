import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { DEFAULT_MONTH_INFO } from "../../../constants";
import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";
import withAuth from "../../auth/withAuth";

import type { MonthInfo } from "../../../services/getMonthInfo";

import styles from "./index.less";

const Month: React.FC = () => {
  const navigate = useNavigate();
  const [monthInfo, setMonthInfo] = useState<MonthInfo>(DEFAULT_MONTH_INFO);

  useEffect(() => {
    (async () => {
      const res = await nativeApi.getMonthInfo();
      console.log(res);
      setMonthInfo(res);
    })();
  }, []);

  const dayData = monthInfo.day_data;
  const monthData = monthInfo.month_data;

  return (
    <div className={styles.desc}>
      <div className={styles.title}>旅行者札记</div>
      <div style={{ display: "flex" }}>
        <div>旅行者：{monthInfo.nickname}</div>|<div>UID：{monthInfo.account_id}</div>|
        <div>当前月份：{monthInfo.data_month}</div>|
        <div>数据月份：{monthInfo.optional_month.join("/")}</div>
      </div>
      <div>今日数据：</div>
      <div style={{ display: "flex" }}>
        <div>今日获取摩拉：{dayData.current_mora}</div>
        <div>今日获取原石：{dayData.current_primogems}</div>
        <div>昨日获取摩拉：{dayData.last_mora}</div>
        <div>昨日获取原石：{dayData.last_primogems}</div>
      </div>
      <div>本月数据：</div>
      <div style={{ display: "flex" }}>
        <div>本月获取摩拉：{monthData.current_mora}</div>
        <div>本月获取原石：{monthData.current_primogems}</div>
        <div>本月获取原石等级：{monthData.current_primogems_level}</div>
      </div>
      <div>
        <div>上月获取摩拉：{monthData.last_mora}</div>
        <div>上月获取原石：{monthData.last_primogems}</div>
        <div>摩拉相比上月：{monthData.mora_rate}%</div>
        <div>原石相比上月：{monthData.primogems_rate}%</div>
      </div>
      <div>
        本月原石收入详细数据及占比：
        {monthData.group_by.map((e) => (
          <div key={e.action_id}>
            {e.action}共获取{e.num}原石: {e.percent}%
          </div>
        ))}
      </div>
      <CircleButton
        Icon={TiArrowBack}
        size='middle'
        className={styles.backBtn}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default withAuth(Month);
