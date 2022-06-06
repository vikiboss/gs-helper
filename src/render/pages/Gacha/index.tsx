import { BiImport, BiExport } from "react-icons/Bi";
import { TiArrowBack } from "react-icons/ti";
import { TimeRangeDayData } from "@nivo/calendar";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import D from "dayjs";
import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import DateRange from "./Charts/DateRange";
import filterGachaList, { GachaTypeMap } from "./utils/filterGachaList";
import GachaPie from "./Charts/GachaPie";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import transformGachaDataDate from "./utils/transformGachaDataDate";
import transformGachaDataType from "./utils/transformGachaDataType";
import useNotice from "../../hooks/useNotice";

import type { GachaData, GachaType, GachaItemType, StarType } from "../../../typings";

import styles from "./index.less";

const DefaultGachaData: GachaData = {
  info: {
    uid: "",
    lang: "zh-cn",
    export_app: "原神助手",
    export_app_version: "1.0.0",
    export_time: "",
    export_timestamp: "",
    update_time: "",
    uigf_version: "v2.2"
  },
  list: []
};

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

const Gacha: React.FC = () => {
  const notice = useNotice();
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>("");
  const [filter, setfilter] = useState<FilterType>(DefaultFilters);
  const [gachas, setGachas] = useState<GachaData[]>([]);
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const initGachaData = async () => {
    const gachas: GachaData[] = await nativeApi.getLocalGachaDatas();
    setGachas(gachas);
    const _uid: string = await nativeApi.getStoreKey("currentUid");
    const loggedUidGachaData = gachas.filter((e) => e.info.uid === _uid)[0];
    if (loggedUidGachaData) {
      if (!uid) setUid(_uid);
    } else if (gachas.length) {
      console.log(_uid);
      if (Number(_uid)) {
        notice.warning({ message: "当前已登录 UID 的祈愿数据不存在，已自动切换到本地其他账号" });
      } else {
        notice.warning({ message: "未登录米游社账号，已自动选择本地首个账号的数据" });
      }
      if (!uid) setUid(gachas[0].info.uid);
    }
  };

  useEffect(() => {
    (async () => {
      await initGachaData();
      await getLocalGachaUrl();
    })();
  }, []);

  const updateGachaData = async () => {
    if (loading) return notice.faild({ message: "派蒙正在努力获取中，请不要重复点击啦！" });
    if (!link) return notice.faild({ message: "请先获取 「本地祈愿链接」 或手动输入祈愿链接" });
    if (!link.match(/^https?:\/\//)) return notice.faild({ message: "链接无效，请检查" });

    setLoading(true);
    const data = await nativeApi.getGachaListByUrl(link);
    console.log("updateGachaData: ", data.list.length);

    if (data.list.length) {
      notice.success({ message: `更新完成，共获取到 ${data.list.length} 条数据` });
      await initGachaData();
      setUid(data.info.uid);
    } else {
      notice.faild({ message: "数据异常，请尝试重新获取 「最新链接」 后再试" });
    }
    setLoading(false);
  };

  const toggleFilter = (type: keyof FilterType, target?: any) => {
    if (!target) {
      const defaultFilter = DefaultFilters[type];
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
        { name: "活动池", type: "activity" },
        { name: "武器池", type: "weapon" },
        { name: "常驻池", type: "normal" },
        { name: "新手池", type: "newer" }
      ]
    }
  ];

  const gacha = gachas.filter((e) => e.info.uid === uid)[0] || DefaultGachaData;
  const list = filterGachaList(gacha.list, filter);
  const now = new Date();
  const dateRange = [D(now).subtract(8, "M").toDate(), now];
  const firsteDate = gacha.list.length ? gacha.list[0].time : "";
  const lastDate = gacha.list.length ? gacha.list[gacha.list.length - 1].time : "";
  const format = (str: string) => D(str).format("YYYY/M/D HH:mm");
  const dateRangeText = `${format(firsteDate)} ~ ${format(lastDate)}`;

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

  const getGachaNumsAndRates = (rank: "3" | "4" | "5", gachaType: GachaType) => {
    const star_l = gacha.list.filter((e) => e.rank_type === rank);
    const gacha_l = gacha.list.filter((e) => e.uigf_gacha_type === GachaTypeMap[gachaType]);
    const item_l = star_l.filter((e) => e.uigf_gacha_type === GachaTypeMap[gachaType]);
    return `${item_l.length}/${((item_l.length * 100) / (gacha_l.length || 1)).toFixed(2)}%`;
  };

  const handleImport = () => notice.warning({ message: "导入功能暂未开放" });
  const handleExport = () => notice.warning({ message: "导出功能暂未开放" });
  const handleBack = () => {
    if (loading) {
      notice.warning({ message: "请耐心等待数据加载完成" });
    } else {
      navigate("/");
    }
  };

  const statictics = getGachaStatictics();
  const loadingText = loading ? "派蒙努力加载中，预计半分钟..." : "派蒙没有找到任何数据";
  const tip = `※ 共加载了 ${gacha.list.length} 条数据（${dateRangeText}），数据同步存在延迟，请以游戏内为准。`;

  const pieProps = {
    data: transformGachaDataType(list),
    height: 268,
    style: { alignSelf: "center" },
    width: 268,
    onClick: (e: { id: string | number; value: number }) => {
      const limitedList = list.filter((item) => `${item.rank_type}星` === e.id);
      const message = getListTypeInfo(limitedList);
      if (message) notice.info({ message });
    }
  };

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

  const uids = gachas.map((e) => e.info.uid).sort((p, n) => Number(p) - Number(n));

  return (
    <>
      <div className={styles.container}>
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={handleBack}
        />
        <div className={styles.topZone}>
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
          <div className={styles.rightZone}>
            <div className={styles.icon} title='导入 JSON 数据' onClick={handleImport}>
              <BiImport size={20} />
            </div>
            <div className={styles.icon} title='导出 JSON 数据' onClick={handleExport}>
              <BiExport size={20} />
            </div>
            {uids.length > 0 && uid && (
              <div className={styles.selectZone}>
                <select
                  name='UID'
                  id='uid'
                  onChange={(e) => setUid(e.target.value)}
                  defaultValue={uid}
                >
                  {uids.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        {gacha.info.uid && !loading ? (
          <div className={styles.content}>
            <div className={styles.pieChart}>
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
              <GachaPie {...pieProps} />
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
              <div className={styles.tableName}>星级出货数、出货率 / 一览表</div>
              <div className={styles.detailTable}>
                <div>
                  <div>出货数 / 率</div>
                  <div>活动池</div>
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
              <div className={styles.tableName}>祈愿次数分布筛选结果 / 日历图</div>
              <div className={styles.timeRangeContainer}>
                <DateRange {...rangeProps} />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flex: 1 }}>
            <Loading text={loadingText} isEmpty={!loading && !gacha.info.uid} />
          </div>
        )}
        {gacha.list.length > 0 && !loading && <span className={styles.dateTip}>{tip}</span>}
      </div>
      {notice.holder}
    </>
  );
};

export default Gacha;
