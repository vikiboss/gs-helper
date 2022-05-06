import React from "react";
import { Link } from "react-router-dom";

import nativeApi from "../../nativeApi";
import CircularButton from "../../components/CircularButton";

import "./index.less";
import Button from "../../components/Button";

const Home: React.FC = () => {
  const handleClick = async () => {
    const appInfo = await nativeApi.getAppInfo();
    console.log(appInfo);
  };
  return (
    <div onClick={handleClick} className='desc'>
      <CircularButton type='refresh' onClick={() => {}} />
      <div>暂无公告</div>
      <Button type='confirm' onClick={() => {}} text="确认"/>
      <Button type='cancel' onClick={() => {}} text="取消"/>
      <Link to='/setting'>去设置</Link>
    </div>
  );
};

export default Home;
