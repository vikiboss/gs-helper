import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscPieChart } from "react-icons/vsc";

import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";
import icon from "../../../assets/icon.png";

import type { AppData } from "../../../typings";

import styles from "./index.less";

const Home: React.FC = () => {
  const [user, setUser] = useState<Partial<AppData["user"]>>({});
  const { success, holder } = useAlert();
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!isLogin) return;
      setUser(await nativeApi.getStoreKey("user"));
    })();
  }, [isLogin]);

  const handleLoginClick = () => {
    if (isLogin) {
      logout();
      success({ message: "您已成功退出登录" });
    } else {
      navigate("/login");
    }
  };

  const handleTip = () => {
    success({ message: "👋 测试文本 👨‍💻" });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.user}>
          {isLogin ? (
            <>
              <img src={user.avatar || icon} alt='avatar' className={styles.avatar} />
              <div className={styles.userInfo}>
                <div>
                  昵称：<div className={styles.nickname}>{user.nickname}</div>
                </div>
                <div>
                  签名：<div className={styles.sign}>{user.introduce || "这个人有点懒"}</div>
                </div>
                <div>
                  BID：<div className={styles.buid}>{user.buid}</div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.noLoginContainer}>
              <div className={styles.noLoginText}>
                欢迎你，冒险者。👋
                <br />
                登录 「米游社」 账号以使用全部功能。
              </div>
              <Button text='登录米游社' size='middle' type='confirm' onClick={handleLoginClick} />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{"= 旅行者工具 🛠️ ="}</div>
          {!isLogin && <div className={styles.ps}>{"※ 部分工具需要登录才能使用。"}</div>}
          <div className={styles.btnList}>
            <div className={styles.btn}>
              <VscPieChart size={42} />
              <span className={styles.btnText}>祈愿分析</span>
            </div>
            <div className={styles.btn}>
              <VscPieChart size={42} />
              <span className={styles.btnText}>旅行者札记</span>
            </div>
            <div className={styles.btn}>
              <VscPieChart size={42} />
              <span className={styles.btnText}>提瓦特地图</span>
            </div>
            <div className={styles.btn}>
              <VscPieChart size={42} />
              <span className={styles.btnText}>角色详情</span>
            </div>
            <div className={styles.btn}>
              <VscPieChart size={42} />
              <span className={styles.btnText}>游戏数据</span>
            </div>
            <div className={styles.btn}>
              <VscPieChart size={42} />
              <span className={styles.btnText}>抽卡分析</span>
            </div>
            <div className={styles.btn}>
              <VscPieChart size={42} />
              <span className={styles.btnText}>抽卡分析</span>
            </div>
            <div className={styles.btn}>
              <VscPieChart size={42} />
              <span className={styles.btnText}>抽卡分析</span>
            </div>
          </div>
          {/* <div className={styles.btns}>
            <Button text='抽卡分析' noIcon onClick={() => navigate("/gacha")} />
            <Button text='设置' noIcon onClick={() => navigate("/setting")} />
            <Button text='测试弹窗' noIcon onClick={handleTip} />
          </div> */}
        </div>
      </div>
      {holder}
    </>
  );
};

export default Home;
