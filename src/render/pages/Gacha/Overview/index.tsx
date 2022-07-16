import React from "react";

import { GachaTypeMap } from "../utils/filterGachaList";
import { PageProp, GachaMap } from "..";

import type { GachaType } from "../../../../typings";

import styles from "./index.less";

const Overview: React.FC<PageProp> = ({ gacha, filter, toggleFilter, notice }) => {
  const getGachaStatictics = () => {
    const map = Object.keys(GachaMap).filter((e) => e !== "newer") as GachaType[];
    const res: { all: number; times: number; unluckyDays: number; name: string }[] = [];
    for (const type of map) {
      // 获取相应祈愿分类的所有数据
      const list = gacha.list.filter((e) => {
        const target = GachaTypeMap[type];
        if (Array.isArray(target)) {
          return target.includes(e.uigf_gacha_type);
        } else {
          return target === e.uigf_gacha_type;
        }
      });
      // 存放所有5星的索引（1 开始）
      const i_5 = [];
      for (const [i, e] of list.entries()) if (e.rank_type === "5") i_5.push(i + 1);
      // 5星平均出货次数
      const times = i_5.length ? Math.floor(i_5[i_5.length - 1] / i_5.length) : 0;
      // 累计未出5星的次数
      const unluckyDays = list.length - (i_5.length ? i_5[i_5.length - 1] : 0);
      res.push({ all: list.length, times, unluckyDays, name: GachaMap[type] });
    }
    return res;
  };

  const statictics = getGachaStatictics();

  return (
    <div className={styles.content}>
      <div>
        <div className={styles.detailData}>
          {statictics.map((e) => (
            <div className={styles.detailTitle} key={e.name}>
              {`※ ${e.name}共计`}
              <span className={styles.star3}> {e.all} </span>
              {`次，平均5星出货需要 `}
              <span className={styles.star4}> {e.times} </span>
              {`次，已累计`}
              <span className={styles.star5}> {e.unluckyDays} </span>
              {`次未出5星`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
