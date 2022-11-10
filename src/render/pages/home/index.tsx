import D from 'dayjs'
import type { NavigateOptions } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import { AiOutlineUserSwitch, AiOutlineUserAdd } from 'react-icons/ai'
import { BiNotepad, BiMap } from 'react-icons/bi'
import { FaRegCompass } from 'react-icons/fa'
import { HiOutlineChartPie, HiCubeTransparent } from 'react-icons/hi'
import { IoMdRefresh } from 'react-icons/io'
import { IoGameControllerOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineLocalFireDepartment, MdOutlineAccountBox, MdOutlineNoteAlt } from 'react-icons/md'

import { LINK_GENSHIN_MAP, UPDATE_INTERVAL } from '../../../constants'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import nativeApi from '../../utils/nativeApi'
import useApi from '../../hooks/useApi'
import useAuth from '../../hooks/useAuth'
import useNotice from '../../hooks/useNotice'
import UserCard from './UserCard'

import type { CalenderEvent } from '../../../services/getCalenderList'
import type { DailyNotesData } from '../../../services/getDailyNotes'
import type { GameRole } from '../../../typings'
import type { SignInfo } from '../../../services/getBBSSignInfo'

import styles from './index.less'

const { getGameRoleInfo, getBBSSignInfo, getDailyNotes, getGachaUrl } = nativeApi

const Home: React.FC = () => {
  const auth = useAuth()
  const notice = useNotice()
  const navigate = useNavigate()
  const [tip, setTip] = useState<string>('')
  const [heart, setHeart] = useState<NodeJS.Timer>(null)
  const [url, setUrl] = useState<string>('')

  const [getUser, user, l1, e1, d1] = useApi<GameRole | null>(getGameRoleInfo)
  const [getSign, sign, l2, e2, d2] = useApi<SignInfo | null>(getBBSSignInfo)
  const [getNote, note, l3, e3, d3] = useApi<DailyNotesData | null>(getDailyNotes)

  const loading = l1 || l2 || l3
  const error = e1 || e2 || e3
  const done = d1 && d2 && d3

  const updateInfo = async (isUserTrriger = true) => {
    if (!auth.isLogin) {
      return
    }

    if (loading && isUserTrriger) {
      notice.warning({
        message: '小派蒙正在努力加载，请不要重复点击啦！',
        autoHide: false
      })

      return
    }

    if (isUserTrriger) {
      clearInterval(heart)

      notice.info({
        message: '小派蒙正在努力获取最新数据...',
        autoHide: false
      })

      setHeart(setInterval(() => updateInfo(false), UPDATE_INTERVAL))
    }

    await Promise.all([getUser(), getNote(), getSign()])

    const hasError = !loading && (!user?.game_uid || !note?.max_resin || !sign?.today)
    const isExpired = !user?.game_uid && !note?.max_resin && !sign?.today

    if (done) {
      if (isExpired) {
        const currentUser = await nativeApi.getCurrentUser()
        auth.logout(currentUser.uid)
        navigate('/login', { state: { isExpired: true } })
      } else if (hasError || error) {
        notice.faild('米游社数据请求失败，请重试。若多次出现此条消息，请联系开发者反馈。')
      } else {
        notice.success('游戏状态更新成功')
      }
    }
  }

  const isToday = (e: CalenderEvent) => {
    const now = Number(String(Date.now()).slice(0, 10))
    // const now = 1627315220;
    return Number(e.end_time) > now && Number(e.start_time) < now
  }

  const getTip = async () => {
    const BirthType = '4'
    const list = await nativeApi.getCalenderList()
    const event = list.find((e) => e.kind === BirthType && isToday(e))

    if (event) {
      const now = new Date()
      const WeekMap = ['日', '一', '二', '三', '四', '五', '六']
      const timeStr = `${D(now).format('YYYY年M月D日')} 星期${WeekMap[now.getDay()]}`
      return `${timeStr} ${event.title}`
    }
    const hitokoto = await nativeApi.getHitokoto()
    return hitokoto
  }

  const init = async () => {
    setUrl(await getGachaUrl())
    updateInfo(false)
    setTip(await getTip())

    const timer = setInterval(async () => {
      updateInfo(false)
      setTip(await getTip())
    }, UPDATE_INTERVAL)

    setHeart(timer)
  }

  useEffect(() => {
    init()

    return () => {
      clearInterval(heart)
      setHeart(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const safelyNavigate = (path: string, options?: NavigateOptions) => {
    clearInterval(heart)
    setHeart(null)
    navigate(path, options)
  }

  const handleOpenGame = async () => {
    const { ok, message } = await nativeApi.openGame()
    notice[ok ? 'success' : 'faild']({ message, duration: 8000 })
  }

  const handlePageSwitch = (path: string) => {
    const noLogin = !auth.isLogin
    const isPublicPath = ['/gacha', '/strategy', '/calendar'].includes(path)
    const noAuth = noLogin && !isPublicPath

    if (noAuth) {
      notice.warning({ message: '这个功能需要登录才能正常使用' })
      return
    }

    const dailyNotOpen = path === '/calendar' && user.level < 10

    if (dailyNotOpen) {
      notice.warning({ message: '旅行者还没有达到札记开放等级（10级）' })
      return
    }

    safelyNavigate(path)
  }

  const handleWindowOpen = (link: string) => {
    notice.success({ message: '正在打开页面...', duration: 1000 })
    nativeApi.openWindow(link)
  }

  const btns = [
    {
      name: '祈愿分析',
      Icon: HiOutlineChartPie,
      handler: () => handlePageSwitch('/gacha')
    },
    {
      name: '材料日历',
      Icon: BiNotepad,
      handler: () => handlePageSwitch('/calendar')
    },
    {
      name: '小窗攻略',
      Icon: FaRegCompass,
      handler: () => handlePageSwitch('/strategy')
    },
    {
      name: '小窗地图',
      Icon: BiMap,
      handler: () => handleWindowOpen(LINK_GENSHIN_MAP)
    },
    {
      name: '传送门',
      Icon: MdOutlineLocalFireDepartment,
      handler: () => handlePageSwitch('/portal')
    },
    // {
    //   name: "米游社签到",
    //   Icon: RiCalendarCheckFill,
    //   handler: () => handlePageSwitch("/sign")
    // },
    {
      name: '冒险札记',
      Icon: MdOutlineNoteAlt,
      handler: () => handlePageSwitch('/note')
    },
    {
      name: '我的角色',
      Icon: MdOutlineAccountBox,
      handler: () => handlePageSwitch('/role')
    },
    {
      name: '游戏数据',
      Icon: HiCubeTransparent,
      handler: () => handlePageSwitch('/statistic')
    }
  ]

  // const isHomeDataLoaded = false;
  const isHomeDataLoaded = !loading && note && user && sign

  return (
    <>
      <div className={styles.container}>
        <div className={styles.user}>
          {auth.isLogin
            ? (
                isHomeDataLoaded
                  ? (
              <UserCard
                sign={sign}
                user={user}
                note={note}
                notice={notice}
                safelyNavigate={safelyNavigate}
              />
                    )
                  : (
              <Loading className={styles.loading} />
                    )
              )
            : (
            <div className={styles.noLoginContainer}>
              <div className={styles.noLoginText}>
                <span>欢迎你，旅行者。👋</span>
                <span>建议登录 「米游社」 账号以获得最佳使用体验。</span>
              </div>
              <Button
                text='前往登录'
                size='middle'
                type='confirm'
                onClick={() => safelyNavigate('/login')}
              />
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
            {url && (
              <>
                <div className={styles.topBtn} onClick={handleOpenGame}>
                  <IoGameControllerOutline size={20} />
                  <span>启动原神</span>
                </div>
                |
              </>
            )}
            <div
              className={styles.topBtn}
              onClick={() =>
                safelyNavigate('/login', {
                  state: { changeAccount: auth.isLogin }
                })
              }
            >
              {auth.isLogin
                ? (
                <>
                  <AiOutlineUserSwitch size={20} />
                  <span>切换账号</span>
                </>
                  )
                : (
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
            {/* |
            <div className={styles.topBtn} onClick={() => safelyNavigate('/about')}>
              <BiInfoCircle size={20} />
              <span>关于</span>
            </div> */}
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
          <div
            className={styles.footer}
            onClick={() => safelyNavigate('/setting', { state: { tab: 'about' } })}
          >
            「原神助手」 使用 MIT 协议开源，数据来源于
            「米游社」，可能存在延迟，请以游戏内为准，详情点此打开 「关于」 页面。
          </div>
        </div>
      </div>
      {notice.holder}
    </>
  )
}

export default Home
