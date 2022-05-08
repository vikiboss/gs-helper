import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";
import icon from "../../../assets/icon.png";

import styles from "./index.less";

const Home: React.FC = () => {
  const { success, holder } = useAlert();
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      const user = nativeApi.getStoreKey("user");
    }
  }, []);

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
        <div className={styles.user}>
          <img
            src={
              "https://img-static.mihoyo.com/communityweb/upload/d51a7361bbf35342b43c7801d254d016.png"
            }
            alt='avatar'
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <div className={styles.uid}>UID 226672853</div>
            <div className={styles.greet}>晚上好，冒险者</div>
          </div>
        </div>
        <div className={styles.content}>
          <div>{isLogin ? "已登录，欢迎" : "请登录以使用全部功能"}</div>
          <Button text='抽卡分析' noIcon onClick={() => navigate("/gacha")} />
          <Button text='设置' noIcon onClick={() => navigate("/setting")} />
          <Button
            type={isLogin ? "cancel" : "confirm"}
            text={isLogin ? "退出登录" : "登录"}
            onClick={handleLoginClick}
          />
        </div>
      </div>
      {holder}
    </>
  );
};

export default Home;
