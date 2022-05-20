import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import D from "dayjs";
import React, { useEffect, useState } from "react";

import { DEFAULT_GACHA_DATA } from "../../../constants";
import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import DateRange from "./Charts/DateRange";
import filterGachaList, { GachaTypeMap } from "../../../utils/filterGachaList";
import GachaPie from "./Charts/GachaPie";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import transformGachaDataDate from "../../../utils/transformGachaDataDate";
import transformGachaDataType from "../../../utils/transformGachaDataType";
import useNotice from "../../hooks/useNotice";

import type { GachaData } from "../../../typings";

import styles from "./index.less";

type GachaType = "activity" | "normal" | "weapon" | "newer";
type ItemType = "weapon" | "role";
type StarType = 3 | 4 | 5;

export type FilterType = {
  gacha: GachaType[];
  item: ItemType[];
  star: StarType[];
};

type FilterBtn = { name: string; type: StarType | GachaType | ItemType };

type FilterLine = {
  type: keyof FilterType;
  btns: FilterBtn[];
};

type FiterLines = FilterLine[];

const defaultFilters: FilterType = {
  gacha: ["activity", "normal", "weapon", "newer"],
  item: ["weapon", "role"],
  star: [3, 4, 5]
};

const rankMap: Record<string, string> = {
  "3": "3星",
  "4": "4星",
  "5": "5星"
};

const Gocha: React.FC = () => {
  const notice = useNotice();
  const navigate = useNavigate();
  const [filter, setfilter] = useState<FilterType>(defaultFilters);
  const [gacha, setGacha] = useState<GachaData>(DEFAULT_GACHA_DATA);
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const gachas: GachaData[] = await nativeApi.getStoreKey("gachas");
      const uid: string = await nativeApi.getStoreKey("user.uid");
      await getLocalGachaUrl();
      for (const gacha of gachas) if (gacha.info.uid === uid) setGacha(gacha);
      if (gachas.length && !gacha.list.length) setGacha(gachas[0]);
    })();
  }, []);

  const updateGachaData = async () => {
    if (loading) return notice.faild({ message: "派蒙正在努力获取中，请不要重复点击啦！" });
    if (!link) return notice.faild({ message: "请先获取 「本地祈愿链接」 或手动输入祈愿链接" });
    if (!link.match(/^https?:\/\//)) return notice.faild({ message: "链接无效，请检查" });

    setLoading(true);
    const data = await nativeApi.getGachaListByUrl(link);
    console.log("updateGachaData: ", data?.list?.length);

    if (data?.list?.length) {
      notice.success({ message: `更新完毕，共获取到 ${data?.list?.length} 条数据` });
      setGacha(data);
    } else {
      notice.faild({ message: "数据异常，请尝试重新获取 「最新链接」 后再试" });
    }
    setLoading(false);
  };

  const toggleFilter = (type: keyof FilterType, target?: any) => {
    if (!target) {
      const defaultFilter = defaultFilters[type];
      const isAll = filter[type].length === defaultFilter.length;
      const res = isAll ? [] : defaultFilter;
      setfilter({ ...filter, [type]: res });
    } else {
      const types = new Set(filter[type] as any[]);
      const hasExist = types.has(target);
      types[hasExist ? "delete" : "add"](target);
      const res = Array.from(types);
      setfilter({ ...filter, [type]: res });
    }
  };

  const copyLink = () => {
    if (link) {
      nativeApi.writeClipboardText(link);
      notice.success({ message: "已将 「祈愿记录链接」 复制到剪切板" });
    } else {
      notice.faild({ message: " 「祈愿记录链接」 为空" });
    }
  };

  const getLocalGachaUrl = async (isUserTrriger: boolean = false) => {
    const url = await nativeApi.getGachaUrl();
    if (url) {
      setLink(url);
      if (isUserTrriger) notice.success({ message: "本地 「祈愿记录链接」 获取成功" });
    } else {
      const message = "本地日志中不存在有效链接，请先在游戏内打开 「祈愿历史记录」 后再尝试获取";
      if (isUserTrriger) notice.faild({ message });
    }
    return !!url;
  };

  const getListTypeInfo = (list: GachaData["list"]) => {
    const roles = list.filter((item) => item.item_type === "角色");
    const weapons = list.filter((item) => item.item_type === "武器");
    const r_5 = roles.filter((item) => item.rank_type === "5").map((e) => e.name);
    const r_4 = roles.filter((item) => item.rank_type === "4").map((e) => e.name);
    const w_5 = weapons.filter((item) => item.rank_type === "5");
    const w_4 = weapons.filter((item) => item.rank_type === "4");
    const w_3 = weapons.filter((item) => item.rank_type === "3");
    let message = "";
    if (r_5.length) message += `5星角色 ${r_5.length} ：${r_5.join("、")} / `;
    if (r_4.length) message += `4星角色 ${r_4.length} / `;
    if (w_5.length) message += `5星武器 ${w_5.length} ：${w_5.join("、")} / `;
    if (w_4.length) message += `4星武器 ${w_4.length} / `;
    if (w_3.length) message += `3星武器 ${w_3.length} / `;
    message = message.slice(0, message.length - 2).trim();
    return message;
  };

  const filterLines: FiterLines = [
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
        { name: "活动池", type: "activity" },
        { name: "武器池", type: "weapon" },
        { name: "常驻池", type: "normal" },
        { name: "新手池", type: "newer" }
      ]
    }
  ];

  const list = filterGachaList(gacha.list, filter);

  const now = new Date();
  const dateRange = [D(now).subtract(8, "M").toDate(), now];
  const firsteDate = gacha.list.length ? gacha.list[0].time : "";
  const lastDate = gacha.list.length ? gacha.list[gacha.list.length - 1].time : "";
  const format = (str: string) => D(str).format("YYYY/M/D HH:mm");
  const dateRangeText = `${format(firsteDate)} ~ ${format(lastDate)}`;

  const getGachaStatictic = (type: string) => {
    // 获取响应祈愿分类的所有数据
    const list = gacha.list.filter((e) => e.uigf_gacha_type === GachaTypeMap[type]);
    // 存放所有5星的索引（1 开始）
    const i_5 = [];
    for (const [i, e] of list.entries()) if (e.rank_type === "5") i_5.push(i + 1);
    // 5星平均出货次数
    const times = i_5.length ? Math.floor(i_5[i_5.length - 1] / i_5.length) : 0;
    // 累计未出5星的次数
    const unluckyDays = list.length - (i_5.length ? i_5[i_5.length - 1] : 0);
    return { all: list.length, times, unluckyDays };
  };

  const activityData = getGachaStatictic("activity");
  const weaponData = getGachaStatictic("weapon");
  const normalData = getGachaStatictic("normal");

  const loadingText = loading ? "派蒙努力加载中，预计半分钟..." : "派蒙没有找到任何数据";
  const tip = `※ 共读取到 ${gacha.list.length} 条数据，时间范围：${dateRangeText}，数据可能存在延迟，请以实际为准。`;

  return (
    <>
      <div className={styles.container}>
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={() => navigate("/")}
        />
        <div className={styles.inputZone}>
          <input
            value={link}
            onBlur={(e) => setLink(e.target.value.trim())}
            onChange={(e) => setLink(e.target.value)}
            placeholder='祈愿记录链接'
          />
          <Button
            text={link ? "复制" : "获取本地链接"}
            onClick={link ? copyLink : () => getLocalGachaUrl(true)}
            style={{ marginRight: "12px" }}
          />
          <Button type='confirm' text='更新数据' onClick={updateGachaData} />
          <span className={styles.title}>祈愿记录 「数据可视化」 分析</span>
        </div>
        {gacha.list.length && !loading ? (
          <div className={styles.content}>
            <div className={styles.pieChart}>
              <div className={styles.filterZone}>
                {filterLines.map((line, i) => {
                  const filters: (StarType | GachaType | ItemType)[] = filter[line.type];
                  const defaultArr = defaultFilters[line.type];
                  const isAll = filters.length === defaultArr.length;
                  const selectClass = cn(styles.select, isAll ? styles.selectAll : "");
                  return (
                    <div className={styles.filterBtns} key={i}>
                      <div className={selectClass} onClick={() => toggleFilter(line.type)}>
                        {isAll ? "清空" : "全选"}
                      </div>
                      {line.btns.map((e) => {
                        const include = filters.includes(e.type);
                        const star = typeof e.type === "number" ? styles[`btn-${e.type}`] : "";
                        const active = star || styles.btnActive;
                        const btnProps = {
                          key: e.type,
                          className: cn(styles.btn, include ? active : ""),
                          onClick: () => toggleFilter(line.type, e.type)
                        };
                        return <div {...btnProps}>{e.name}</div>;
                      })}
                    </div>
                  );
                })}
              </div>
              <div className={styles.pieName}>星级筛选结果 / 环形图</div>
              <GachaPie
                style={{ alignSelf: "center" }}
                data={transformGachaDataType(list)}
                height={268}
                width={268}
                onClick={(e) => {
                  const limitedList = list.filter((item) => rankMap[item.rank_type] === e.id);
                  const message = getListTypeInfo(limitedList);
                  if (message) notice.info({ message });
                }}
              />
            </div>
            <div>
              <div className={styles.detailData}>
                <div className={styles.detailTitle}>
                  {`※ 活动祈愿共计`}
                  <span className={styles.star3}> {activityData.all} </span>
                  {`次，已累计`}
                  <span className={styles.star5}> {activityData.unluckyDays} </span>
                  {`次未出5星，平均5星出货次数：`}
                  <span className={styles.star4}> {activityData.times} </span>
                </div>
                <div className={styles.detailTitle}>
                  {`※ 武器祈愿共计`}
                  <span className={styles.star3}> {weaponData.all} </span>
                  {`次，已累计`}
                  <span className={styles.star5}> {weaponData.unluckyDays} </span>
                  {`次未出5星，平均5星出货次数：`}
                  <span className={styles.star4}> {weaponData.times} </span>
                </div>
                <div className={styles.detailTitle}>
                  {`※ 常驻祈愿共计`}
                  <span className={styles.star3}> {normalData.all} </span>
                  {`次，已累计`}
                  <span className={styles.star5}> {normalData.unluckyDays} </span>
                  {`次未出5星，平均5星出货次数：`}
                  <span className={styles.star4}> {normalData.times} </span>
                </div>
              </div>
              <div className={styles.tableName}>星级出货数、出货率 / 一览表</div>
              <div className={styles.detailTable}>
                <div>
                  <div>出货数 / 率</div>
                  <div>活动池</div>
                  <div>武器池</div>
                  <div>常驻池</div>
                  <div>新手池</div>
                </div>
                <div>
                  <div>5星</div>
                  <div className={styles.star5}>3 / 10%</div>
                  <div className={styles.star5}>3 / 10%</div>
                  <div className={styles.star5}>3 / 10%</div>
                  <div className={styles.star5}>3 / 10%</div>
                </div>
                <div>
                  <div>4星</div>
                  <div className={styles.star4}>4 / 12%</div>
                  <div className={styles.star4}>4 / 12%</div>
                  <div className={styles.star4}>4 / 12%</div>
                  <div className={styles.star4}>4 / 12%</div>
                </div>
                <div>
                  <div>3星</div>
                  <div className={styles.star3}>200 / 80%</div>
                  <div className={styles.star3}>200 / 80%</div>
                  <div className={styles.star3}>200 / 80%</div>
                  <div className={styles.star3}>200 / 80%</div>
                </div>
              </div>
              <div className={styles.tableName}>次数分布筛选结果 / 日历图</div>
              <div className={styles.timeRangeContainer}>
                <DateRange
                  onClick={(e) => {
                    const limitedList = list.filter((item) => item.time.slice(0, 10) === e.day);
                    const message = getListTypeInfo(limitedList);
                    if (message) notice.info({ message });
                  }}
                  data={transformGachaDataDate(list)}
                  className={styles.timeRange}
                  range={dateRange}
                  width={600}
                  height={168}
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flex: 1 }}>
            <Loading text={loadingText} />
          </div>
        )}
        {gacha.list.length > 0 && <span className={styles.dateTip}>{tip}</span>}
      </div>
      {notice.holder}
    </>
  );
};

export default Gocha;
