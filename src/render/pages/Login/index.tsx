import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";

import styles from "./index.less";

type LoginProp = {
  from?: string;
};

const Login: React.FC<LoginProp> = (props) => {
  const { isLogin, login } = useAuth();
  const [logged, setLogged] = useState<boolean>(isLogin);
  const navigate = useNavigate();
  const { holder, success, faild } = useAlert();

  const naviProps = {
    to: props?.from || "/",
    replace: true
  };

  useEffect(() => {
    if (props?.from) faild({ message: "请登录以使用全部功能" });
  }, []);

  const handleLogin = () => {
    setLogged(true);
    success({ message: "👋 登录成功~ 正在返回登录前页面" });
    setTimeout(() => {
      login("buid=123;");
    }, 1200);
  };

  const navigateToHomePage = () => {
    navigate("/");
  };

  if (isLogin) return <Navigate {...naviProps} />;

  return (
    <div className={styles.bg}>
      <Button noIcon text='登录' onClick={handleLogin} />
      <Button noIcon text='回首页' onClick={navigateToHomePage} />
      {logged && <Link to={naviProps.to}>如果没有自动跳转，请点此处</Link>}
      {holder}
    </div>
  );
};

export default Login;
