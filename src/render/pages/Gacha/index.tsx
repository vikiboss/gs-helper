import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDatum, Calendar } from "@nivo/calendar";
import { Pie } from "@nivo/pie";

import { TiArrowBack } from "react-icons/ti";
import Button from "../../components/Button";
import useNotice from "../../hooks/useNotice";
import nativeApi from "../../utils/nativeApi";
import CircleButton from "../../components/CircleButton";

import type { GachaData } from "../../../typings";

import styles from "./index.less";
import transformGachaDataDate from "../../../utils/transformGachaDataDate";
import transformGachaDataType from "../../../utils/transformGachaDataType";
import { CHART_THEME, COLORS, defaultGachaData } from "../../../constants";

const TimesCalendar: React.FC<{ data: CalendarDatum[]; range: (Date | string)[] }> = ({
  data,
  range
}) => (
  <Calendar
    height={150}
    width={900}
    data={data}
    from={range[0]}
    to={range[1]}
    emptyColor='#efefef'
    colors={["#FFEEE2", "#FFD5B6", "#FFA564", "#FF9142"]}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    monthBorderColor='#fafafa'
    theme={CHART_THEME}
    dayBorderWidth={2}
    dayBorderColor='#fff'
  />
);

const RolePie: React.FC<{ data: any }> = ({ data }) => (
  <Pie
    height={180}
    width={180}
    colors={Object.values(COLORS)}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]]
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor='#333333'
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]]
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10
      }
    ]}
    data={data}
    margin={{ top: 20, right: 40, bottom: 80, left: 40 }}
    theme={CHART_THEME}
    fill={[
      {
        match: {
          id: "三星"
        },
        id: "lines"
      },
      {
        match: {
          id: "四星"
        },
        id: "lines"
      },
      {
        match: {
          id: "五星"
        },
        id: "lines"
      }
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        translateY: 56,
        translateX: 10,
        itemWidth: 60,
        itemHeight: 18
      }
    ]}
  />
);

type GachaType = "activity" | "normal" | "weapon" | "newer";

export type FilterType = {
  itemType: "all" | "weapon" | "role";
  gachaType: "all" | GachaType[];
};

const Gocha: React.FC = () => {
  const notice = useNotice();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [pieFilter, setPieFilter] = useState<FilterType>({ itemType: "all", gachaType: "all" });
  const [placeholder, setPlaceholder] = useState<string>("");
  const [gacha, setGacha] = useState<GachaData>(defaultGachaData);

  const updateGachaData = async () => {
    if (loading) return;
    setLoading(true);

    if (!link) {
      const url = await nativeApi.getGachaUrl();
      if (url) {
        setLink(url);
      } else {
        return notice.faild({
          message: "未找到有效的 URL，请先在游戏内打开 「祈愿历史记录」 后再尝试获取",
          duration: 3000
        });
      }
    }

    if (!link.match(/^https?:\/\/webstatic.mihoyo.com/)) {
      return notice.faild({
        message: "输入的链接无效，请修改后重试",
        duration: 3000
      });
    }

    notice.info({ message: "正在拼命获取最新数据，请等待操作完成...", autoHide: false });
    const data = await nativeApi.getGachaListByUrl(link);
    console.log(data?.list?.length);

    if (data?.list?.length) {
      notice.success({ message: "祈愿数据获取完毕" });
      setGacha(data);
    } else {
      notice.faild({ message: "数据获取异常，请确保链接有效且未过期" });
    }

    setLoading(false);
  };

  const toggleGachaType = (target: GachaType) => {
    if (pieFilter.gachaType === "all") {
      setPieFilter({ gachaType: [target], itemType: pieFilter.itemType });
    } else {
      const chosenTypes = new Set(pieFilter.gachaType);
      if (chosenTypes.has(target)) {
        chosenTypes.delete(target);
      } else {
        chosenTypes.add(target);
      }
      setPieFilter({ gachaType: Array.from(chosenTypes), itemType: pieFilter.itemType });
    }
  };

  useEffect(() => {
    (async () => {
      const gachas: GachaData[] = await nativeApi.getStoreKey("gachas");
      const uid: string = await nativeApi.getStoreKey("user.uid");
      const url: string = await nativeApi.getGachaUrl();
      if (url) {
        setLink(url);
      } else {
        notice.warning({
          message: "「本地」 祈愿历史记录链接不存在",
          duration: 3000
        });
        setPlaceholder("请先在游戏内打开 「祈愿历史记录」 后再尝试获取");
      }
      for (const gacha of gachas) {
        if (gacha.info.uid === uid) setGacha(gacha);
      }
      if (gachas.length && !gacha.list.length) setGacha(gachas[0]);
    })();
  }, []);

  const dates = transformGachaDataDate(gacha);
  const now = new Date();
  const year = now.getFullYear();
  const defaultRange = [`${year}-01-01`, now];

  return (
    <>
      <div className={styles.desc}>
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={() => navigate("/")}
        />
        <div className={styles.title}>祈愿数据 「可视化分析」 </div>
        <div className={styles.inputZone}>
          <span>祈愿记录链接：</span>
          <input
            value={link}
            onBlur={(e) => setLink(e.target.value.trim())}
            onChange={(e) => setLink(e.target.value)}
            placeholder={placeholder}
          />
          <Button text='复制链接' style={{ width: "54px", margin: "0 12px" }} />
          <Button type='confirm' text='请求链接数据' onClick={updateGachaData} />
        </div>
        <TimesCalendar
          data={dates}
          range={dates.length ? [dates[0]?.day, dates[dates.length - 1]?.day] : defaultRange}
        />
        <RolePie data={transformGachaDataType(gacha.list, pieFilter)} />
        <div>
          <button onClick={() => setPieFilter({ itemType: "all", gachaType: pieFilter.gachaType })}>
            物品类型-显示所有
          </button>
          <button
            onClick={() => setPieFilter({ itemType: "role", gachaType: pieFilter.gachaType })}
          >
            物品类型-只显示角色
          </button>
          <button
            onClick={() => setPieFilter({ itemType: "weapon", gachaType: pieFilter.gachaType })}
          >
            物品类型-只显示武器
          </button>
        </div>
        <div>
          <button onClick={() => setPieFilter({ itemType: pieFilter.itemType, gachaType: "all" })}>
            祈愿类型-显示所有
          </button>
          <button onClick={() => toggleGachaType("normal")}>祈愿类型-切换常驻池</button>
          <button onClick={() => toggleGachaType("activity")}>祈愿类型-切换活动池</button>
          <button onClick={() => toggleGachaType("weapon")}>祈愿类型-切换武器池</button>
          <button onClick={() => toggleGachaType("newer")}>祈愿类型-切换新手池</button>
        </div>
      </div>

      {notice.holder}
    </>
  );
};

export default Gocha;
