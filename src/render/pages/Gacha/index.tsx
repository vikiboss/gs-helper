import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GachaData } from "../../../typings";

import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";
import nativeApi from "../../utils/nativeApi";
import styles from "./index.less";

const Gocha: React.FC = () => {
  const navigate = useNavigate();
  const { faild, holder } = useAlert();
  const [gacha, setGacha] = useState<Partial<GachaData>>({});
  const getUrl = async () => {
    const url = await nativeApi.getGachaUrl();
    if (url) {
      const data = await nativeApi.getGachaListByUrl(url);
      console.log(url, data);
      setGacha(data);
    } else {
      faild({ message: "请先在游戏内打开 「祈愿历史记录」 后再尝试获取" });
    }
  };
  return (
    <>
      <div className={styles.desc}>
        <div>抽卡分析</div>
        {gacha.list && <div>共计抽卡：{gacha.list.length}次</div>}
        <Button noIcon text='请求数据' onClick={getUrl} />
        <Button noIcon text='回首页' onClick={() => navigate("/")} />
      </div>
      {holder}
    </>
  );
};

export default Gocha;
