import D from "dayjs";
import React, { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import RolePie from "./Charts/RolePie";
import useNotice from "../../hooks/useNotice";
import nativeApi from "../../utils/nativeApi";
import CircleButton from "../../components/CircleButton";
import DateRange from "./Charts/DateRange";
import { DEFAULT_GACHA_DATA } from "../../../constants";
import transformGachaDataDate from "../../../utils/transformGachaDataDate";
import transformGachaDataType from "../../../utils/transformGachaDataType";

import type { GachaData } from "../../../typings";

import styles from "./index.less";

type GachaType = "activity" | "normal" | "weapon" | "newer";

export type FilterType = {
  item: "all" | "weapon" | "role";
  gacha: "all" | GachaType[];
};

const defaultFilter: FilterType = { item: "all", gacha: "all" };

const Gocha: React.FC = () => {
  const notice = useNotice();
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pieFilter, setPieFilter] = useState<FilterType>(defaultFilter);
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
    if (loading) return;

    if (!link) return notice.faild({ message: "请先获取 「本地祈愿链接」 或手动输入祈愿链接" });

    if (!link.match(/^https?:\/\//)) {
      return notice.faild({ message: "输入内容无效，请输入有效的链接后重试" });
    }

    setLoading(true);

    notice.info({
      message: "正在拼命获取最新数据，请耐心等待操作完成，预计不到半分钟...",
      autoHide: false
    });

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

  const toggleGachaType = (target: GachaType) => {
    if (pieFilter.gacha === "all") {
      setPieFilter({ gacha: [target], item: pieFilter.item });
    } else {
      const chosenTypes = new Set(pieFilter.gacha);
      if (chosenTypes.has(target)) {
        chosenTypes.delete(target);
      } else {
        chosenTypes.add(target);
      }
      setPieFilter({ gacha: Array.from(chosenTypes), item: pieFilter.item });
    }
  };

  const toggleItemType = (target: FilterType["item"]) => {
    setPieFilter({ gacha: pieFilter.gacha, item: target });
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
      if (isUserTrriger) {
        notice.faild({
          message: "本地日志中不存在有效链接，请先在游戏内打开 「祈愿历史记录」 后再尝试获取"
        });
      }
    }
    return !!url;
  };

  const dates = transformGachaDataDate(gacha);
  const now = new Date();
  const dateRange = [D(now).subtract(6, "M").toDate(), now];

  const firsteDate = gacha.list.length ? gacha.list[0].time : "";
  const lastDate = gacha.list.length ? gacha.list[gacha.list.length - 1].time : "";
  const dateRangeText = `${firsteDate} ~ ${lastDate}`;
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
            noIcon
            text={link ? "复制" : "获取本地链接"}
            onClick={link ? copyLink : getLocalGachaUrl.bind(null, true)}
            style={{ marginRight: "12px" }}
          />
          <Button type='confirm' text='更新数据' onClick={updateGachaData} />
          <span className={styles.title}>祈愿记录 「数据可视化」 分析</span>
        </div>
        <div className={styles.pieChart}>
          <div className={styles.filterBtns}>
            <div>
              <span>物品类型：</span>
              <button onClick={() => toggleItemType("all")}>所有</button>
              <button onClick={() => toggleItemType("role")}>角色</button>
              <button onClick={() => toggleItemType("weapon")}>武器</button>
            </div>
            <div>
              <span>祈愿类型：</span>
              <button onClick={() => setPieFilter({ item: pieFilter.item, gacha: "all" })}>
                所有
              </button>
              <button onClick={() => toggleGachaType("normal")}>常驻池</button>
              <button onClick={() => toggleGachaType("activity")}>活动池</button>
              <button onClick={() => toggleGachaType("weapon")}>武器池</button>
              <button onClick={() => toggleGachaType("newer")}>新手池</button>
            </div>
          </div>
          <RolePie data={transformGachaDataType(gacha.list, pieFilter)} />
        </div>

        <div className={styles.subTitle}>近半年祈愿日历</div>

        <DateRange
          data={dates}
          className={styles.timeRange}
          range={dateRange}
          width='480px'
          height='160px'
        />
        {gacha.list.length && <span className={styles.dateTip}>{tip}</span>}
      </div>
      {notice.holder}
    </>
  );
};

export default Gocha;
