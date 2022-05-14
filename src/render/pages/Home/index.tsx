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

import resinIcon from "../../../assets/resin.png";
import homeIcon from "../../../assets/home.png";
import taskIcon from "../../../assets/task.png";
import discountIcon from "../../../assets/discount.png";
import transformerIcon from "../../../assets/transformer.png";

import avatar from "../../../assets/icon.png";
import styles from "./index.less";

const Home: React.FC = () => {
  const auth = useAuth();
  const notice = useNotice();
  const navigate = useNavigate();
  const [user, setUser] = useState<Partial<AppData["user"]>>({});

  useEffect(() => {
    (async () => {
      if (!auth.isLogin) return;
      setUser(await nativeApi.getStoreKey("user"));
    })();
  }, [auth.isLogin]);

  const handleLoginClick = () => {
    if (auth.isLogin) {
      auth.logout();
      notice.success({ message: "您已成功退出登录" });
    } else {
      navigate("/login");
    }
  };

  const handlePageSwitch = (path: string) => {
    if (path === "/gacha") return navigate("/gacha");
    if (!auth.isLogin) return notice.warning({ message: "请先登录 「米游社」 账号" });
    navigate(path);
  };

  const info = [
    {
      key: "nickname",
      name: "昵称",
      content: user.nickname
    },
    {
      key: "level",
      name: "等级",
      content: `Lv.${user.level} （${user.isOfficial ? "官服" : "渠道服"}）`
    },
    {
      key: "uid",
      name: "UID",
      content: user.uid
    }
  ];

  const notes = [
    {
      detail: "原粹树脂 42/160",
      icon: resinIcon,
      name: "resin"
    },
    {
      detail: "洞天宝钱 265/900",
      icon: homeIcon,
      name: "home"
    },
    {
      detail: "每日委托 4/4（已完成）",
      icon: taskIcon,
      name: "task"
    },
    {
      detail: "周本次数 0/3（已完成）",
      icon: discountIcon,
      name: "discount"
    },
    {
      detail: "参量质变仪 已就绪",
      icon: transformerIcon,
      name: "transformer"
    }
  ];

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
          {auth.isLogin ? (
            <>
              <div className={styles.userCard}>
                <img src={avatar} alt='avatar' className={styles.avatar} />
                <div className={styles.userInfo}>
                  {info.map((e) => (
                    <div key={e.key}>
                      <span>{e.name}：</span>
                      <div className={styles[e.key]}>{e.content}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.noteCard}>
                {notes.map((e) => (
                  <div className={styles.noteItem} key={e.name}>
                    <img src={e.icon} className={cn(styles.noteIcon, styles[e.name])} />
                    <div className={styles.noteDetail}>{e.detail}</div>
                  </div>
                ))}
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
            {/* {!auth.isLogin && <div className={styles.ps}>{"※ 部分工具需要登录才能使用。"}</div>} */}
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
