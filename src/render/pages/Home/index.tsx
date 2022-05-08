import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";

import styles from "./index.less";

const Home: React.FC = () => {
  const { success, holder } = useAlert();
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();
  const handleLoginClick = () => {
    if (isLogin) {
      logout();
      success({ message: "您已成功退出登录" });
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div>{isLogin ? "已登录，欢迎" : "请登录以使用全部功能"}</div>
        <Button text='抽卡分析' noIcon onClick={() => navigate("/gacha")} />
        <Button text='设置' noIcon onClick={() => navigate("/setting")} />
        <Button noIcon text={isLogin ? "退出登录" : "登录"} onClick={handleLoginClick} />
      </div>
      {holder}
    </>
  );
};

export default Home;
