import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import D from "dayjs";
import React, { useEffect, useState } from "react";

import { DEFAULT_GACHA_DATA } from "../../../constants";
import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import DateRange from "./Charts/DateRange";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import RolePie from "./Charts/RolePie";
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

const Gocha: React.FC = () => {
  const notice = useNotice();
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setfilter] = useState<FilterType>(defaultFilters);
  const [gacha, setGacha] = useState<GachaData>(DEFAULT_GACHA_DATA);

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
    if (loading) return notice.faild({ message: "数据正在获取中，请不要重复点击哦" });
    if (!link) return notice.faild({ message: "请先获取 「本地祈愿链接」 或手动输入祈愿链接" });
    if (!link.match(/^https?:\/\//)) {
      return notice.faild({ message: "输入内容无效，请输入有效的链接后重试" });
    }

    setLoading(true);

    const data = await nativeApi.getGachaListByUrl(link);
    console.log("updateGachaData: ", data?.list?.length);

    if (data?.list?.length) {
      notice.success({ message: `祈愿数据更新完毕，共获取到 ${data?.list?.length} 条数据` });
      setGacha(data);
    } else {
      notice.faild({ message: "数据获取异常，请确保链接有效且未过期" });
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

  const filterLines: FiterLines = [
    {
      type: "item",
      btns: [
        { name: "角色", type: "role" },
        { name: "武器", type: "weapon" }
      ]
    },
    {
      type: "gacha",
      btns: [
        { name: "新手池", type: "newer" },
        { name: "活动池", type: "activity" },
        { name: "武器池", type: "weapon" },
        { name: "常驻池", type: "normal" }
      ]
    },
    {
      type: "star",
      btns: [
        { name: "五星", type: 5 },
        { name: "四星", type: 4 },
        { name: "三星", type: 3 }
      ]
    }
  ];

  const now = new Date();
  const dateRange = [D(now).subtract(6, "M").toDate(), now];
  const firsteDate = gacha.list.length ? gacha.list[0].time : "";
  const lastDate = gacha.list.length ? gacha.list[gacha.list.length - 1].time : "";
  const dateRangeText = `${firsteDate} ~ ${lastDate}`;
  const loadingText = loading ? "正在获取最新数据，预计半分钟，请耐心等待..." : "本地数据为空";
  const tip = `※ 共获取到 ${gacha.list.length} 条祈愿数据，覆盖时间范围：${dateRangeText}`;

  return (
    <>
      <div className={styles.desc}>
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
          <>
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
                        const btnClass = cn(styles.btn, include ? styles.btnActive : "");
                        return (
                          <div
                            key={e.type}
                            className={btnClass}
                            onClick={() => toggleFilter(line.type, e.type)}
                          >
                            {e.name}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <RolePie data={transformGachaDataType(gacha.list, filter)} />
            </div>
            <DateRange
              data={transformGachaDataDate(gacha.list, filter)}
              className={styles.timeRange}
              range={dateRange}
              width='480px'
              height='160px'
            />
            {gacha.list.length && <span className={styles.dateTip}>{tip}</span>}
          </>
        ) : (
          <div style={{ display: "flex", flex: 1 }}>
            <Loading text={loadingText} />
          </div>
        )}
      </div>
      {notice.holder}
    </>
  );
};

export default Gocha;
