import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import React, { useEffect, useState } from "react";

import { DefaultMonthInfo } from "../../../constants";
import CircleButton from "../../components/CircleButton";
import getGreetingMsg from "../../../utils/getGreetingMsg";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import styles from "./index.less";
import useNotice from "../../hooks/useNotice";
import withAuth from "../../auth/withAuth";

import primogem from "../../../assets/primogem.png";
import mora from "../../../assets/mora.png";

import type { MonthInfo } from "../../../services/getMonthInfo";
import Pie from "./Pie";

const Month: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [month, setMonth] = useState<number>(0);
  const [init, setInit] = useState<MonthInfo>(DefaultMonthInfo);
  const [monthInfo, setMonthInfo] = useState<MonthInfo>(DefaultMonthInfo);

  const updateInfo = async (month?: number, isUserTrigger: boolean = false) => {
    setMonthInfo(DefaultMonthInfo);
    setMonth(month || 0);
    const data = await nativeApi.getMonthInfo(month);
    console.log(data);
    if (data?.account_id) {
      setMonth(data.data_month);
      setMonthInfo(data);
    } else {
      isUserTrigger && notice.faild({ message: "网络好像出了点问题，稍后再试试吧 ~" });
    }
  };

  useEffect(() => {
    (async () => {
      const initMonth = await nativeApi.getMonthInfo();
      initMonth.account_id && setInit(initMonth);
      updateInfo();
    })();
  }, []);

  const monthData = monthInfo.month_data;
  const pSign = monthData.primogems_rate >= 0;
  const mSign = monthData.mora_rate >= 0;
  const greeting = getGreetingMsg(undefined, true);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>旅行者札记</div>
        <div className={styles.content}>
          <div className={styles.greeting}>
            {init.nickname}，{greeting}
          </div>
          <div className={styles.today}>
            <div className={styles.itemBg}>
              <span>今日</span>
              <div className={styles.item}>
                <img src={primogem} alt='原石' />
                <span>{init.day_data.current_primogems}</span>
                <img src={mora} alt='摩拉' />
                <span>{init.day_data.current_mora}</span>
              </div>
            </div>
            <div className={styles.itemBg}>
              <span>昨日</span>
              <div className={styles.item}>
                <img src={primogem} alt='原石' />
                <span>{init.day_data.last_primogems}</span>
                <img src={mora} alt='摩拉' />
                <span>{init.day_data.last_mora}</span>
              </div>
            </div>
          </div>

          <div className={styles.filter}>
            {init.optional_month.length > 1 && <span>按月份查看：</span>}
            {init.optional_month.map((e) => (
              <div
                key={e}
                onClick={() => updateInfo(e, true)}
                className={cn(styles.btn, month === Number(e) ? styles.active : "")}
              >
                {e}月
              </div>
            ))}
          </div>

          {monthInfo.account_id ? (
            <>
              <div className={styles.monthContent}>
                <div>
                  <div className={styles.monthTitle}>{monthInfo.data_month}月札记</div>
                  <div className={styles.monthDesc}>当月累计获取资源</div>
                  <div className={styles.monthItem}>
                    <img src={primogem} alt='原石' />
                    <span>{monthData.current_primogems}</span>
                    <span>
                      相当于 {Math.floor(monthData.current_primogems / 160)} 次祈愿
                      {monthData.last_primogems > 0 &&
                        `，相比上月${pSign ? " +" : " -"}${Math.abs(monthData.primogems_rate)}%`}
                    </span>
                  </div>
                  <div className={styles.monthItem}>
                    <img src={mora} alt='摩拉' />
                    <span>{monthData.current_mora}</span>
                    {monthData.last_mora > 0 && (
                      <span>
                        相比上月 {mSign ? "+" : "-"}
                        {Math.abs(monthData.mora_rate)}%
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <Pie
                    data={monthData.group_by.map((e) => ({
                      id: e.action,
                      value: e.num
                    }))}
                    width={480}
                    height={240}
                  />
                </div>
              </div>
              <div className={styles.tip}>
                ※ 仅统计 「充值途径」
                之外获取的资源，暂只支持查询近三个月的数据，可能存在延迟，请以游戏内为准，此处仅供参考。
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
      </div>
      {notice.holder}
    </>
  );
};

export default withAuth(Month);
