import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BiNotepad } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";
import { MdOutlineAccountBox } from "react-icons/md";
import { FaRegMap, FaRegCompass } from "react-icons/fa";
import { HiOutlineChartPie, HiCubeTransparent } from "react-icons/hi";

import Button from "../../components/Button";
import useNotice from "../../hooks/useNotice";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";
import {
  ANNUCEMENT,
  LINK_BBS_YS_OBC,
  LINK_GENSHIN_MAP,
  LINK_GITHUB_REPO
} from "../../../constants";

import type { AppData } from "../../../typings";

import icon from "../../../assets/icon.png";
import styles from "./index.less";

const Home: React.FC = () => {
  const notice = useNotice();
  const navigate = useNavigate();
  const { isLogin, logout } = useAuth();
  const [user, setUser] = useState<Partial<AppData["user"]>>({});

  useEffect(() => {
    (async () => {
      if (!isLogin) return;
      setUser(await nativeApi.getStoreKey("user"));
    })();
  }, [isLogin]);

  const handleLoginClick = () => {
    if (isLogin) {
      logout();
      notice.success({ message: "您已成功退出登录" });
    } else {
      navigate("/login");
    }
  };

  const handlePageSwitch = (path: string) => {
    if (path === "/gacha") return navigate("/gacha");
    if (!isLogin) return notice.warning({ message: "请先登录 「米游社」 账号" });
    navigate(path);
  };

  const btns = [
    {
      name: "祈愿分析",
      Icon: HiOutlineChartPie,
      handler: () => handlePageSwitch("/gacha")
    },
    {
      name: "提瓦特地图",
      Icon: FaRegMap,
      handler: () => nativeApi.openWindow(LINK_GENSHIN_MAP)
    },
    {
      name: "观测枢·攻略",
      Icon: FaRegCompass,
      handler: () => nativeApi.openWindow(LINK_BBS_YS_OBC)
    },
    {
      name: "旅行者札记",
      Icon: BiNotepad,
      handler: () => handlePageSwitch("/note")
    },
    {
      name: "角色详情",
      Icon: MdOutlineAccountBox,
      handler: () => handlePageSwitch("/hero")
    },
    {
      name: "游戏数据",
      Icon: HiCubeTransparent,
      handler: () => handlePageSwitch("/game")
    },
    {
      name: "查询 UID",
      Icon: IoSearch,
      handler: () => handlePageSwitch("/query")
    }
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.user}>
          {isLogin ? (
            <div className={styles.userCard}>
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
            </div>
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
          <div className={styles.btnList}>
            <div className={styles.title}>{"= 旅行者工具 🛠️ ="}</div>
            {/* {!isLogin && <div className={styles.ps}>{"※ 部分工具需要登录才能使用。"}</div>} */}
            {btns.map(({ name, handler, Icon }) => (
              <div className={styles.btn} onClick={handler}>
                <Icon size={42} />
                <span className={styles.btnText}>{name}</span>
              </div>
            ))}
          </div>
          <div className={styles.footer}>
            {ANNUCEMENT}
            <a href={LINK_GITHUB_REPO} target='_blank'>
              GitHub
            </a>
          </div>
        </div>
      </div>
      {notice.holder}
    </>
  );
};

export default Home;
