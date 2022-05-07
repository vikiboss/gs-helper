import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";
import nativeApi from "../../utils/nativeApi";

import style from "./index.less";

const Home: React.FC = () => {
  const { info, success, warning, faild, holder } = useAlert();
  const handleClick = async () => {
    await nativeApi.setStoreKey("user", { uid: "123", cookie: "viki" });
    success({ message: "写入成功" });
  };
  const handleClick2 = async () => {
    const user = await nativeApi.getStoreKey("user");
    success({ message: "获取成功，值为" + JSON.stringify(user) });
    console.log(user);
  };
  return (
    <div className={style.desc}>
      <Button onClick={handleClick} text='操作' type='confirm' />
      <Button onClick={handleClick2} text='操作2' type='confirm' />
      <Button onClick={() => info({ message: "这是一条信息" })} text='显示信息' type='confirm' />
      <Link to='/setting'>去设置</Link>
      {holder}
    </div>
  );
};

export default Home;
