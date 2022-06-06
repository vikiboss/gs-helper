import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import React, { useEffect, useState } from "react";

import BounceNumber from "../../components/BounceNumber";
import CircleButton from "../../components/CircleButton";
import getGreetingMsg from "../../../utils/getGreetingMsg";
import Loading from "../../components/Loading";
import Pie from "./Pie";
import useNotice from "../../hooks/useNotice";
import wait from "../../../utils/wait";
import withAuth from "../../auth/withAuth";

import mora from "../../../assets/mora.png";
import primogem from "../../../assets/primogem.png";
import nativeApi from "../../utils/nativeApi";

import type { MonthInfo } from "../../../services/getMonthInfo";

import styles from "./index.less";

export const DefaultMonthInfo: MonthInfo = {
  uid: 0,
  region: "cn_gf01",
  account_id: 0,
  nickname: "旅行者",
  date: "2022-01-01",
  month: 0,
  optional_month: [],
  data_month: 1,
  data_last_month: 12,
  day_data: {
    current_primogems: 0,
    current_mora: 0,
    last_primogems: 0,
    last_mora: 0
  },
  month_data: {
    current_primogems: 0,
    current_mora: 0,
    last_primogems: 0,
    last_mora: 0,
    current_primogems_level: 0,
    primogems_rate: 0,
    mora_rate: 0,
    group_by: []
  },
  lantern: false
};

const Month: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [initMonth, setInitMonth] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [monthInfos, setMonthInfos] = useState<MonthInfo[]>([DefaultMonthInfo]);

  useEffect(() => {
    (async () => {
      try {
        const initMonth = await nativeApi.getMonthInfo();
        setInitMonth(initMonth.data_month);
        setMonth(initMonth.data_month);
        const data = [];
        for (const e of initMonth.optional_month) {
          await wait(50);
          const res = await nativeApi.getMonthInfo(e);
          if (res) data.push(res);
          else notice.faild({ message: "网络异常，部分月份数据获取失败，请重试" });
        }
        setMonthInfos(data);
      } catch {
        notice.faild({ message: "加载超时，请检查网络链接" });
      }
    })();
  }, []);

  const initData = monthInfos.filter((e) => e.data_month === initMonth)[0] || DefaultMonthInfo;
  const monthInfo = monthInfos.filter((e) => e.data_month === month)[0] || DefaultMonthInfo;
  const monthData = monthInfo.month_data;
  const pSign = monthData.primogems_rate >= 0;
  const mSign = monthData.mora_rate >= 0;
  const greeting = getGreetingMsg(undefined, true);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>旅行者札记</div>
        {monthInfos[0]?.account_id ? (
          <div className={styles.content}>
            <div className={styles.greeting}>
              {initData.nickname}，{greeting}
            </div>
            <div className={styles.today}>
              <div className={styles.itemBg}>
                <span>今日</span>
                <div className={styles.item}>
                  <img src={primogem} alt='原石' />
                  <BounceNumber
                    number={initData.day_data.current_primogems}
                    wrapperStyle={{ width: "40px" }}
                  />
                  <img src={mora} alt='摩拉' />
                  <BounceNumber
                    number={initData.day_data.current_mora}
                    wrapperStyle={{ width: "80px" }}
                  />
                </div>
              </div>
              <div className={styles.itemBg}>
                <span>昨日</span>
                <div className={styles.item}>
                  <img src={primogem} alt='原石' />
                  <BounceNumber
                    number={initData.day_data.last_primogems}
                    wrapperStyle={{ width: "40px" }}
                  />
                  <img src={mora} alt='摩拉' />
                  <BounceNumber
                    number={initData.day_data.last_mora}
                    wrapperStyle={{ width: "80px" }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.filter}>
              {initData.optional_month.length > 1 && <span>按月份查看：</span>}
              {initData.optional_month.length === 0 && <span>暂无数据</span>}
              {initData.optional_month.map((e) => (
                <div
                  key={e}
                  onClick={() => setMonth(e)}
                  className={cn(styles.btn, month === Number(e) ? styles.active : "")}
                >
                  {e}月
                </div>
              ))}
            </div>

            <div className={styles.monthContent}>
              <div>
                <div className={styles.monthTitle}>{monthInfo.data_month}月札记</div>
                <div className={styles.monthDesc}>当月累计获取资源</div>
                <div className={styles.monthItem}>
                  <img src={primogem} alt='原石' />
                  <BounceNumber
                    number={monthData.current_primogems}
                    wrapperStyle={{ width: "80px" }}
                  />
                  <span>
                    相当于 {Math.floor(monthData.current_primogems / 160)} 次祈愿
                    {monthData.last_primogems > 0 &&
                      `，相比上月${pSign ? " +" : " -"}${Math.abs(monthData.primogems_rate)}%`}
                  </span>
                </div>
                <div className={styles.monthItem}>
                  <img src={mora} alt='摩拉' />
                  <BounceNumber number={monthData.current_mora} wrapperStyle={{ width: "80px" }} />
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
              之外获取的资源，支持查询近三个月的数据，可能存在延迟，请以游戏内为准，此处仅供参考。
            </div>
          </div>
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
