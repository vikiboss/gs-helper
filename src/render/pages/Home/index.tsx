import React from "react";

import nativeApi from "../../nativeApi";
import CircularButton from "../../components/CircularButton";

import "./index.less";

const Home: React.FC = () => {
  const handleClick = async () => {
    const appInfo = await nativeApi.getAppInfo();
    console.log(appInfo);
  };
  return (
    <div onClick={handleClick} className='desc'>
      <CircularButton type='refresh' onClick={() => {}} />
      <div>暂无公告</div>
    </div>
  );
};

export default Home;
