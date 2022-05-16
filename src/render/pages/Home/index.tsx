import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

import { IoMdRefresh } from "react-icons/io";
import { RiCalendarCheckFill } from "react-icons/ri";
import { MdOutlineAccountBox } from "react-icons/md";
import { BiNotepad, BiInfoCircle } from "react-icons/Bi";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { FaRegMap, FaRegCompass, FaGithub } from "react-icons/fa";
import { HiOutlineChartPie, HiCubeTransparent } from "react-icons/hi";
import { AiOutlineUserSwitch, AiOutlineUserAdd } from "react-icons/ai";

import Button from "../../components/Button";
import useNotice from "../../hooks/useNotice";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";
import {
  ANNUCEMENT,
  defaultAppData,
  defaultNotes,
  LINK_BBS_YS_OBC,
  LINK_GENSHIN_MAP,
  LINK_GITHUB_REPO,
  LOGIN_TIP,
  WELCOME_TIP
} from "../../../constants";

import type { AppData, DailyNotesData } from "../../../typings";

import avatar from "../../../assets/icon.png";
import resinIcon from "../../../assets/resin.png";
import homeIcon from "../../../assets/home.png";
import taskIcon from "../../../assets/task.png";
import discountIcon from "../../../assets/discount.png";
import transformerIcon from "../../../assets/transformer.png";
import prestigeIcon from "../../../assets/prestige.png";

import styles from "./index.less";

const formatTime = (seconds: number) => {
  if (seconds <= 60) return `${seconds}秒`;
  if (seconds <= 3600) return `${Math.ceil(seconds / 60)}分钟`;
  if (seconds <= 86400)
    return `${Math.floor(seconds / 3600)}小时${Math.ceil((seconds % 3600) / 60)}分钟`;
  return `${Math.floor(seconds / 86400)}天${Math.ceil((seconds % 86400) / 3600)}小时`;
};

const Home: React.FC = () => {
  const auth = useAuth();
  const notice = useNotice();
  const navigate = useNavigate();
  const [user, setUser] = useState<Partial<AppData["user"]>>(defaultAppData["user"]);
  const [note, setNotesData] = useState<Partial<DailyNotesData>>(defaultNotes);

  useEffect(() => {
    (async () => {
      if (!auth.isLogin) return;
      const user = await nativeApi.getStoreKey("user");
      const note = await nativeApi.getDailyNotes();
      if (!user || !note) {
        auth.logout();
        return navigate("/login", { state: { isExpired: true } });
      }
      setUser(user);
      setNotesData(note);
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
    notice.info({ message: "正在获取最新数据...", autoHide: false });
    const [user, note] = await Promise.all([
      nativeApi.refreshUserInfo(),
      nativeApi.getDailyNotes()
    ]);
    if (user?.uid) {
      setUser(user);
    } else {
      notice.faild({ message: "角色信息更新失败" });
    }
    if (note?.max_resin) {
      setNotesData(note);
    } else {
      notice.faild({ message: "游戏数据更新失败" });
    }
    notice.success({ message: "数据更新成功" });
  };

  const handleAvatarClick = () => notice.info({ message: "不准点派蒙！" });

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

  const isResinOk = note?.current_resin === note?.max_resin;
  const resinStatus = `${note?.current_resin}/${note?.max_resin}`;
  const resinTitle = isResinOk
    ? "树脂已全部恢复完毕"
    : `树脂全部恢复预计需要 「${formatTime(Number(note?.resin_recovery_time))}」 `;

  const isHomeOk = note?.max_home_coin !== 0;
  const homeStatus = isHomeOk ? `${note?.current_home_coin}/${note?.max_home_coin}` : "暂未开启";
  const homeTitle = isHomeOk
    ? `达储存上限预计需要 「${formatTime(Number(note?.home_coin_recovery_time))}」 `
    : " 「尘歌壶」 相关功能暂未解锁或开启";

  const hasReceivedTask = note?.total_task_num !== 0;
  const taskStatus = hasReceivedTask
    ? `${note?.finished_task_num}/${note?.total_task_num}`
    : "尚未接取";
  const isTaskDone = note?.finished_task_num === note?.total_task_num;
  const hasReceivedReward = note?.is_extra_task_reward_received;
  const taskTitle =
    "每日委托任务 「" +
    (hasReceivedTask
      ? isTaskDone
        ? hasReceivedReward
          ? "已完成，奖励已领取"
          : "已完成，奖励未领取"
        : "待完成"
      : "尚未接取") +
    "」";

  const discountStatus = `${note?.remain_resin_discount_num}/${note?.resin_discount_num_limit}`;
  const isDiscountDone = note?.remain_resin_discount_num === 0;
  const discountTitle =
    "本周树脂减半次数" +
    (isDiscountDone ? " 「已达上限」" : `还剩 「${note?.remain_resin_discount_num}」 次`);

  const hasTransformer = note?.transformer?.obtained;
  const _ = note?.transformer?.recovery_time;
  const transformerTime = _.Day * 86400 + _.Hour * 3600 + _.Minute * 60 + _.Second;
  const isTransformerReady = transformerTime === 0;
  const transformerStatus = hasTransformer
    ? isTransformerReady
      ? "已就绪"
      : "冷却中"
    : "暂未获得";
  const transformerTitle =
    "参量质变仪 「" +
    (hasTransformer
      ? isTransformerReady
        ? "已就绪"
        : `冷却中，还剩 「${formatTime(transformerTime)}」`
      : "暂未获得") +
    "」";

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

  const dispatchs = (note?.expeditions || []).map((e) => {
    const done = e.status === "Finished";
    return {
      done,
      avatar: e.avatar_side_icon,
      title: done
        ? "探索派遣任务已完成，等待领取"
        : `探险中，距离探险结束还剩 「${formatTime(Number(e.remained_time))}」`
    };
  });

  const dispatchDetail = dispatchs.length
    ? `探索派遣 ${dispatchs.length}/${note?.max_expedition_num}`
    : "探索派遣 暂未派遣任何角色";
  const dispatcTitle = dispatchs.length
    ? `探索派遣 「${dispatchs.length}/${note?.max_expedition_num}」`
    : "探索派遣 暂未派遣任何角色";

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
      handler: () => handlePageSwitch("/role")
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
    },
    {
      name: "米游社签到",
      Icon: RiCalendarCheckFill,
      handler: () => notice.info({ message: "你点了签到" })
    }
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.user}>
          {auth.isLogin ? (
            <>
              <div className={styles.userCard}>
                <div className={styles.avatar} onClick={handleAvatarClick}>
                  <img src={avatar} alt='avatar' className={styles.avatarImage} />
                </div>
                <div className={styles.userInfo}>
                  {info.length &&
                    info.map((e) => (
                      <div className={styles.infoItem} key={e.key}>
                        <span>{e.name}：</span>
                        <div className={styles[e.key]}>{e.content}</div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.noteCard}>
                {notes.length &&
                  notes.map((e) => (
                    <div
                      className={styles.noteItem}
                      key={e.name}
                      title={e.title}
                      onClick={() => notice.info({ message: e.title })}
                    >
                      <img src={e.icon} className={cn(styles.noteIcon, styles[e.name])} />
                      <div className={styles.noteDetail}>{e.detail}</div>
                    </div>
                  ))}
                <div
                  className={styles.noteItem}
                  title={dispatcTitle}
                  onClick={() => notice.info({ message: dispatcTitle })}
                >
                  <div className={styles.noteDetail}>
                    <img src={prestigeIcon} className={cn(styles.noteIcon)} />
                    {dispatchDetail}
                  </div>
                </div>
                <div className={styles.noteItem}>
                  <div className={styles.noteDetail}>
                    {dispatchs.map((e, i) => (
                      <div
                        className={cn(styles.dispatchBorder, e.done ? styles.done : "")}
                        title={e.title}
                        key={e.avatar}
                        onClick={() => {
                          const args = { message: `角色 ${i + 1} ${e.title}` };
                          if (e.done) {
                            notice.success(args);
                          } else {
                            notice.info(args);
                          }
                        }}
                      >
                        <img src={e.avatar} alt='角色' className={styles.dispatchAvatar} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.noLoginContainer}>
              <div className={styles.noLoginText}>
                <span>{WELCOME_TIP}</span>
                <span>{LOGIN_TIP}</span>
              </div>
              <Button
                text='登录米游社'
                size='middle'
                type='confirm'
                onClick={() => navigate("/login")}
              />
            </div>
          )}
          <div className={styles.topBtns}>
            {auth.isLogin && (
              <>
                <div className={styles.topBtn} onClick={handleRefresh}>
                  <IoMdRefresh size={20} />
                  <span>刷新</span>
                </div>
                |
              </>
            )}
            <div
              className={styles.topBtn}
              onClick={() => navigate("/login", { state: { changeAccount: auth.isLogin } })}
            >
              {auth.isLogin ? (
                <>
                  <AiOutlineUserSwitch size={20} />
                  <span>切换账号</span>
                </>
              ) : (
                <>
                  <AiOutlineUserAdd size={20} />
                  <span>登录米游社</span>
                </>
              )}
            </div>
            |
            <div className={styles.topBtn} onClick={() => navigate("/setting")}>
              <IoSettingsOutline size={20} />
              <span>设置</span>
            </div>
            |
            <div className={styles.topBtn} onClick={() => navigate("/about")}>
              <BiInfoCircle size={20} />
              <span>关于</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.btnList}>
            <div className={styles.titleZone}>
              <div className={styles.title}>
                <span>旅行者工具</span>
              </div>
            </div>
            {btns.length &&
              btns.map(({ name, handler, Icon }) => (
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
