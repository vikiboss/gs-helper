import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";

import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";
import withAuth from "../../auth/withAuth";

import type { CalenderEvent } from "../../../services/getCalenderList";

import styles from "./index.less";

const WeekMap = ["日", "一", "二", "三", "四", "五", "六"];

const Daily: React.FC = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<string>("role");
  const [calenderList, setCalenderList] = useState<CalenderEvent[]>([]);

  useEffect(() => {
    (async () => {
      const res = await nativeApi.getCalenderList();
      if (res.length > 0) setCalenderList(res);
    })();
  }, []);

  const weekNum = new Date().getDay();
  const week = WeekMap[weekNum];
  const roles = calenderList.filter((e) => e.break_type === "2");
  const weapons = calenderList.filter((e) => e.break_type === "1");
  const today = (type === "role" ? roles : weapons).filter((e) =>
    e.drop_day.includes(String(weekNum))
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>突破材料周常表</div>
      <div>今天周{week}，可刷取材料如下：</div>
      <div>
        <button onClick={() => setType("role")}>角色</button>
        <button onClick={() => setType("weapon")}>武器</button>
      </div>
      <div>
        <div>今日可提升：</div>
        {today.map((e) => (
          <div key={e.id}>
            <img src={e.img_url} alt={e.title} style={{ width: "28px" }} />
            {e.title}:
            {e.contentInfos.map((e) => (
              <Fragment key={e.title}>
                <img src={e.icon} alt={e.title} style={{ width: "28px" }} />
                {e.title}
              </Fragment>
            ))}
            ,
            {e.contentSource.map((e) => (
              <Fragment key={e.title}>
                <img src={e.icon} alt={e.title} style={{ width: "28px" }} />
                {e.title}
              </Fragment>
            ))}
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

export default withAuth(Daily);
