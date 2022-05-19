import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { DEFAULT_MONTH_INFO } from "../../../constants";
import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";
import withAuth from "../../auth/withAuth";

import type { MonthInfo } from "../../../services/getMonthInfo";

import styles from "./index.less";
import Loading from "../../components/Loading";
import useNotice from "../../hooks/useNotice";

const Month: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [monthInfo, setMonthInfo] = useState<MonthInfo>(DEFAULT_MONTH_INFO);

  const updateInfo = async (month: number = 0, isUserTrigger: boolean = true) => {
    setMonthInfo(DEFAULT_MONTH_INFO);
    const res = await nativeApi.getMonthInfo(month);
    console.log(res);
    if (res?.account_id) {
      setMonthInfo(res);
    } else {
      notice.faild({ message: "网络好像出了点问题，稍后再试试吧 ~" });
    }
  };

  useEffect(() => {
    (async () => updateInfo(0, false))();
  }, []);

  const dayData = monthInfo.day_data;
  const monthData = monthInfo.month_data;

  return (
    <>
      <div className={styles.desc}>
        {monthInfo.account_id ? (
          <>
            <div className={styles.title}>旅行者札记</div>
            <div>
              <span>按月份查看</span>
              {monthInfo.optional_month.map((e) => (
                <button key={e} onClick={() => updateInfo(e)}>
                  {e}
                </button>
              ))}
              <button onClick={() => updateInfo(0)}>回到本月</button>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>旅行者：{monthInfo.nickname}</div>
                <div>UID：{monthInfo.account_id}</div>
                <div>当前月份：{monthInfo.data_month}</div>
                <div>数据月份：{monthInfo.optional_month.join("/")}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>今日获取摩拉：{dayData.current_mora}</div>
                <div>今日获取原石：{dayData.current_primogems}</div>
                <div>昨日获取摩拉：{dayData.last_mora}</div>
                <div>昨日获取原石：{dayData.last_primogems}</div>
              </div>
            </div>
            <div>本月数据：</div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>本月获取摩拉：{monthData.current_mora}</div>
                <div>本月获取原石：{monthData.current_primogems}</div>
                <div>本月获取原石等级：{monthData.current_primogems_level}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>上月获取摩拉：{monthData.last_mora}</div>
                <div>上月获取原石：{monthData.last_primogems}</div>
                <div>摩拉相比上月：{monthData.mora_rate}%</div>
                <div>原石相比上月：{monthData.primogems_rate}%</div>
              </div>
            </div>
            <div>
              本月原石收入详细数据及占比：
              {monthData.group_by.map((e) => (
                <div key={e.action_id}>
                  {e.action} {e.num}原石: {e.percent}%
                </div>
              ))}
            </div>
          </>
        ) : (
          <Loading />
        )}
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={() => navigate("/")}
        />
      </div>
      {notice.holder}
    </>
  );
};

export default withAuth(Month);
