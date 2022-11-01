import D from 'dayjs';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { AiOutlineUserSwitch, AiOutlineUserAdd } from 'react-icons/ai';
import { BiNotepad, BiInfoCircle } from 'react-icons/bi';
import { FaRegMap, FaRegCompass, FaDoorOpen } from 'react-icons/fa';
import { HiOutlineChartPie, HiCubeTransparent } from 'react-icons/hi';
import { IoMdRefresh } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineAccountBox, MdOutlineNoteAlt } from 'react-icons/md';

import { LINK_GENSHIN_MAP, UPDATE_INTERVAL } from '../../../constants';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import nativeApi from '../../utils/nativeApi';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';
import useNotice from '../../hooks/useNotice';
import UserCard from './UserCard';

import type { CalenderEvent } from '../../../services/getCalenderList';
import type { DailyNotesData } from '../../../services/getDailyNotes';
import type { GameRole } from '../../../typings';
import type { SignInfo } from '../../../services/getBBSSignInfo';

import styles from './index.less';

const { getGameRoleInfo, getBBSSignInfo, getDailyNotes } = nativeApi;

const Home: React.FC = () => {
  const auth = useAuth();
  const notice = useNotice();
  const navigate = useNavigate();
  const [tip, setTip] = useState<string>('');
  const [heart, setHeart] = useState<NodeJS.Timer>(null);

  const [getUser, user, l1, e1, d1] = useApi<GameRole | null>(getGameRoleInfo);
  const [getSign, sign, l2, e2, d2] = useApi<SignInfo | null>(getBBSSignInfo);
  const [getNote, note, l3, e3, d3] = useApi<DailyNotesData | null>(getDailyNotes);

  const loading = l1 || l2 || l3;
  const error = e1 || e2 || e3;
  const done = d1 && d2 && d3;

  const init = async () => {
    updateInfo(false);
    setTip(await getTip());

    const timer = setInterval(async () => {
      updateInfo(false);
      setTip(await getTip());
    }, UPDATE_INTERVAL);

    setHeart(timer);
  };

  useEffect(function () {
    init();

    return () => {
      clearInterval(heart);
      setHeart(null);
    };
  }, []);

  const isToday = (e: CalenderEvent) => {
    const now = Number(String(Date.now()).slice(0, 10));
    // const now = 1627315220;
    return Number(e.end_time) > now && Number(e.start_time) < now;
  };

  const getTip = async () => {
    const BirthType = '4';
    const list = await nativeApi.getCalenderList();
    const event = list.find((e) => e.kind === BirthType && isToday(e));

    if (event) {
      const now = new Date();
      const WeekMap = ['日', '一', '二', '三', '四', '五', '六'];
      const timeStr = `${D(now).format('M月D日')} 星期${WeekMap[now.getDay()]}`;
      return `${timeStr} ${event.title}`;
    } else {
      const hitokoto = await nativeApi.getHitokoto();
      return hitokoto;
    }
  };

  const safelyNavigate = (path: string, options?: NavigateOptions) => {
    clearInterval(heart);
    setHeart(null);
    navigate(path, options);
  };

  const updateInfo = async (isUserTrriger = true) => {
    if (!auth.isLogin) {
      return;
    }

    if (loading && isUserTrriger) {
      return notice.warning({
        message: '小派蒙正在努力加载，请不要重复点击啦！',
        autoHide: false,
      });
    }

    if (isUserTrriger) {
      clearInterval(heart);

      notice.info({
        message: '小派蒙正在努力获取最新数据...',
        autoHide: false,
      });

      setHeart(setInterval(() => updateInfo(false), UPDATE_INTERVAL));
    }

    await Promise.all([getUser(), getNote(), getSign()]);

    if (done && (!user?.game_uid || !note?.max_resin || !sign?.today)) {
      const currentUser = await nativeApi.getCurrentUser();
      auth.logout(currentUser.uid);
      return navigate('/login', { state: { isExpired: true } });
    }

    if (isUserTrriger) {
      notice.success({ message: '游戏状态更新成功' });
    }

    if (error) {
      notice.faild({ message: error });
    }
  };

  const handlePageSwitch = (path: string) => {
    const noLogin = !auth.isLogin;
    const isPublicPath = ['/gacha', '/strategy', '/calendar'].includes(path);
    const noAuth = noLogin && !isPublicPath;

    if (noAuth) {
      return notice.warning({ message: '这个功能需要登录才能正常使用' });
    }

    const dailyNotOpen = path === '/calendar' && user.level < 10;

    if (dailyNotOpen) {
      return notice.warning({ message: '旅行者还没有达到札记开放等级（10级）' });
    }

    safelyNavigate(path);
  };

  const handleWindowOpen = (link: string) => {
    notice.success({ message: '正在打开页面...', duration: 1000 });
    nativeApi.openWindow(link);
  };

  const btns = [
    {
      name: '祈愿分析',
      Icon: HiOutlineChartPie,
      handler: () => handlePageSwitch('/gacha'),
    },
    {
      name: '材料日历',
      Icon: BiNotepad,
      handler: () => handlePageSwitch('/calendar'),
    },
    {
      name: '小窗攻略',
      Icon: FaRegCompass,
      handler: () => handlePageSwitch('/strategy'),
    },
    {
      name: '大地图',
      Icon: FaRegMap,
      handler: () => handleWindowOpen(LINK_GENSHIN_MAP),
    },
    {
      name: '传送门',
      Icon: FaDoorOpen,
      handler: () => handlePageSwitch('/portal'),
    },
    // {
    //   name: "米游社签到",
    //   Icon: RiCalendarCheckFill,
    //   handler: () => handlePageSwitch("/sign")
    // },
    {
      name: '冒险札记',
      Icon: MdOutlineNoteAlt,
      handler: () => handlePageSwitch('/note'),
    },
    {
      name: '我的角色',
      Icon: MdOutlineAccountBox,
      handler: () => handlePageSwitch('/role'),
    },
    {
      name: '游戏数据',
      Icon: HiCubeTransparent,
      handler: () => handlePageSwitch('/statistic'),
    },
  ];

  // const isHomeDataLoaded = false;
  const isHomeDataLoaded = !loading && note && user && sign;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.user}>
          {auth.isLogin ? (
            isHomeDataLoaded ? (
              <UserCard sign={sign} user={user} note={note} notice={notice} safelyNavigate={safelyNavigate} />
            ) : (
              <Loading className={styles.loading} />
            )
          ) : (
            <div className={styles.noLoginContainer}>
              <div className={styles.noLoginText}>
                <span>欢迎你，旅行者。👋</span>
                <span>建议登录 「米游社」 账号以获得最佳使用体验。</span>
              </div>
              <Button text='前往登录' size='middle' type='confirm' onClick={() => safelyNavigate('/login')} />
            </div>
          )}
          <div className={styles.topGreeting}>{tip}</div>
          <div className={styles.topBtns}>
            {auth.isLogin && (
              <>
                <div className={styles.topBtn} onClick={() => updateInfo()}>
                  <IoMdRefresh size={20} className={loading ? styles.loading : ''} />
                  <span>{loading ? '正在更新' : '更新数据'}</span>
                </div>
                |
              </>
            )}
            <div
              className={styles.topBtn}
              onClick={() =>
                safelyNavigate('/login', {
                  state: { changeAccount: auth.isLogin },
                })
              }
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
            <div className={styles.topBtn} onClick={() => safelyNavigate('/setting')}>
              <IoSettingsOutline size={20} />
              <span>设置</span>
            </div>
            |
            <div className={styles.topBtn} onClick={() => safelyNavigate('/about')}>
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
          <div className={styles.footer} onClick={() => safelyNavigate('/about')}>
            「原神助手」 使用 MIT 协议开源，数据来源于 「米游社」，可能存在延迟，请以游戏内为准，详情请参阅 「关于」 页面。
          </div>
        </div>
      </div>
      {notice.holder}
    </>
  );
};

export default Home;
