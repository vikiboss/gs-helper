import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";

import styles from "./index.less";

const Home: React.FC = () => {
  const { info, success, warning, faild, holder } = useAlert();
  const { isLogin, login, logout } = useAuth();
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
    <div className={styles.desc}>
      <Button onClick={handleClick} text='操作' type='confirm' />
      <Button onClick={handleClick2} text='操作2' type='confirm' />
      <Button onClick={() => info({ message: "这是一条信息" })} text='显示信息' type='confirm' />
      <Link to='/setting'>去设置</Link>
      <Button onClick={login.bind(null, "123")} text='登录' type='confirm' />
      <Button onClick={logout} text='退出登录' type='confirm' />
      {holder}
    </div>
  );
};

export default Home;
