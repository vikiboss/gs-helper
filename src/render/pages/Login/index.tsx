import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";
import Button from "../../components/Button";

import type { AppData } from "../../../typings";

import styles from "./index.less";

type LoginProp = {
  from?: string;
};

const Login: React.FC<LoginProp> = (props) => {
  const navigate = useNavigate();
  const { isLogin, login } = useAuth();
  const [logged, setLogged] = useState<boolean>(isLogin);
  const { holder, success, faild } = useAlert();

  const naviProps = {
    to: props?.from || "/",
    replace: true
  };

  useEffect(() => {
    if (props?.from) faild({ message: "请登录以使用全部功能" });
  }, []);

  const handleLogin = () => {
    nativeApi.loginViaMihoyoBBS();
  };

  const handleRefresh = async () => {
    const user: AppData["user"] = await nativeApi.getStoreKey("user");
    if (!user?.cookie) return faild({ message: "未检测到有效验证信息，请重新登录" });
    setLogged(true);
    success({ message: "登录成功，正在前往登录前页面..." });
    setTimeout(() => login(), 1200);
  };

  const navigateToHomePage = () => {
    navigate("/");
  };

  if (isLogin) return <Navigate {...naviProps} />;

  return (
    <div className={styles.bg}>
      <Button noIcon text='登录' onClick={handleLogin} />
      <Button noIcon text='刷新' onClick={handleRefresh} />
      <Button noIcon text='回首页' onClick={navigateToHomePage} />
      {logged && <Link to={naviProps.to}>如果没有自动跳转，请点此手动跳转</Link>}
      {holder}
    </div>
  );
};

export default Login;
