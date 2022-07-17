import React, { useMemo } from "react";

import { ItemTypeMap } from "../utils/filterGachaList";
import { NormalItemList } from "../../../../constants";
import { PageProp } from "..";
import getGachaStatictics from "../utils/getGachaStatictics";
import getListByType from "../utils/getListByType";
import transformGachaDataDate from "../utils/transformGachaDataDate";

import type { GachaItemType, GachaType } from "../../../../typings";

import styles from "./index.less";

const Overview: React.FC<PageProp> = ({ gacha }) => {
  const getAverageTimes = (type: GachaItemType, isLimit = true) => {
    const list = getListByType(gacha.list, type === "role" ? "activity" : "weapon");
    const i_5 = [];
    for (const [i, e] of list.entries()) {
      const limit = isLimit ? !NormalItemList.includes(e.name) : true;
      const isTypeRight = e.item_type === ItemTypeMap[type];
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

  const MostInfo = useMemo(() => {
    const predestined = { name: "", count: 0, valid: false };
    const luckest = { name: "", count: 999, valid: false };
    const unluckest = { name: "", count: 0, valid: false };
    const i_5 = [] as { count: number; name: string }[];
    for (const type of ["activity", "weapon", "normal"] as GachaType[]) {
      const list = getListByType(gacha.list, type);
      let lastIndex = -1;
      for (const [i, e] of list.entries()) {
        if (e.rank_type === "5") {
          i_5.push({ count: i - lastIndex, name: e.name });
          lastIndex = i;
        }
      }
    }
    const memo: Record<string, number> = {};
    for (const e of i_5) {
      if (e.count < luckest.count) {
        luckest.name = e.name;
        luckest.count = e.count;
        luckest.valid = true;
      }

      if (e.count > unluckest.count) {
        unluckest.name = e.name;
        unluckest.count = e.count;
        unluckest.valid = true;
      }

      memo[e.name] ? memo[e.name]++ : (memo[e.name] = 1);
    }
    console.log("memo", memo);
    for (const [k, v] of Object.entries(memo)) {
      if (Number(v) > predestined.count) {
        predestined.name = k;
        predestined.count = v;
        predestined.valid = true;
      }
    }
    return { predestined, luckest, unluckest };
  }, gacha.list);

  const statictics = getGachaStatictics(gacha);
  const luckInfo = getLuckInfo();
  const limitRoleTimes = getAverageTimes("role");
  const limitWeaponTimes = getAverageTimes("weapon");
  const validList = statictics.filter((e) => e.number !== 0);
  const times = validList.reduce((p, n) => (p = p + n.times * n.number), 0);
  const count = validList.reduce((p, n) => (p = p + n.number), 0);
  const allTimes = times / (count || 1);
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
              {` 次，出金次数 `}
              <span className={styles.star5}>{e.number}</span>
              {` ，平均出金 `}
              <span className={styles.star4}>{e.times.toFixed(2)}</span>
              {` ，当前已 `}
              <span className={styles.star5}>{e.unluckyDays}</span>
              {` 次未出金，`}
              <span className={styles.star4}>{e.comment}</span>
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
            最有缘的五星：{MostInfo.predestined.name}，共抽到 {MostInfo.predestined.count} 次
          </div>
          <div>
            最非酋的五星：{MostInfo.unluckest.name}，抽了 {MostInfo.unluckest.count} 次才出
          </div>
          <div>
            最欧皇的五星：{MostInfo.luckest.name}，抽了 {MostInfo.luckest.count} 次即出
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
