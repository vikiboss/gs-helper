import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import React, { useEffect, useState } from "react";

import { DEFAULT_SIGN_DATA, DEFAULT_SIGN_INFO } from "../../../constants";
import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";
import useNotice from "../../hooks/useNotice";
import withAuth from "../../auth/withAuth";

import paimon from "../../../assets/paimon.gif";

import type { SignData } from "../../../services/getBBSSignData";
import type { SignInfo } from "../../../services/getBBSSignInfo";

import styles from "./index.less";

const Sign: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [signInfo, setSignInfo] = useState<SignInfo>(DEFAULT_SIGN_INFO);
  const [signData, setSignData] = useState<SignData>(DEFAULT_SIGN_DATA);

  useEffect(() => {
    (async () => await updateInfo())();
  }, []);

  const updateInfo = async () => {
    const [data, info] = await Promise.all([
      nativeApi.getBBSSignData(),
      nativeApi.getBBSSignInfo()
    ]);
    if (!data.month || !info.today) return;
    setSignData(data);
    setSignInfo(info);
  };

  const handleSign = async () => {
    if (signInfo.is_sign) {
      notice.warning({ message: "今天已经签过到啦~ 不要重复签到哦" });
    } else if (signInfo.first_bind) {
      notice.warning({ message: "旅行者是第一次绑定米游社，请先到米游社手动签到一次吧~" });
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

  return (
    <>
      <div className={styles.desc}>
        {signData.awards.length ? (
          <>
            <div
              className={styles.title}
            >{`米游社原神 ${signData.month} 月签到日历，本月累计签到 ${signInfo.total_sign_day} 天，错过 ${signInfo.sign_cnt_missed} 天`}</div>
            <div className={styles.signTable}>
              {signData.awards.slice(0, 27).map((e, i) => {
                const signedClass = i + 1 <= signInfo.total_sign_day ? styles.signed : "";
                const todayNum = signInfo.is_sign ? i + 1 : i;
                const isToday = todayNum === signInfo.total_sign_day;
                const todayClass = isToday ? styles.today : "";
                return (
                  <div
                    key={`${i}${e.name}`}
                    className={cn(styles.signItem, signedClass, todayClass)}
                    onClick={isToday ? handleSign : null}
                  >
                    <img src={e.icon} alt={e.name} />
                    <div>{`${e.name}x${e.cnt}`}</div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <img src={paimon} alt='派蒙' style={{ width: "120px" }} />
            <div>小派蒙正在努力加载中...</div>
          </>
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

export default withAuth(Sign);
