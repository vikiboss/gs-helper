import React from "react";
import { Link } from "react-router-dom";

import nativeApi from "../../nativeApi";

import style from "./index.module.less";

const Home: React.FC = () => {
  const handleClick = async () => {
    const appInfo = await nativeApi.getAppInfo();
    console.log(appInfo);
  };
  return (
    <div onClick={handleClick} className={style.desc}>
      <div>暂无公告</div>
      <Link to='/setting'>去设置</Link>
    </div>
  );
};

export default Home;
