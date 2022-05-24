import { NavigateOptions, useNavigate } from "react-router-dom";
import cn from "classnames";
import React, { useEffect, useState } from "react";

import { AiOutlineUserSwitch, AiOutlineUserAdd } from "react-icons/ai";
import { BiNotepad, BiInfoCircle } from "react-icons/Bi";
import { FaRegMap, FaRegCompass } from "react-icons/fa";
import { HiOutlineChartPie, HiCubeTransparent } from "react-icons/hi";
import { IoMdRefresh } from "react-icons/io";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountBox } from "react-icons/md";
import { RiCalendarCheckFill } from "react-icons/ri";

import Button from "../../components/Button";
import nativeApi from "../../utils/nativeApi";
import useAuth from "../../hooks/useAuth";
import useNotice from "../../hooks/useNotice";
import {
  ANNUCEMENT_DATA_DELAY,
  ANNUCEMENT_OPEN_SOURCE,
  DefaultAppData,
  DefaultNotes,
  DefaultSignInfo,
  LINK_BBS_YS_OBC,
  LINK_GENSHIN_MAP,
  LOGIN_TIP,
  WELCOME_TIP
} from "../../../constants";

import avatar from "../../../assets/icon.png";
import bbsIcon from "../../../assets/bbs.png";
import discountIcon from "../../../assets/discount.png";
import homeIcon from "../../../assets/home.png";
import prestigeIcon from "../../../assets/prestige.png";
import resinIcon from "../../../assets/resin.png";
import taskIcon from "../../../assets/task.png";
import transformerIcon from "../../../assets/transformer.png";

import type { AppData } from "../../../typings";
import type { DailyNotesData } from "../../../services/getDailyNotes";
import type { SignInfo } from "../../../services/getBBSSignInfo";

import styles from "./index.less";

const formatTime = (seconds: number) => {
  if (seconds <= 60) return `${seconds} 秒 `;
  if (seconds <= 3600) return `${Math.ceil(seconds / 60)} 分钟 `;
  if (seconds <= 86400) {
    const hour = `${Math.floor(seconds / 3600)} 小时 `;
    const minute = Math.ceil((seconds % 3600) / 60);
    return hour + (minute ? minute + " 分钟 " : "");
  }
  const day = `${Math.floor(seconds / 86400)} 天 `;
  const hour = Math.ceil((seconds % 86400) / 3600);
  const timeStr = day + (hour ? hour + " 小时 " : "");
  return timeStr.trim();
};

const Home: React.FC = () => {
  const auth = useAuth();
  const notice = useNotice();
  const navigate = useNavigate();
  const [heart, setHeart] = useState<NodeJS.Timer>(null);
  const [user, setUser] = useState<Partial<AppData["user"]>>(DefaultAppData["user"]);
  const [sign, setSign] = useState<SignInfo>(DefaultSignInfo);
  const [note, setNotesData] = useState<DailyNotesData>(DefaultNotes);

  useEffect(() => {
    (async () => {
      updateInfo(false);
      setHeart(setInterval(() => updateInfo(false), 60000));
    })();
    return () => {
      clearInterval(heart);
      setHeart(null);
    };
  }, []);

  const safelyNavigate = (path: string, options?: NavigateOptions) => {
    clearInterval(heart);
    setHeart(null);
    navigate(path, options);
  };

  const updateInfo = async (isUserTrriger: boolean = true) => {
    if (!auth.isLogin) return;
    if (isUserTrriger) notice.info({ message: "正在获取最新数据...", autoHide: false });

    const [user, note, sign] = await Promise.all([
      nativeApi.refreshUserInfo(),
      nativeApi.getDailyNotes(),
      nativeApi.getBBSSignInfo()
    ]);

    if (!user?.uid || !note?.max_resin || !sign.today) {
      auth.logout();
      return navigate("/login", { state: { isExpired: true } });
    }

    if (isUserTrriger) notice.success({ message: "数据更新成功" });

    setUser(user);
    setNotesData(note);
    setSign(sign);
  };

  const handlePageSwitch = (path: string) => {
    const noAuth = !auth.isLogin && path !== "/gacha";
    if (noAuth) return notice.warning({ message: "请先登录 「米游社」 账号" });
    const monthNotOpen = path === "/month" && user.level < 10;
    if (monthNotOpen) return notice.warning({ message: "旅行者还没有达到札记开放等级（10级）" });
    safelyNavigate(path);
  };

  const handleWindowOpen = (link: string) => {
    nativeApi.openWindow(link);
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

  // 处理原粹数值数据
  const isResinOk = note?.current_resin === note?.max_resin;
  const resinStatus = `${note?.current_resin}/${note?.max_resin}`;
  const resinTime = Number(note?.resin_recovery_time) || 0;
  const resinTitle = isResinOk ? "树脂恢复完毕" : `树脂全部恢复预计需要 ${formatTime(resinTime)}`;

  // 处理洞天宝钱数据
  const isHomeOk = note?.max_home_coin !== 0;
  const isFull = note?.current_home_coin === note?.max_home_coin;
  const homeStatus = isHomeOk ? `${note?.current_home_coin}/${note?.max_home_coin}` : "暂未开启";
  const homeTime = Number(note?.home_coin_recovery_time) || 0;
  const homeTitle = isHomeOk
    ? isFull
      ? "洞天宝钱已存满"
      : `存满预计需要 ${formatTime(homeTime)}`
    : "尘歌壶功能未开启";

  // 处理每日委托数据
  const hasReceivedTask = note?.total_task_num !== 0;
  const taskRate = `${note?.finished_task_num}/${note?.total_task_num}`;
  const taskStatus = hasReceivedTask ? taskRate : "尚未接取";
  const isTaskDone = note?.finished_task_num === note?.total_task_num;
  const doneText = isTaskDone ? "已完成" : "未完成";
  const hasReceivedReward = note?.is_extra_task_reward_received;
  const extraText = hasReceivedReward ? "已领取" : "未领取";
  const taskTitle = `每日委托任务${doneText}，额外奖励${extraText}`;

  // 处理周本数据
  const { remain_resin_discount_num: remain, resin_discount_num_limit: limit } = note;
  const discountStatus = `${limit - remain}/${limit}`;
  const isDiscountDone = remain === 0;
  const discountText = isDiscountDone ? "已达上限" : `还剩 ${remain} 次`;
  const discountTitle = "本周树脂减半次数" + discountText;

  // 处理参量质变仪数据
  const hasTransformer = note?.transformer?.obtained;
  const _ = note?.transformer?.recovery_time;
  const transformerTime = _.Day * 86400 + _.Hour * 3600 + _.Minute * 60 + _.Second;
  const isTransformerReady = transformerTime === 0;
  const transformerStatus = hasTransformer
    ? isTransformerReady
      ? "已就绪"
      : `冷却中`
    : "暂未获得";
  const transformerTitle = `距下次可用还剩 ${formatTime(transformerTime)}`;

  // 处理签到数据
  const signStatus = `${sign.is_sign ? "已签到" : "未签到"}`;
  const signTitle = `本月累计签到 ${sign.total_sign_day} 天，错过 ${sign.sign_cnt_missed} 天`;

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
      detail: `今日委托 ${taskStatus}`,
      icon: taskIcon,
      title: taskTitle,
      name: "task"
    },
    {
      detail: `周本进度 ${discountStatus}`,
      icon: discountIcon,
      title: discountTitle,
      name: "discount"
    },
    {
      detail: `参量质变仪 ${transformerStatus}`,
      icon: transformerIcon,
      title: transformerTitle,
      name: "transformer"
    },
    {
      detail: `米游社签到 ${signStatus}`,
      icon: bbsIcon,
      title: signTitle,
      name: "sign"
    }
  ];

  const dispatchs = (note?.expeditions || []).map((e) => {
    const done = e.status === "Finished";
    const doneText = "探索派遣任务已完成，等待领取";
    const pendingText = `探险中，距离探险结束还剩 ${formatTime(Number(e.remained_time))}`;
    const title = done ? doneText : pendingText;
    const avatar = e.avatar_side_icon;
    return { done, avatar, title };
  });

  const dispatchDetail = `探索派遣 ${dispatchs.length}/${note?.max_expedition_num}`;
  const dispatcTitle = dispatchs.length > 0 ? dispatchDetail : "暂未派遣任何角色";

  const btns = [
    {
      name: "祈愿分析",
      Icon: HiOutlineChartPie,
      handler: () => handlePageSwitch("/gacha")
    },
    {
      name: "提瓦特地图",
      Icon: FaRegMap,
      handler: () => handleWindowOpen(LINK_GENSHIN_MAP)
    },
    {
      name: "观测枢·攻略",
      Icon: FaRegCompass,
      handler: () => handleWindowOpen(LINK_BBS_YS_OBC)
    },
    {
      name: "旅行者札记",
      Icon: BiNotepad,
      handler: () => handlePageSwitch("/month")
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
      handler: () => handlePageSwitch("/sign")
    }
  ];

  const handleUidClick = (uid: string) => {
    nativeApi.writeClipboardText(uid);
    notice.success({ message: "已将 UID 复制到剪切板" });
  };

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
                        <div
                          className={styles[e.key]}
                          onClick={e.key === "uid" ? handleUidClick.bind(null, e.content) : null}
                        >
                          {e.content}
                        </div>
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
                onClick={() => safelyNavigate("/login")}
              />
            </div>
          )}
          <div className={styles.topBtns}>
            {auth.isLogin && (
              <>
                <div className={styles.topBtn} onClick={() => updateInfo()}>
                  <IoMdRefresh size={20} />
                  <span>刷新</span>
                </div>
                |
              </>
            )}
            <div
              className={styles.topBtn}
              onClick={() => safelyNavigate("/login", { state: { changeAccount: auth.isLogin } })}
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
            <div className={styles.topBtn} onClick={() => safelyNavigate("/setting")}>
              <IoSettingsOutline size={20} />
              <span>设置</span>
            </div>
            |
            <div className={styles.topBtn} onClick={() => safelyNavigate("/about")}>
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
          <div className={styles.footer}>{ANNUCEMENT_OPEN_SOURCE + ANNUCEMENT_DATA_DELAY}</div>
        </div>
      </div>
      {notice.holder}
    </>
  );
};

export default Home;
