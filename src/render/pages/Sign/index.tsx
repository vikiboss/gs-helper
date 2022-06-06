import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import React, { useEffect, useState } from "react";

import CircleButton from "../../components/CircleButton";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import useNotice from "../../hooks/useNotice";
import withAuth from "../../auth/withAuth";

import type { SignData } from "../../../services/getBBSSignData";
import type { SignInfo } from "../../../services/getBBSSignInfo";

import styles from "./index.less";

export const DefaultSignData: SignData = {
  month: 1,
  awards: [],
  resign: true
};

export const DefaultSignInfo: SignInfo = {
  total_sign_day: 0,
  today: "2022-01-01",
  is_sign: false,
  first_bind: false,
  is_sub: false,
  month_first: false,
  sign_cnt_missed: 0
};

const Sign: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [signInfo, setSignInfo] = useState<SignInfo>(DefaultSignInfo);
  const [signData, setSignData] = useState<SignData>(DefaultSignData);

  const { month } = signData;
  const { total_sign_day: total, sign_cnt_missed: missed } = signInfo;

  useEffect(() => {
    (async () => await updateInfo())();
  }, []);

  const updateInfo = async () => {
    try {
      const [data, info] = await Promise.all([
        nativeApi.getBBSSignData(),
        nativeApi.getBBSSignInfo()
      ]);
      if (!data.month || !info.today) return;
      setSignData(data);
      setSignInfo(info);
    } catch {
      notice.faild({ message: "加载超时，请检查网络链接" });
    }
  };

  const handleSign = async () => {
    if (signInfo.is_sign) {
      notice.warning({ message: "今天已经签过到啦~ 不要重复签到哦" });
    } else if (signInfo.first_bind) {
      notice.warning({ message: "旅行者是第一次绑定游戏账号，请先到米游社手动签到一次吧~" });
    } else {
      const isSignDone = await nativeApi.doBBSSign();
      if (isSignDone) {
        const total = signInfo.total_sign_day;
        const award = signData.awards[total];
        const todayAward = `${award.name}x${award.cnt}`;
        notice.success({ message: `签到成功！获得 ${todayAward}，本月累计签到 ${total + 1} 天` });
        await updateInfo();
      } else {
        notice.faild({ message: "很抱歉，网络异常，签到失败 T_T" });
      }
    }
  };

  const handleInfo = (i: number) => {
    const signed = i + 1 <= total;
    const signText = signed ? "奖励已领取" : "未达到领取要求";
    const message = `本月累签 ${i + 1} 天可领取，当前 ${total} 天，${signText}`;
    notice[signed ? "success" : "faild"]({ message: message });
  };

  return (
    <>
      <div className={styles.container}>
        {signData.awards.length ? (
          <div className={styles.signContainer}>
            <div className={styles.title}>{`米游社·原神 ${month} 月签到日历`}</div>
            <div className={styles.tip}>
              今日{signInfo.is_sign ? "已签" : "未签"}，签到进度：{total}/{signData.awards.length}
              {missed
                ? `，错过 ${missed} 天。冒险再忙，也要记得签到哦~`
                : "。冒险者太勤奋啦，一天都没有漏呢！"}
            </div>
            <div className={styles.signTable}>
              {signData.awards.map((e, i) => {
                const signedClass = i + 1 <= total ? styles.signed : "";
                const todayNum = signInfo.is_sign ? i + 1 : i;
                const isToday = todayNum === total;
                const todayClass = isToday ? styles.today : "";
                return (
                  <div
                    title={`本月累签 ${i + 1} 天可领取，当前 ${total} 天`}
                    key={e.name + i}
                    className={cn(styles.signItem, signedClass, todayClass)}
                    onClick={isToday ? handleSign : handleInfo.bind(null, i)}
                  >
                    <img src={e.icon} alt={e.name} />
                    <div>{`${e.name}x${e.cnt}`}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <Loading />
        )}
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={navigate.bind(null, "/")}
        />
      </div>
      {notice.holder}
    </>
  );
};

export default withAuth(Sign);
