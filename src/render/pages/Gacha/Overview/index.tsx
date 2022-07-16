import React from "react";

import { ItemTypeMap } from "../utils/filterGachaList";
import { PageProp, GachaMap } from "..";

import type { GachaItemType, GachaType } from "../../../../typings";

import styles from "./index.less";
import getListByType from "../utils/getListByType";
import { NormalItemList } from "../../../../constants";
import transformGachaDataDate from "../utils/transformGachaDataDate";

// 4. 限定五星角色平均花费原石
// 5. 限定五星角色平均出金次数
// 6. 限定五星武器平均出金次数
// 7. 限定五星武器平均花费原石
// 8. 所有五星物品平均花费原石
// 9. 角色 UP 池小保底不歪的概率
// 10. 最有缘的五星：刻晴，共了抽 2 次
// 11. 最非酋的五星：刻晴，抽了 74 次
// 12. 最欧皇的五星：莫娜，抽了 72 次
// 13. 最疯狂的一天：2022 年 7 月 14 日 共抽了 83 次
// 14. 角色 up 池平均出金，星级比例，欧非分析
// 15. 常驻池平均出金，星级比例，欧非分析
// 16. 武器池平均出金，星级比例，欧非分析

const Overview: React.FC<PageProp> = ({ gacha, filter, toggleFilter, notice }) => {
  const getGachaStatictics = () => {
    const map = Object.keys(GachaMap).filter((e) => e !== "newer") as GachaType[];
    const res: {
      all: number;
      number: number;
      comment: string;
      times: number;
      unluckyDays: number;
      name: string;
    }[] = [];
    for (const type of map) {
      // 获取相应祈愿分类的所有数据
      const list = getListByType(gacha.list, type);
      // 存放所有5星的索引（1 开始）
      const i_5 = [];
      for (const [i, e] of list.entries()) if (e.rank_type === "5") i_5.push(i + 1);
      // 5星平均出货次数
      const times = i_5.length ? i_5[i_5.length - 1] / i_5.length : 0;
      // 累计未出5星的次数
      const unluckyDays = list.length - (i_5.length ? i_5[i_5.length - 1] : 0);
      res.push({
        all: list.length,
        number: i_5.length,
        comment:
          times === 0
            ? "欧皇正在酝酿"
            : times >= 80
            ? "最强超级无敌大非酋"
            : times >= 76
            ? "超级无敌大非酋"
            : times >= 72
            ? "无敌大非酋"
            : times >= 68
            ? "大非酋"
            : times >= 64
            ? "非酋本酋"
            : times >= 60
            ? "欧皇本皇"
            : times >= 56
            ? "大欧皇"
            : times >= 52
            ? "无敌大欧皇"
            : times >= 48
            ? "超级无敌大欧皇"
            : times >= 32
            ? "最强超级无敌大欧皇"
            : "宇宙最强超级无敌大欧皇",
        times,
        unluckyDays,
        name: GachaMap[type]
      });
    }
    return res;
  };

  const getAverageTimes = (type: GachaItemType | "all", isLimit = true) => {
    const list =
      type === "all"
        ? gacha.list
        : type === "role"
        ? getListByType(gacha.list, "activity")
        : getListByType(gacha.list, "weapon");

    const i_5 = [];
    for (const [i, e] of list.entries()) {
      const limit = isLimit ? !NormalItemList.includes(e.name) : true;
      const isTypeRight = type === "all" || e.item_type === ItemTypeMap[type];
      if (e.rank_type === "5" && isTypeRight && limit) {
        i_5.push(i + 1);
      }
    }
    const times = i_5.length ? i_5[i_5.length - 1] / i_5.length : 0;
    return times;
  };

  const getLuckInfo = () => {
    // 0 为 小保底，1 为大保底
    let [count, luck] = [0, 0];
    let status = 0;
    const ActivityList = getListByType(gacha.list, "activity");
    for (const e of ActivityList) {
      if (e.rank_type === "5") {
        if (status === 1) {
          status = 0;
        } else {
          const isMiss = NormalItemList.includes(e.name);
          count++;
          !isMiss && luck++;
          status = isMiss ? 1 : 0;
        }
      }
    }
    return { count, luck, rate: ((100 * luck) / (count || 1)).toFixed(2) };
  };

  const statictics = getGachaStatictics();
  const luckInfo = getLuckInfo();
  const limitRoleTimes = getAverageTimes("role");
  const limitWeaponTimes = getAverageTimes("weapon");
  const allTimes = statictics
    .filter((e) => e.times !== 0)
    .reduce((p, n) => (p = p + n.times / n.number), 0);
  const dateInfo = transformGachaDataDate(gacha.list);
  const maxTimes = Math.max(...dateInfo.map((e) => e.value));
  const days = dateInfo.filter((e) => e.value === maxTimes);
  const maxDay = days.length && days[days.length - 1].day;

  return (
    <div className={styles.content}>
      <div>
        <div className={styles.detailData}>
          {statictics.map((e) => (
            <div className={styles.detailTitle} key={e.name}>
              {`※ ${e.name}共计 `}
              <span className={styles.star3}>{e.all}</span>
              {` 次，平均出金 `}
              <span className={styles.star4}>{e.times.toFixed(2)}</span>
              {` ，当前已 `}
              <span className={styles.star5}>{e.unluckyDays}</span>
              {` 次未出金，`}
              <span className={styles.star5}>{e.comment}</span>
            </div>
          ))}
        </div>
        <div>
          <div>
            小保底次数：{luckInfo.count}，不歪次数：{luckInfo.luck}，不歪概率 {luckInfo.rate}%
          </div>

          <div>限定五星角色平均出金次数 {limitRoleTimes.toFixed(2)}</div>
          <div>限定五星角色平均花费原石 {Math.round(limitRoleTimes * 160)}</div>
          <div>限定五星武器平均出金次数 {limitWeaponTimes.toFixed(2)}</div>
          <div>限定五星武器平均花费原石 {Math.round(limitWeaponTimes * 160)}</div>
          <div>所有五星物品平均出金次数 {allTimes.toFixed(2)}</div>
          <div>所有五星物品平均花费原石 {Math.round(allTimes * 160)}</div>

          <div>
            最有缘的五星：{}，共抽了 {} 次
          </div>
          <div>
            最非酋的五星：{}，抽了 {} 次才出
          </div>
          <div>
            最欧皇的五星：{}，抽了 {} 次即出
          </div>
          {maxTimes >= 10 && (
            <div>
              最疯狂的一天：{maxDay}，这天一共抽了 {maxTimes} 次
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
