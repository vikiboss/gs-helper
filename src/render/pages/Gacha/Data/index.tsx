import cn from "classnames";
import React, { useEffect, useState } from "react";

import { GachaMap } from "..";
import { NormalItemList } from "../../../../constants";
import getListByType from "../utils/getListByType";
import nativeApi from "../../../utils/nativeApi";

import type { GachaData, GachaType } from "../../../../typings";
import type { PageProp } from "..";
import type { CalenderEvent } from "../../../../services/getCalenderList";

import styles from "./index.less";

type TableRow = "3" | "4" | "5" | "合计";
type TableColumn = GachaType | "合计";

const Data: React.FC<PageProp> = ({ gacha, notice }) => {
  const [calenderList, setCalenderList] = useState<CalenderEvent[]>([]);

  useEffect(() => {
    (async () => {
      const list = await nativeApi.getCalenderList();
      if (list.length > 0) setCalenderList(list);
    })();
  }, []);

  const getGachaNumsAndRates = (rank: TableRow, type: TableColumn) => {
    const isAllStar = rank === "合计";
    const isAllType = type === "合计";
    const starList = isAllStar ? gacha.list : gacha.list.filter((e) => e.rank_type === rank);
    const gachaList = isAllType ? gacha.list : getListByType(gacha.list, type);
    const itemList = isAllType ? starList : getListByType(starList, type);
    return `${itemList.length} / ${((itemList.length * 100) / (gachaList.length || 1)).toFixed(
      2
    )}%`;
  };

  const getPoolsNamesByList = (list: GachaData["list"]) => {
    const data: { title: string; name: GachaType; list: { name: string; times: number }[] }[] = [
      { title: "角色池", name: "activity", list: [] },
      { title: "武器池", name: "weapon", list: [] },
      { title: "常驻池", name: "normal", list: [] },
      { title: "新手池", name: "newer", list: [] }
    ];
    for (const type of ["activity", "normal", "weapon", "newer"] as GachaType[]) {
      const filteredList = getListByType(list, type);
      for (const [i, e] of filteredList.entries()) {
        if (e.rank_type === "5") {
          const target = data.filter((e) => e.name === type)[0];
          if (target) {
            const len = target.list.length;
            const offset = len ? target.list.reduce((p, n) => (p = p + n.times), 0) : 0;
            target.list.push({ name: e.name, times: i + 1 - offset });
          }
        }
      }
    }
    return data.filter((e) => e.list.length > 0);
  };

  const pools = getPoolsNamesByList(gacha.list);

  return (
    <div className={styles.content}>
      <div>
        <div>
          <div className={styles.tableName}>〓出货数、出货率〓</div>
          <div className={styles.detailTable}>
            <div>
              <div className={styles.head}>出货数 / 率</div>
              <div className={styles.head}>角色池</div>
              <div className={styles.head}>武器池</div>
              <div className={styles.head}>常驻池</div>
              <div className={styles.head}>新手池</div>
              <div className={styles.head}>合计</div>
            </div>
            {["5", "4", "3", "合计"].map((e: TableRow) => (
              <div key={e}>
                <div className={styles.head}>{e === "合计" ? e : e + "星"}</div>
                {[...Object.keys(GachaMap), "合计"].map((f: TableColumn) => (
                  <div className={cn(styles[`star${e}`], styles.star)} key={f}>
                    {getGachaNumsAndRates(e, f)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {calenderList.length > 0 && (
          <div>
            <div className={styles.poolName}>〓五星出货详情〓</div>
            {pools.length > 0 ? (
              pools.map((e) => (
                <div key={e.title} className={styles.poolList}>
                  <span>{e.title}</span>
                  <div>
                    {e.list.map((item, i) => {
                      const role = calenderList.filter((e) => e.title === item.name)[0];
                      const showDetail = (item: { name: string; times: number }) => {
                        const pn = item.times * 160;
                        const msg = `${item.name}，累计消耗 ${item.times} 次祈愿，价值 ${pn} 原石`;
                        notice.success({ message: msg });
                      };
                      const isLimit = !NormalItemList.includes(item.name);
                      const style = item.times > 72 ? "red" : item.times > 60 ? "orange" : "green";
                      return (
                        <div
                          onClick={() => showDetail(item)}
                          title={item.name}
                          key={item.name + i}
                          className={styles.avatar}
                        >
                          <img key={item.name + i} src={role?.img_url} alt={item.name} />
                          <span className={styles[style]}>{item.times}</span>
                          {isLimit && <span>限定</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.tip}>暂无五星数据</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Data;
