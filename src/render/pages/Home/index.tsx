import React, { useEffect, useState } from "react";
import cn from "classnames";
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
  LINK_GITHUB_REPO,
  LOGIN_TIP
} from "../../../constants";

import type { AppData } from "../../../typings";

import resin from "../../../assets/resin.png";
import home from "../../../assets/home.png";
import task from "../../../assets/task.png";
import discount from "../../../assets/discount.png";
import transformer from "../../../assets/transformer.png";
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
            <>
              <div className={styles.userCard}>
                <img src={icon} alt='avatar' className={styles.avatar} />
                <div className={styles.userInfo}>
                  <div>
                    昵称：<div className={styles.nickname}>{user.nickname}</div>
                  </div>
                  <div>
                    等级：
                    <div className={styles.sign}>
                      Lv.{user.level} （{user.isOfficial ? "官服" : "渠道服"}）
                    </div>
                  </div>
                  <div>
                    UID：<div className={styles.uid}>{user.uid}</div>
                  </div>
                </div>
              </div>
              <div className={styles.noteCard}>
                <div className={styles.noteItem}>
                  <img src={resin} className={cn(styles.noteIcon, styles.resin)} />
                  <div className={styles.noteDetail}>原粹树脂 42/160</div>
                </div>
                <div className={styles.noteItem}>
                  <img src={home} className={cn(styles.noteIcon, styles.home)} />
                  <div className={styles.noteDetail}>洞天宝钱 265/900</div>
                </div>
                <div className={styles.noteItem}>
                  <img src={task} className={cn(styles.noteIcon, styles.task)} />
                  <div className={styles.noteDetail}>每日委托 4/4（已完成）</div>
                </div>
                <div className={styles.noteItem}>
                  <img src={discount} className={cn(styles.noteIcon, styles.discount)} />
                  <div className={styles.noteDetail}>周本次数 0/3（已完成）</div>
                </div>
                <div className={styles.noteItem}>
                  <img src={transformer} className={cn(styles.noteIcon, styles.transformer)} />
                  <div className={styles.noteDetail}>参量质变仪 已就绪</div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.noLoginContainer}>
              <div className={styles.noLoginText}>{LOGIN_TIP}</div>
              <Button text='登录米游社' size='middle' type='confirm' onClick={handleLoginClick} />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.btnList}>
            <div className={styles.title}>{"= 旅行者工具 ="}</div>
            {/* {!isLogin && <div className={styles.ps}>{"※ 部分工具需要登录才能使用。"}</div>} */}
            {btns.map(({ name, handler, Icon }) => (
              <div className={styles.btn} onClick={handler} key={name}>
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
