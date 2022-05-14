import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import useNotice from "../../hooks/useNotice";
import nativeApi from "../../utils/nativeApi";

import type { GachaData } from "../../../typings";

import styles from "./index.less";

const Gocha: React.FC = () => {
  const notice = useNotice();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [gacha, setGacha] = useState<Partial<GachaData>>({});

  const getUrl = async () => {
    if (loading) return;
    setLoading(true);
    const url = await nativeApi.getGachaUrl();
    if (url) {
      notice.info({ message: "正在拼命获取最新数据，请等待操作完成...", autoHide: false });
      const data = await nativeApi.getGachaListByUrl(url);
      if (data?.list?.length) {
        notice.success({ message: "祈愿数据获取完毕" });
      } else {
        notice.faild({ message: "数据异常" });
      }
      setGacha(data);
    } else {
      notice.faild({
        message: "未找到有效的 URL，请先在游戏内打开 「祈愿历史记录」 后再尝试获取",
        duration: 3000
      });
    }
    setLoading(false);
  };

  const test = async () => {
    const res = await nativeApi.getDailyNotes();
    console.log(res);
  };

  return (
    <>
      <div className={styles.desc}>
        <div>抽卡分析</div>
        {gacha.list && <div>共计抽卡：{gacha.list.length}次</div>}
        <Button noIcon text='请求数据' onClick={getUrl} />
        <Button noIcon text='测试' onClick={test} />
        <Button noIcon text='回首页' onClick={() => navigate("/")} />
      </div>
      {notice.holder}
    </>
  );
};

export default Gocha;
