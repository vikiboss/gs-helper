import React from "react";

import nativeApi from "../../nativeApi";
import icon from "../../../assets/icon.png";
import CircularButton from "../../components/CircularButton";

import "./index.less";

function Home() {
  const handleClick = async () => {
    const appInfo = await nativeApi.getAppInfo();
    console.log(appInfo);
  };
  return (
    <div onClick={handleClick} className='desc'>
      {/* <CircularButton />
      <img src={icon} alt='' /> */}
      暂无公告
    </div>
  );
}

export default Home;
