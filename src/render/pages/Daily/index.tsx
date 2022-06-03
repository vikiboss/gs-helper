import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import React, { useEffect, useState } from "react";

import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";
import withAuth from "../../auth/withAuth";

import type { CalenderEvent } from "../../../services/getCalenderList";

import styles from "./index.less";

const WeekMap = ["日", "一", "二", "三", "四", "五", "六"];
const Types = [
  { title: "可培养角色", name: "roles" },
  { title: "可突破武器", name: "weapons" },
  { title: "可获取素材", name: "materials" }
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
  return res.sort((p, n) => {
    const pn = Number(p.title.includes("「"));
    const nn = Number(n.title.includes("「"));
    return pn - nn;
  });
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
  const [changing, setChanging] = useState<boolean>(false);
  const [type, setType] = useState<string>("roles");
  const [week, setWeek] = useState<number>(todayWeek);
  const [calenderList, setCalenderList] = useState<CalenderEvent[]>([]);

  useEffect(() => {
    (async () => {
      const res = await nativeApi.getCalenderList();
      if (res.length > 0) setCalenderList(res);
    })();
  }, []);

  const roles = calenderList.filter((e) => e.break_type === "2");
  const weapons = calenderList.filter((e) => e.break_type === "1");
  const materials = getMaterialList(calenderList);
  const map: Record<string, CalenderEvent[]> = { roles, weapons, materials };
  const list = map[type];
  const today = list.filter((e) => e.drop_day.includes(String(((week + 6) % 7) + 1)));
  const todayClass = cn(styles.btn, todayWeek === week ? styles.active : "");

  const handleChange = async (fn: Function) => {
    setChanging(true);
    fn();
    setTimeout(() => setChanging(false), 20);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>今日素材一览</div>
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <div className={styles.weeks}>
            <div className={todayClass} onClick={() => handleChange(setWeek.bind(null, todayWeek))}>
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
            {today.map((e) => (
              <div key={e.title}>
                <img src={e.img_url} alt={e.title} />
                <span>{e.title}</span>
              </div>
            ))}
          </div>
        )}
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
