import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDatum, CalendarTooltipProps, ResponsiveCalendar } from "@nivo/calendar";

import { TiArrowBack } from "react-icons/ti";
import Button from "../../components/Button";
import useNotice from "../../hooks/useNotice";
import nativeApi from "../../utils/nativeApi";
import CircleButton from "../../components/CircleButton";

import type { GachaData } from "../../../typings";

import styles from "./index.less";
import transformGachaDataDate from "../../../utils/transformGachaDataDate";
import { CHART_THEME, defaultGachaData } from "../../../constants";

const MyResponsiveCalendar: React.FC<{ data: CalendarDatum[]; range: (Date | string)[] }> = ({
  data,
  range
}) => (
  <ResponsiveCalendar
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

const Gocha: React.FC = () => {
  const notice = useNotice();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
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
        <div className={styles.view}>
          <MyResponsiveCalendar
            data={dates}
            range={dates.length ? [dates[0]?.day, dates[dates.length - 1]?.day] : defaultRange}
          />
        </div>
      </div>
      {notice.holder}
    </>
  );
};

export default Gocha;
