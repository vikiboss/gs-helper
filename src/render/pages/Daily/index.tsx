import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import React, { useEffect, useState } from "react";

import CircleButton from "../../components/CircleButton";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import useNotice from "../../hooks/useNotice";
import withAuth from "../../auth/withAuth";

import type { CalenderEvent } from "../../../services/getCalenderList";

import styles from "./index.less";

type Type = "roles" | "weapons" | "materials";

const WeekMap = ["日", "一", "二", "三", "四", "五", "六"];

const Types = [
  { title: "天赋培养", name: "roles" },
  { title: "武器突破", name: "weapons" },
  { title: "突破素材", name: "materials" }
];

const Tips = [
  "「周日」 所有秘境均开放，所有材料均可获取",
  "「周一」 与 「周四」 开放的秘境与可获取的材料相同",
  "「周二」 与 「周五」 开放的秘境与可获取的材料相同",
  "「周三」 与 「周六」 开放的秘境与可获取的材料相同",
  "「周一」 与 「周四」 开放的秘境与可获取的材料相同",
  "「周二」 与 「周五」 开放的秘境与可获取的材料相同",
  "「周三」 与 「周六」 开放的秘境与可获取的材料相同"
];

const getUniqueArray = (arr: any[], key: string) => {
  const values = new Set();
  const res = [];
  for (const e of arr) {
    if (!values.has(e[key])) {
      values.add(e[key]);
      res.push(e);
    }
  }
  return res;
};

const getMaterialList = (calenderList: CalenderEvent[]) => {
  const kind2 = calenderList.filter((e) => e.kind === "2");
  let materials: CalenderEvent[] = [];
  for (const e of kind2) {
    const infos = e.contentInfos;
    const len = infos.length;
    if (!len) continue;
    const title = infos[0].title;
    const talent = infos.filter((e) => e.title.includes("哲学"))[0];
    const item = title.includes("「") ? talent : infos[len - 1];
    materials.push({
      ...e,
      title: item.title.slice(0, 4) + "系列",
      img_url: item.icon
    });
  }
  materials = getUniqueArray(materials, "title");
  return materials;
};

const Daily: React.FC = () => {
  const todayWeek = new Date().getDay();
  const navigate = useNavigate();
  const notice = useNotice();
  const [calenderList, setCalenderList] = useState<CalenderEvent[]>([]);
  const [changing, setChanging] = useState<boolean>(false);
  const [type, setType] = useState<Type>("roles");
  const [week, setWeek] = useState<number>(todayWeek);

  useEffect(() => {
    (async () => {
      const res = await nativeApi.getCalenderList();
      if (res.length > 0) setCalenderList(res);
    })();
  }, []);

  const roles = calenderList.filter((e) => e.break_type === "2");
  roles.sort((p, n) => JSON.parse(p.sort)[0] - JSON.parse(n.sort)[0]);
  const weapons = calenderList.filter((e) => e.break_type === "1");
  weapons.sort((p, n) => JSON.parse(p.sort)[0] - JSON.parse(n.sort)[0]);
  const materials = getMaterialList(calenderList);
  materials.sort((p, n) => JSON.parse(p.sort)[0] - JSON.parse(n.sort)[0]);
  const map: Record<string, CalenderEvent[]> = { roles, weapons, materials };
  const list = map[type].filter((e) => e.drop_day.includes(String(((week + 6) % 7) + 1)));
  const todayClass = cn(styles.btn, todayWeek === week ? styles.active : "");

  const handleChange = async (fn: Function) => {
    setChanging(true);
    fn();
    setTimeout(() => setChanging(false), 20);
  };

  const handleItemClick = (e: CalenderEvent) => {
    let message = type === "roles" ? `「${e.title}」 天赋培养需要：` : "";
    message += type !== "materials" ? `${e.contentInfos.map((e) => e.title).join("、")}` : e.title;
    message += `，可在 「${e.contentSource[0]?.title || "忘却之峡"}」 获取`;
    notice.info({ message });
  };

  return (
    <>
      <div className={styles.container}>
        {calenderList.length > 0 ? (
          <>
            <div className={styles.title}>原神日历</div>
            <div className={styles.content}>
              <div className={styles.contentTop}>
                <div className={styles.weeks}>
                  <div
                    className={todayClass}
                    onClick={() => handleChange(setWeek.bind(null, todayWeek))}
                  >
                    今日
                  </div>
                  <span>|</span>
                  {WeekMap.map((e, i) => (
                    <div
                      key={e}
                      className={cn(styles.btn, i === week ? styles.active : "")}
                      onClick={() => handleChange(setWeek.bind(null, i))}
                    >
                      周{e}
                    </div>
                  ))}
                </div>
                <div className={styles.types}>
                  {Types.map((e) => (
                    <div
                      key={e.name}
                      className={cn(styles.btn, e.name === type ? styles.active : "")}
                      onClick={() => handleChange(setType.bind(null, e.name))}
                    >
                      {e.title}
                    </div>
                  ))}
                </div>
              </div>
              {!changing && (
                <div className={styles.main}>
                  {list.map((e) => (
                    <div key={e.title} onClick={() => handleItemClick(e)}>
                      <img src={e.img_url} alt={e.title} />
                      <span>{e.title}</span>
                    </div>
                  ))}
                </div>
              )}
              <span className={styles.tip}>
                ※ {Tips[week]}
                。秘境凌晨四点刷新，若当前时间超过凌晨但未过凌晨四点，请以前一日数据为准。
              </span>
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

export default withAuth(Daily);
