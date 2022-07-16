import { TimeRangeDayData } from "@nivo/calendar";
import cn from "classnames";
import D from "dayjs";
import React from "react";

import { Notice } from "../../../hooks/useNotice";
import DateRange from "../Overview/Charts/DateRange";
import filterGachaList, { GachaTypeMap } from "../utils/filterGachaList";
import GachaPie from "../Overview/Charts/StarPie";
import transformGachaDataDate from "../utils/transformGachaDataDate";
import transformGachaDataType from "../utils/getPieData";

import type { GachaData, GachaItemType, GachaType, StarType } from "../../../../typings";

import styles from "./index.less";

interface PageProp {
  gacha: GachaData;
  filter: FilterType;
  toggleFilter: Function;
  notice: Notice;
}

export const GachaMap: Record<GachaType, string> = {
  activity: "活动祈愿",
  weapon: "武器祈愿",
  normal: "常驻祈愿",
  newer: "新手祈愿"
};

type FilterBtn = { name: string; type: StarType | GachaType | GachaItemType };

type FilterLine = {
  type: keyof FilterType;
  btns: FilterBtn[];
};

export type FilterType = {
  gacha: GachaType[];
  item: GachaItemType[];
  star: StarType[];
};

const DefaultFilters: FilterType = {
  gacha: ["activity", "normal", "weapon", "newer"],
  item: ["weapon", "role"],
  star: [3, 4, 5]
};

const Prediction: React.FC<PageProp> = ({ gacha, filter, toggleFilter, notice }) => {
  const getGachaNumsAndRates = (rank: "3" | "4" | "5", gachaType: GachaType) => {
    const star_l = gacha.list.filter((e) => e.rank_type === rank);
    const gacha_l = gacha.list.filter((e) => e.uigf_gacha_type === GachaTypeMap[gachaType]);
    const item_l = star_l.filter((e) => e.uigf_gacha_type === GachaTypeMap[gachaType]);
    return `${item_l.length}/${((item_l.length * 100) / (gacha_l.length || 1)).toFixed(2)}%`;
  };

  const getGachaStatictics = () => {
    const map = Object.keys(GachaMap).filter((e) => e !== "newer") as GachaType[];
    const res: { all: number; times: number; unluckyDays: number; name: string }[] = [];
    for (const type of map) {
      // 获取相应祈愿分类的所有数据
      const list = gacha.list.filter((e) => e.uigf_gacha_type === GachaTypeMap[type]);
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

  const filterLines: FilterLine[] = [
    {
      type: "item",
      btns: [
        { name: "角色", type: "role" },
        { name: "武器", type: "weapon" }
      ]
    },
    {
      type: "star",
      btns: [
        { name: "5星", type: 5 },
        { name: "4星", type: 4 },
        { name: "3星", type: 3 }
      ]
    },
    {
      type: "gacha",
      btns: [
        { name: "角色池", type: "activity" },
        { name: "武器池", type: "weapon" },
        { name: "常驻池", type: "normal" },
        { name: "新手池", type: "newer" }
      ]
    }
  ];

  const getListTypeInfo = (list: GachaData["list"]) => {
    const roles = list.filter((item) => item.item_type === "角色");
    const weapons = list.filter((item) => item.item_type === "武器");
    const r_5 = roles.filter((item) => item.rank_type === "5");
    const r_4 = roles.filter((item) => item.rank_type === "4");
    const w_5 = weapons.filter((item) => item.rank_type === "5");
    const w_4 = weapons.filter((item) => item.rank_type === "4");
    const w_3 = weapons.filter((item) => item.rank_type === "3");
    let message = "";
    message += r_5.length ? `5星角色${r_5.length}个 & ` : "";
    // message += r_5.length ? `5星角色${r_5.length}个（${r_5.join("、")}） & ` : "";
    message += r_4.length ? `4星角色${r_4.length}个 & ` : "";
    message += w_5.length ? `5星武器${w_5.length}个 & ` : "";
    // message += w_5.length ? `5星武器${w_5.length}个（${w_5.join("、")}） & ` : "";
    message += w_4.length ? `4星武器${w_4.length}个 & ` : "";
    message += w_3.length ? `3星武器${w_3.length}个 & ` : "";
    message = message.slice(0, message.length - 2).trim();
    return message;
  };

  const list = filterGachaList(gacha.list, filter);
  const now = new Date();
  const dateRange = [D(now).subtract(8, "M").toDate(), now];


  const rangeProps = {
    className: styles.timeRange,
    data: transformGachaDataDate(list),
    height: 168,
    range: dateRange,
    width: 600,
    onClick: (e: TimeRangeDayData) => {
      const limitedList = list.filter((item) => item.time.slice(0, 10) === e.day);
      const message = getListTypeInfo(limitedList);
      if (message) notice.info({ message });
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.pieChart}>
        <div className={styles.filterTitle}>筛选条件</div>
        <div className={styles.filterZone}>
          {filterLines.map((line, i) => {
            const filters: (StarType | GachaType | GachaItemType)[] = filter[line.type];
            const defaultArr = DefaultFilters[line.type];
            const isAll = filters.length === defaultArr.length;
            const selectClass = cn(styles.select, isAll ? styles.selectAll : "");
            return (
              <div className={styles.filterBtns} key={i}>
                <div className={selectClass} onClick={() => toggleFilter(line.type)}>
                  {isAll ? "清空" : "全选"}
                </div>
                {line.btns.map((e) => {
                  const btnProps = {
                    key: e.type,
                    className: cn(styles.btn, filters.includes(e.type) ? styles.btnActive : ""),
                    onClick: () => toggleFilter(line.type, e.type)
                  };
                  return <div {...btnProps}>{e.name}</div>;
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className={styles.detailData}>
          {statictics.map((e) => (
            <div className={styles.detailTitle} key={e.name}>
              {`※ ${e.name}共计`}
              <span className={styles.star3}> {e.all} </span>
              {`次，已累计`}
              <span className={styles.star5}> {e.unluckyDays} </span>
              {`次未出5星，平均5星出货次数：`}
              <span className={styles.star4}> {e.times} </span>
            </div>
          ))}
        </div>
        <div className={styles.tableName}>星级出货数、出货率</div>
        <div className={styles.detailTable}>
          <div>
            <div>出货数 / 率</div>
            <div>角色池</div>
            <div>武器池</div>
            <div>常驻池</div>
            <div>新手池</div>
          </div>
          {["5", "4", "3"].map((e: "3" | "4" | "5") => (
            <div key={e}>
              <div>{e}星</div>
              {Object.keys(GachaMap).map((f: GachaType) => (
                <div className={cn(styles[`star${e}`], styles.star)} key={f}>
                  {getGachaNumsAndRates(e, f)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.tableName}>祈愿次数分布</div>
        <div className={styles.timeRangeContainer}>
          <DateRange {...rangeProps} />
        </div>
      </div>
    </div>
  );
};

export default Prediction;
