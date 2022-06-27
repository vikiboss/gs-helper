import { NavigateOptions, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { AiOutlineUserSwitch, AiOutlineUserAdd } from "react-icons/ai";
import { BiNotepad, BiInfoCircle } from "react-icons/Bi";
import { FaRegMap, FaRegCompass } from "react-icons/fa";
import { HiOutlineChartPie, HiCubeTransparent } from "react-icons/hi";
import { IoMdRefresh } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountBox } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";
import { RiCalendarCheckFill } from "react-icons/ri";

import { LINK_GENSHIN_MAP } from "../../../constants";
import Button from "../../components/Button";
import nativeApi from "../../utils/nativeApi";
import useAuth from "../../hooks/useAuth";
import useNotice from "../../hooks/useNotice";
import UserCard from "./UserCard";

import type { DailyNotesData } from "../../../services/getDailyNotes";
import type { SignInfo } from "../../../services/getBBSSignInfo";
import type { GameRole } from "../../../typings";

import styles from "./index.less";

const Home: React.FC = () => {
  const auth = useAuth();
  const notice = useNotice();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [heart, setHeart] = useState<NodeJS.Timer>(null);
  const [user, setUser] = useState<GameRole | null>(null);
  const [sign, setSign] = useState<SignInfo | null>(null);
  const [note, setNotesData] = useState<DailyNotesData | null>(null);
  const [hitokoto, setHitokoto] = useState<string>("loading...");

  useEffect(() => {
    (async () => {
      updateInfo(false);
      const hitokoto = await nativeApi.getHitokoto();
      setHitokoto(hitokoto);
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
    setLoading(true);
    if (isUserTrriger) notice.info({ message: "小派蒙正在努力获取最新数据...", autoHide: false });

    try {
      const [user, note, sign] = await Promise.all([
        nativeApi.getGameRoleInfo(),
        nativeApi.getDailyNotes(),
        nativeApi.getBBSSignInfo()
      ]);

      if (!user?.game_uid || !note?.max_resin || !sign.today) {
        const currentUser = await nativeApi.getCurrentUser();
        auth.logout(currentUser.uid);
        return navigate("/login", { state: { isExpired: true } });
      }

      if (isUserTrriger) notice.success({ message: "游戏状态更新成功" });

      setUser(user);
      setNotesData(note);
      setSign(sign);
      setLoading(false);
    } catch (e) {
      const isOffline = e?.message?.includes("getaddrinfo");
      const msg = isOffline ? "网络状况不佳，请检查后重试 T_T" : "加载超时，请检查网络连接 T_T";
      notice.faild({ message: msg });
    }
  };

  const handlePageSwitch = (path: string) => {
    const noAuth =
      !auth.isLogin && !(path === "/gacha" || path === "/strategy" || path === "/daily");
    if (noAuth) return notice.warning({ message: "这个功能需要登录才能正常使用" });
    const monthNotOpen = path === "/month" && user.level < 10;
    if (monthNotOpen) return notice.warning({ message: "旅行者还没有达到札记开放等级（10级）" });
    safelyNavigate(path);
  };

  const handleWindowOpen = (link: string) => {
    nativeApi.openWindow(link);
  };

  const handleAvatarClick = async () => {
    const hitokoto = await nativeApi.getHitokoto();
    const error = hitokoto.includes("出错啦");
    notice[error ? "warning" : "info"]({ message: hitokoto });
  };

  const btns = [
    {
      name: "祈愿分析",
      Icon: HiOutlineChartPie,
      handler: () => handlePageSwitch("/gacha")
    },
    {
      name: "原神日历",
      Icon: BiNotepad,
      handler: () => handlePageSwitch("/daily")
    },
    {
      name: "原神攻略",
      Icon: FaRegCompass,
      handler: () => handlePageSwitch("/strategy")
      // handler: () => handleWindowOpen(LINK_BBS_YS_OBC)
    },
    {
      name: "提瓦特地图",
      Icon: FaRegMap,
      handler: () => handleWindowOpen(LINK_GENSHIN_MAP)
    },
    {
      name: "米游社签到",
      Icon: RiCalendarCheckFill,
      handler: () => handlePageSwitch("/sign")
    },
    {
      name: "冒险札记",
      Icon: MdOutlineNoteAlt,
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
      handler: () => handlePageSwitch("/statistic")
    }
  ];

  const handleCopy = (str: string, msg: string) => {
    nativeApi.writeClipboardText(str);
    notice.success({ message: msg });
  };

  // const isHomeDataLoaded = false;
  const isHomeDataLoaded = !loading && note && user && sign;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.user}>
          {auth.isLogin ? (
            isHomeDataLoaded ? (
              <UserCard
                sign={sign}
                user={user}
                note={note}
                notice={notice}
                handleAvatarClick={handleAvatarClick}
                handleCopy={handleCopy}
              />
            ) : (
              <div className={styles.loading}>Loading...</div>
            )
          ) : (
            <div className={styles.noLoginContainer}>
              <div className={styles.noLoginText}>
                <span>欢迎你，旅行者。👋</span>
                <span>建议登录 「米游社」 账号以获得最佳使用体验。</span>
              </div>
              <Button
                text='前往登录'
                size='middle'
                type='confirm'
                onClick={() => safelyNavigate("/login")}
              />
            </div>
          )}
          <div className={styles.topGreeting} onClick={handleCopy.bind(null, hitokoto, "复制成功")}>
            {hitokoto}
          </div>
          <div className={styles.topBtns}>
            {auth.isLogin && (
              <>
                <div className={styles.topBtn} onClick={() => updateInfo()}>
                  <IoMdRefresh size={20} className={loading ? styles.loading : ""} />
                  <span>{loading ? "正在更新" : "更新数据"}</span>
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
          <div className={styles.footer} onClick={() => safelyNavigate("/about")}>
            「原神助手」 使用 MIT 协议开源，软件内的数据与素材主要来源于
            「米游社」。数据可能存在延迟，请以游戏内的实时数据为准，详情请参阅 「关于」 页面。
          </div>
        </div>
      </div>
      {notice.holder}
    </>
  );
};

export default Home;
