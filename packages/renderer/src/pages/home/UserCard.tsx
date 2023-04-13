import cn from 'classnames'
import dayjs from 'dayjs'
import React from 'react'

import styles from './index.module.less'
import bbsIcon from '@/assets/bbs.png'
import discountIcon from '@/assets/discount.png'
import homeIcon from '@/assets/home.png'
import avatar from '@/assets/icon.png'
import prestigeIcon from '@/assets/prestige.png'
import resinIcon from '@/assets/resin.png'
import taskIcon from '@/assets/task.png'
import transformerIcon from '@/assets/transformer.png'
import nativeApi from '../../utils/nativeApi'

import type { SignInfo } from '../../../services/getBBSSignInfo'
import type { DailyNotesData } from '../../../services/getDailyNotes'
import type { GameRole } from '../../../typings'
import type { Notice } from '../../hooks/useNotice'
import type { NavigateOptions } from 'react-router-dom'

interface UserCardProp {
  safelyNavigate: (path: string, options?: NavigateOptions) => void
  note: DailyNotesData
  notice: Notice
  sign: SignInfo
  user: GameRole
}

function formatTime(seconds: number) {
  if (seconds <= 60) return `${seconds}秒`
  if (seconds <= 3600) return `${Math.ceil(seconds / 60)}分钟`

  if (seconds <= 86400) {
    const hour = `${Math.floor(seconds / 3600)}小时`
    const minute = Math.ceil((seconds % 3600) / 60)
    return hour + (minute ? `${minute}分钟` : '')
  }

  const day = `${Math.floor(seconds / 86400)}天`
  const hour = Math.ceil((seconds % 86400) / 3600)
  const timeStr = day + (hour ? `${hour}小时` : '')

  return timeStr.trim()
}

export default function UserCard(props: UserCardProp) {
  const { notice, user, sign, note, safelyNavigate } = props

  function handleCopy(str: string, msg: string) {
    nativeApi.writeClipboard(str)
    notice.success(msg)
  }

  const infos = [
    {
      key: 'nickname',
      name: '昵称',
      content: user.nickname
    },
    {
      key: 'level',
      name: '等级',
      content: `Lv.${user.level} `
    },
    {
      key: 'region',
      name: '区服',
      content: `${user.region_name} （${user.is_official ? '官服' : '渠道'}）`
    },
    {
      key: 'uid',
      name: 'UID',
      content: user.game_uid
    }
  ]

  // 处理原粹数值数据
  const isResinFull = note?.current_resin === note?.max_resin
  const resinStatus = `${note?.current_resin}/${note?.max_resin}`
  const resinTime = Number(note?.resin_recovery_time) || 0
  const targetTime = dayjs(Date.now() + resinTime * 1000).format('HH:mm:ss')
  const nextTime = formatTime(resinTime % (8 * 60))
  const isResinToday = new Date(Date.now() + resinTime * 1000).getDay() === new Date().getDay()
  const resinTimeText = `将于${isResinToday ? '今日' : '明日'} ${targetTime} `
  const resinText = `距离下次恢复还剩${nextTime}，${resinTimeText}回满（${formatTime(resinTime)}）`
  const resinTitle = isResinFull ? '树脂恢复完毕' : resinText

  // 处理洞天宝钱数据
  const isHomeOk = note?.max_home_coin !== 0
  const isHomeFull = note?.current_home_coin === note?.max_home_coin
  const homeStatus = isHomeOk ? `${note?.current_home_coin}/${note?.max_home_coin}` : '暂未开启'
  const homeTime = Number(note?.home_coin_recovery_time) || 0
  const homeTimeText = dayjs(Date.now() + homeTime * 1000).format('M月D日 HH:mm:ss')
  const homeTitle = isHomeOk
    ? isHomeFull
      ? '洞天宝钱已存满'
      : `将于 ${homeTimeText} 存满，还剩${formatTime(homeTime)}`
    : '尘歌壶功能未开启'

  // 处理每日委托数据
  const hasReceivedTask = note?.total_task_num !== 0
  const taskRate = `${note?.finished_task_num}/${note?.total_task_num}`
  const taskStatus = hasReceivedTask ? taskRate : '尚未接取'
  const isTaskDone = note?.finished_task_num === note?.total_task_num
  const doneText = isTaskDone ? '已完成' : '未完成'
  const hasReceivedReward = note?.is_extra_task_reward_received
  const extraText = hasReceivedReward ? '已领取' : '未领取'
  const taskTitle = `每日委托任务${doneText}，额外奖励${extraText}`

  // 处理周本数据
  const { remain_resin_discount_num: remain, resin_discount_num_limit: limit } = note
  const discountStatus = `${limit - remain}/${limit}`
  const isDiscountDone = remain === 0
  const discountText = isDiscountDone ? '已达上限' : `还剩 ${remain} 次`
  const discountTitle = `本周树脂消耗减半次数${discountText}`

  // 处理参量质变仪数据
  const hasTransformer = note?.transformer?.obtained
  const _ = note?.transformer?.recovery_time
  const transformerTime = _.Day * 86400 + _.Hour * 3600 + _.Minute * 60 + _.Second
  const isTransformerReady = hasTransformer && transformerTime === 0
  const formatText = _.Second > 0 ? 'M月D日 HH:mm:ss' : 'M月D日'
  const transformerReadyTime = dayjs(Date.now() + transformerTime * 1000).format(formatText)
  const transformerStatus = hasTransformer ? (isTransformerReady ? '已就绪' : '冷却中') : '暂未获得'
  const transformerTitle = isTransformerReady
    ? '已就绪'
    : `将于 ${transformerReadyTime} 可用，还剩${formatTime(transformerTime)}`

  // 处理签到数据
  const signStatus = `${sign.is_sign ? '已签到' : '未签到'}`
  const hasMiss = sign.sign_cnt_missed > 0
  const missText = hasMiss ? `错过 ${sign.sign_cnt_missed} 天` : '一天都没漏呢！'
  const signTitle = `本月累计签到 ${sign.total_sign_day} 天，${missText}`

  // 处理探索派遣
  const dispatches = (note?.expeditions || []).map((e) => {
    const done = e.status === 'Finished'
    const disDoneText = '探索派遣任务已完成，等待领取'
    const pendingText = `探险中，距离探险结束还剩${formatTime(Number(e.remained_time))}`
    const title = done ? disDoneText : pendingText
    const disAvatar = e.avatar_side_icon
    return {
      done,
      avatar: disAvatar,
      title,
      remain: Number(e.remained_time)
    }
  })

  const doneNum = dispatches.filter((e) => e.done).length
  const dispatchDetail = `探索派遣 ${doneNum}/${dispatches.length}`
  const lastDispatchTimes = dispatches.filter((e) => !e.done).sort((p, n) => n.remain - p.remain)
  const lastDispatchTime = lastDispatchTimes[0]?.remain || 0
  const todayDay = new Date(Date.now() + lastDispatchTime * 1000).getDay()
  const isDispatchToday = todayDay === new Date().getDay()
  const isDispatchAllReady = lastDispatchTime === 0
  const dispatchTime = formatTime(lastDispatchTime)
  const dispatchReadyTime = dayjs(Date.now() + lastDispatchTime * 1000).format('HH:mm:ss')
  const dispatchTimeText = (isDispatchToday ? '今日 ' : '明日 ') + dispatchReadyTime
  const dispatchTitle =
    dispatches.length > 0
      ? isDispatchAllReady
        ? '已全部完成，等待领取'
        : `将于${dispatchTimeText} 全部完成，还剩${dispatchTime}`
      : '暂未派遣任何角色'

  const notes = [
    {
      detail: `每日委托任务 ${taskStatus} ${!isTaskDone ? '◀' : ''}`,
      icon: taskIcon,
      title: taskTitle,
      ok: isTaskDone,
      name: 'task'
    },
    {
      detail: `值得铭记的强敌 ${discountStatus} ${!isDiscountDone ? '◀' : ''}`,
      icon: discountIcon,
      title: discountTitle,
      ok: isDiscountDone,
      name: 'discount'
    },
    {
      detail: `参量质变仪 ${transformerStatus} ${isTransformerReady ? '◀' : ''}`,
      icon: transformerIcon,
      title: transformerTitle,
      ok: isTransformerReady,
      name: 'transformer'
    },
    {
      detail: `米游社原神区 ${signStatus} ${!sign.is_sign ? '◀' : ''}`,
      icon: bbsIcon,
      title: signTitle,
      ok: sign.is_sign,
      name: 'sign'
    },
    {
      detail: `原粹树脂 ${resinStatus} ${isResinFull ? '◀' : ''}`,
      title: resinTitle,
      ok: isResinFull,
      icon: resinIcon,
      name: 'resin'
    },
    {
      detail: `洞天宝钱 ${homeStatus} ${isHomeFull ? '◀' : ''}`,
      title: homeTitle,
      ok: isHomeFull,
      icon: homeIcon,
      name: 'home'
    }
  ]

  return (
    <>
      <div className={styles.userCard}>
        <div className={styles.avatar}>
          <img src={avatar} className={styles.avatarImage} />
        </div>
        <div className={styles.userInfo}>
          {infos.length &&
            infos.map((e) => (
              <div
                className={styles.infoItem}
                key={e.key}
                title={e.key === 'uid' ? '点击复制 UID 到剪切板' : e.content}
              >
                <span>{e.name}：</span>
                <div
                  className={styles[e.key]}
                  onClick={
                    e.key === 'uid'
                      ? handleCopy.bind(null, e.content, '已将 UID 复制到剪切板')
                      : null
                  }
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
              onClick={() => {
                if (e.name === 'sign') {
                  safelyNavigate('/sign')
                } else {
                  notice.info(e.title)
                }
              }}
            >
              <img src={e.icon} className={cn(styles.noteIcon, styles[e.name])} />
              <div className={styles.noteDetail}>{e.detail}</div>
            </div>
          ))}
        <div
          className={styles.noteItem}
          title={dispatchTitle}
          onClick={() => notice.info(dispatchTitle)}
        >
          <div className={styles.noteDetail}>
            <img src={prestigeIcon} className={cn(styles.noteIcon)} />
            {dispatchDetail}
            {isDispatchAllReady ? ' ◀' : ''}
          </div>
        </div>
        <div className={styles.noteItem}>
          <div className={styles.noteDetail}>
            {dispatches.map((e) => (
              <div
                className={cn(styles.dispatch, e.done ? styles.done : '')}
                title={e.title}
                key={e.avatar}
                onClick={() => notice.info(e.title)}
              >
                <img src={e.avatar} className={styles.dispatchAvatar} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
