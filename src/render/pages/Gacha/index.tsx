import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import nativeApi from "../../utils/nativeApi";
import styles from "./index.less";

const Gocha: React.FC = () => {
  const navigate = useNavigate();
  const getUrl = async () => {
    const url = await nativeApi.getGachaUrl();
    const data = await nativeApi.getGachaListByUrl(url);
    console.log(url, data);
  };
  return (
    <div className={styles.desc}>
      <div>抽卡分析页</div>
      <Button noIcon text='请求数据' onClick={getUrl} />
      <Button noIcon text='回首页' onClick={() => navigate("/")} />
    </div>
  );
};

export default Gocha;
