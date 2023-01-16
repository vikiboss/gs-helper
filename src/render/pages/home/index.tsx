import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { AiOutlineUserSwitch, AiOutlineUserAdd } from 'react-icons/ai'
import { BiNotepad, BiMap } from 'react-icons/bi'
import { FaRegCompass } from 'react-icons/fa'
import { HiOutlineChartPie, HiCubeTransparent } from 'react-icons/hi'
import { IoMdRefresh } from 'react-icons/io'
import { IoGameControllerOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineLocalFireDepartment, MdOutlineAccountBox, MdOutlineNoteAlt } from 'react-icons/md'

import { LINK_GENSHIN_MAP } from '../../../constants'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import nativeApi from '../../utils/nativeApi'
import useApi from '../../hooks/useApi'
import useAuth from '../../hooks/useAuth'
import useMount from '../../hooks/useMount'
import useNotice from '../../hooks/useNotice'
import UserCard from './UserCard'

import type { BaseRes, GameRole } from '../../../typings'
import type { CalenderEvent } from '../../../services/getCalenderList'
import type { DailyNotesData } from '../../../services/getDailyNotes'
import type { SignInfo } from '../../../services/getBBSSignInfo'

import styles from './index.less'

const { getGameRoleInfo, getBBSSignInfo, getDailyNotes, getGachaUrl } = nativeApi

export default function Home() {
  const auth = useAuth()
  const notice = useNotice()
  const navigate = useNavigate()
  const [tip, setTip] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const { r: getUser, d: user, l: l1 } = useApi<GameRole | null>(getGameRoleInfo)
  const { r: getSign, d: sign, l: l2 } = useApi<BaseRes<SignInfo> | null>(getBBSSignInfo)
  const { r: getNote, d: note, l: l3 } = useApi<BaseRes<DailyNotesData> | null>(getDailyNotes)

  const loading = l1 || l2 || l3

  // let first = true

  async function updateInfo() {
    if (!auth.isLogin) {
      return
    }

    if (loading) {
      notice.warning({
        message: '小派蒙正在努力加载，请不要重复点击啦！',
        autoHide: false
      })

      return
    }

    // const { isDev } = await nativeApi.getAppInfo()

    // if (isDev && first) {
    //   first = false
    //   return
    // }

    const [user] = await Promise.all([getUser(), getSign()])

    const note = await getNote()

    const isExpired = !user || !user?.game_uid
    const meetCaptcha = (note as BaseRes<DailyNotesData>).retcode === 1034

    if (isExpired) {
      const currentUser = await nativeApi.getCurrentUser()

      auth.logout(currentUser.uid)

      navigate('/login', { state: { isExpired: true } })
    } else if (meetCaptcha) {
      notice.failed('无法绕过验证码，请到米游社战绩页验证后重试')
    }
  }

  function isToday(e: CalenderEvent) {
    const now = Number(String(Date.now()).slice(0, 10))
    // const now = 1627315220;
    return Number(e.end_time) > now && Number(e.start_time) < now
  }

  async function getTip() {
    const BirthType = '4'

    const { data } = await nativeApi.getCalenderEvents()
    const event = data?.list.find((e) => e.kind === BirthType && isToday(e))

    if (event) {
      const now = new Date()
      const WeekMap = ['日', '一', '二', '三', '四', '五', '六']
      const timeStr = `${dayjs(now).format('YYYY年M月D日')} 星期${WeekMap[now.getDay()]}`
      return `${timeStr} ${event.title}`
    }

    return await nativeApi.getHitokoto()
  }

  useMount(async () => {
    setUrl(await getGachaUrl())
    await updateInfo()
    setTip(await getTip())
  })

  async function handleOpenGame() {
    const { code, message } = await nativeApi.openGame()
    notice[code === 0 ? 'success' : 'failed']({ message, duration: code === 0 ? 8000 : 3000 })
  }

  function handlePageSwitch(path: string) {
    const noLogin = !auth.isLogin
    const isPublicPath = ['/gacha', '/strategy', '/calendar', '/portal'].includes(path)
    const noAuth = noLogin && !isPublicPath

    if (noAuth) {
      notice.warning('这个功能需要登录才能正常使用')
      return
    }

    const isNote = path === '/note'

    const notNotOpen = isNote && (user?.level ?? 1) < 10

    if (notNotOpen) {
      notice.warning('旅行者还没有达到札记开放等级（10级）')
      return
    }

    navigate(path)
  }

  function handleWindowOpen(link: string) {
    notice.success({ message: '正在打开页面...', duration: 1000 })
    nativeApi.openWindow(link)
  }

  async function handleTipClick() {
    setTip('loading...')

    setTip(await nativeApi.getHitokoto())
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
  const isHomeDataLoaded = !loading && note?.data && user && sign?.data

  return (
    <>
      <div className={styles.container}>
        <div className={styles.user}>
          {auth.isLogin ? (
            isHomeDataLoaded ? (
              <UserCard
                sign={sign.data}
                user={user}
                note={note.data}
                notice={notice}
                safelyNavigate={navigate}
              />
            ) : (
              <Loading className={styles.loading} />
            )
          ) : (
            <div className={styles.noLoginContainer}>
              <div className={styles.noLoginText}>
                <span>欢迎你，旅行者。👋</span>
                <span>登录 「米游社」 账号以获得最佳使用体验。</span>
              </div>
              <Button
                text='前往登录'
                size='middle'
                type='confirm'
                onClick={() => navigate('/login')}
              />
            </div>
          )}
          <div className={styles.topGreeting} title={tip} onClick={handleTipClick}>
            {tip}
          </div>
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
                navigate('/login', {
                  state: { changeAccount: auth.isLogin }
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
            <div className={styles.topBtn} onClick={() => navigate('/setting')}>
              <IoSettingsOutline size={20} />
              <span>设置</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.searchBar}></div>
          <div className={styles.btnList}>
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
            onClick={() => navigate('/setting', { state: { tab: 'about' } })}
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
