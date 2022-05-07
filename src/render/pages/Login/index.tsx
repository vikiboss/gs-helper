import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";

import styles from "./index.less";

const Login: React.FC = () => {
  const { isLogin, login, logout } = useAuth();
  return (
    <div className={styles.bg}>
      <Link to='/'>去首页</Link>
      <div onClick={() => login("buid=123;")}>登录</div>
    </div>
  );
};

export default Login;
