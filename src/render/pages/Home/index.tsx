import React, { MouseEventHandler, useEffect, useState } from "react";
import { BiNotepad } from "react-icons/Bi";
import { FaMapSigns } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoTelescopeOutline } from "react-icons/io5";
import { MdOutlineAccountBox } from "react-icons/md";
import { HiOutlineChartPie, HiCubeTransparent } from "react-icons/hi";

import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";
import icon from "../../../assets/icon.png";

import type { AppData } from "../../../typings";

import styles from "./index.less";
import { ANNUCEMENT, REPO_URL } from "../../../constants";

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

  const handleLinkClick: MouseEventHandler = (e) => {
    e.preventDefault();
    nativeApi.openLink(REPO_URL);
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
              <HiOutlineChartPie size={42} />
              <span className={styles.btnText}>祈愿分析</span>
            </div>

            <div className={styles.btn}>
              <BiNotepad size={42} />
              <span className={styles.btnText}>旅行者札记</span>
            </div>
            <div className={styles.btn}>
              <MdOutlineAccountBox size={42} />
              <span className={styles.btnText}>角色详情</span>
            </div>
            <div className={styles.btn}>
              <HiCubeTransparent size={42} />
              <span className={styles.btnText}>游戏数据</span>
            </div>
            <div className={styles.btn}>
              <FaMapSigns size={42} />
              <span className={styles.btnText}>提瓦特地图</span>
            </div>
            <div className={styles.btn}>
              <IoTelescopeOutline size={42} />
              <span className={styles.btnText}>观测枢·百科攻略</span>
            </div>
          </div>
          <div className={styles.footer}>
            {ANNUCEMENT}源码：<a onClick={handleLinkClick}>GitHub</a>
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
