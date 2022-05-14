import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { BiNotepad } from "react-icons/Bi";
import { IoMdRefresh } from "react-icons/io";
import { MdOutlineAccountBox } from "react-icons/md";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { FaRegMap, FaRegCompass, FaGithub } from "react-icons/fa";
import { HiOutlineChartPie, HiCubeTransparent } from "react-icons/hi";

import Button from "../../components/Button";
import useNotice from "../../hooks/useNotice";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";
import {
  ANNUCEMENT,
  defaultNotes,
  LINK_BBS_YS_OBC,
  LINK_GENSHIN_MAP,
  LINK_GITHUB_REPO,
  LOGIN_TIP
} from "../../../constants";

import type { AppData, DailyNotesData } from "../../../typings";

import resinIcon from "../../../assets/resin.png";
import homeIcon from "../../../assets/home.png";
import taskIcon from "../../../assets/task.png";
import discountIcon from "../../../assets/discount.png";
import transformerIcon from "../../../assets/transformer.png";

import avatar from "../../../assets/icon.png";
import styles from "./index.less";
import CircleButton from "../../components/CircleButton";

const formatTime = (seconds: number) => {
  if (seconds <= 60) return `${seconds}秒`;
  if (seconds <= 3600) return `${Math.ceil(seconds / 60)}分钟`;
  if (seconds <= 86400) return `${Math.ceil(seconds / 3600)}小时`;
  return `${Math.ceil(seconds / 86400)}天${Math.ceil((seconds % 86400) / 3600)}小时`;
};

const Home: React.FC = () => {
  const auth = useAuth();
  const notice = useNotice();
  const navigate = useNavigate();
  const [user, setUser] = useState<Partial<AppData["user"]>>({});
  const [note, setNotesData] = useState<Partial<DailyNotesData>>(defaultNotes);

  useEffect(() => {
    (async () => {
      if (!auth.isLogin) return;
      setUser(await nativeApi.getStoreKey("user"));
      setNotesData(await nativeApi.getDailyNotes());
    })();
  }, [auth.isLogin]);

  const handleSwitchAccount = () => {
    navigate("/login");
  };

  const handlePageSwitch = (path: string) => {
    if (path === "/gacha") return navigate("/gacha");
    if (!auth.isLogin) return notice.warning({ message: "请先登录 「米游社」 账号" });
    navigate(path);
  };

  const handleRefresh = async () => {
    if (!auth.isLogin) return;
    notice.info({ message: "数据刷新中..." });
    const user = await nativeApi.refreshUserInfo();
    setUser(user);
    setNotesData(await nativeApi.getDailyNotes());
    notice.success({ message: "已获取最新数据" });
  };

  const info = [
    {
      key: "nickname",
      name: "昵称",
      content: (user.nickname || "").substring(0, 10)
    },
    {
      key: "level",
      name: "等级",
      content: `Lv.${user.level || ""} `
    },
    {
      key: "region",
      name: "区服",
      content: `${user.regionName || ""} （${user.isOfficial ? "官服" : "渠道服"}）`
    },
    {
      key: "uid",
      name: "UID",
      content: user.uid || ""
    }
  ];

  const resinStatus = `${note.current_resin}/${note.max_resin}`;
  const resinTitle = `树脂 「全部恢复」 预计需要${formatTime(Number(note.resin_recovery_time))}`;

  const homeStatus = `${note.current_home_coin}/${note.max_home_coin}`;
  const homeTitle = `达 「储存上限」 预计需要${formatTime(Number(note.home_coin_recovery_time))}`;

  const taskStatus = `${note.finished_task_num}/${note.total_task_num}`;
  const isTaskDone = note.finished_task_num === note.total_task_num;
  const hasReceived = note.is_extra_task_reward_received;
  const taskTitle =
    "今日 「每日委托任务」 " +
    (isTaskDone ? (hasReceived ? "已完成，奖励已领取" : "已做完，但尚未领取奖励") : "待完成");

  const discountStatus = `${note.remain_resin_discount_num}/${note.resin_discount_num_limit}`;
  const isDiscountDone = note.remain_resin_discount_num === 0;
  const discountTitle =
    "本周 「树脂减半次数」 " +
    (isDiscountDone ? "已用尽" : `还剩${note.remain_resin_discount_num}次`);

  const hasTransformer = note.transformer.obtained;
  const _ = note.transformer.recovery_time;
  const transformerTime = _.Day * 86400 + _.Hour * 3600 + _.Minute * 60 + _.Second;
  const isTransformerReady = transformerTime === 0;
  const transformerStatus = hasTransformer
    ? isTransformerReady
      ? "已就绪"
      : "冷却中"
    : "暂未获得";
  const transformerTitle =
    "参量质变仪 " +
    (hasTransformer
      ? isTransformerReady
        ? "已就绪"
        : `冷却中，距离冷却结束还剩${formatTime(transformerTime)}`
      : "暂未获得");

  const notes = [
    {
      detail: `原粹树脂 ${resinStatus}`,
      title: resinTitle,
      icon: resinIcon,
      name: "resin"
    },
    {
      detail: `洞天宝钱 ${homeStatus}`,
      title: homeTitle,
      icon: homeIcon,
      name: "home"
    },
    {
      detail: `今日委托任务 ${taskStatus}`,
      icon: taskIcon,
      title: taskTitle,
      name: "task"
    },
    {
      detail: `本周树脂减半次数 ${discountStatus}`,
      icon: discountIcon,
      title: discountTitle,
      name: "discount"
    },
    {
      detail: `参量质变仪 ${transformerStatus}`,
      icon: transformerIcon,
      title: transformerTitle,
      name: "transformer"
    }
  ];

  const dispatchs = (note.expeditions || []).map((e) => {
    const done = e.status === "Finished";
    return {
      done,
      avatar: e.avatar_side_icon,
      title: done
        ? "探索派遣任务已完成，等待领取"
        : `探险中，距离探险完成还剩${formatTime(Number(e.remained_time))}`
    };
  });

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
                    <div className={styles.infoItem} key={e.key}>
                      <span>{e.name}：</span>
                      <div className={styles[e.key]}>{e.content}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.noteCard}>
                {notes.map((e) => (
                  <div className={styles.noteItem} key={e.name} title={e.title}>
                    <img src={e.icon} className={cn(styles.noteIcon, styles[e.name])} />
                    <div className={styles.noteDetail}>{e.detail}</div>
                  </div>
                ))}
                <div className={styles.noteItem}>
                  <div className={styles.noteDetail}>
                    {dispatchs.map((e) => (
                      <div
                        className={cn(styles.dispatchBorder, e.done ? styles.done : "")}
                        title={e.title}
                        key={e.avatar}
                      >
                        <img src={e.avatar} alt='角色' className={styles.dispatchAvatar} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.refresh} onClick={handleRefresh}>
                <IoMdRefresh size={20} />
                <span>刷新</span>
              </div>
            </>
          ) : (
            <div className={styles.noLoginContainer}>
              <div className={styles.noLoginText}>{LOGIN_TIP}</div>
              <Button
                text='登录米游社'
                size='middle'
                type='confirm'
                onClick={() => navigate("/login")}
              />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.btnList}>
            <div className={styles.titleZone}>
              <div className={styles.title}>{"= 旅行者工具 ="}</div>
              {/* <div className={styles.titleBtns}>
                <CircleButton
                  Icon={IoSettingsOutline}
                  size='middle'
                  tip='设置'
                  onClick={() => handlePageSwitch("/setting")}
                />
              </div> */}
            </div>
            {/* {!auth.isLogin && <div className={styles.ps}>{"※ 部分工具需要登录才能使用。"}</div>} */}
            {btns.map(({ name, handler, Icon }) => (
              <div className={styles.btn} onClick={handler} key={name}>
                <Icon size={42} />
                <span className={styles.btnText}>{name}</span>
              </div>
            ))}
          </div>
          <div className={styles.footer}>
            <a href={LINK_GITHUB_REPO} target='_blank'>
              <FaGithub color='#fff' size={20} title='GitHub' />
            </a>
            <span>{ANNUCEMENT}</span>
          </div>
        </div>
      </div>
      {notice.holder}
    </>
  );
};

export default Home;
