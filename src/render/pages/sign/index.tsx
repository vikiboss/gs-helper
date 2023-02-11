import React, { useState } from 'react'
import cn from 'classnames'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

import CircleButton from '../../components/CircleButton'
import Loading from '../../components/Loading'
import nativeApi from '../../utils/nativeApi'
import useMount from '../../hooks/useMount'
import useNotice from '../../hooks/useNotice'
import withAuth from '../../auth/withAuth'

import type { SignData } from '../../../services/getBBSSignData'
import type { SignInfo } from '../../../services/getBBSSignInfo'

import styles from './index.less'

export const DefaultSignData: SignData = {
  month: 1,
  awards: [],
  resign: true
}

export const DefaultSignInfo: SignInfo = {
  total_sign_day: 0,
  today: '2022-01-01',
  is_sign: false,
  first_bind: false,
  is_sub: false,
  month_first: false,
  sign_cnt_missed: 0
}

export default withAuth(function Sign() {
  const navigate = useNavigate()
  const notice = useNotice()
  const [signInfo, setSignInfo] = useState<SignInfo>(DefaultSignInfo)
  const [signData, setSignData] = useState<SignData>(DefaultSignData)

  const { month } = signData
  const { total_sign_day: total, sign_cnt_missed: missed } = signInfo

  useMount(updateInfo)

  async function updateInfo() {
    try {
      const [{ data: signData }, { data: info }] = await Promise.all([
        nativeApi.getBBSSignData(),
        nativeApi.getBBSSignInfo()
      ])

      if (!signData.month || !info.today) {
        return
      }

      setSignData(signData)
      setSignInfo(info)
    } catch (e) {
      const isOffline = e?.message?.includes('getaddrinfo')
      const msg = isOffline ? '网络状况不佳，请检查后重试 T_T' : '加载超时，请检查网络连接 T_T'
      notice.failed(msg)
    }
  }

  async function handleSign() {
    if (signInfo.is_sign) {
      return notice.warning('今天已经签过到啦~ 不要重复签到哦')
    }

    return notice.success('由于米游社限制，签到功能不再维护，请前往米游社手动签到')
  }

  function handleInfo(i: number) {
    const signed = i + 1 <= total
    const signText = signed ? '奖励已领取' : '未达到领取要求'
    const message = `本月累签 ${i + 1} 天可领取，当前 ${total} 天，${signText}`
    notice[signed ? 'success' : 'failed'](message)
  }

  return (
    <>
      <div className={styles.container}>
        {signData.awards.length ? (
          <div className={styles.signContainer}>
            <div className={styles.title}>{`米游社·原神 ${month} 月签到日历`}</div>
            <div className={styles.tip}>
              今日{signInfo.is_sign ? '已签' : '未签'}，签到进度：{total}/{signData.awards.length}
              {missed
                ? `，错过 ${missed} 天。冒险再忙，也要记得签到哦~`
                : '。旅行者太勤奋啦，一天都没有漏呢！'}
            </div>
            <div className={styles.signTable}>
              {signData.awards.map((e, i) => {
                const signedClass = i + 1 <= total ? styles.signed : ''
                const todayNum = signInfo.is_sign ? i + 1 : i
                const isToday = todayNum === total
                const todayClass = isToday ? styles.today : ''
                return (
                  <div
                    title={`本月累签 ${i + 1} 天可领取，当前 ${total} 天`}
                    key={e.name + i}
                    className={cn(styles.signItem, signedClass, todayClass)}
                    onClick={isToday ? handleSign : handleInfo.bind(null, i)}
                  >
                    <img src={e.icon} />
                    <div>{`${e.name}x${e.cnt}`}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <Loading />
        )}
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={navigate.bind(null, '/')}
        />
      </div>
      {notice.holder}
    </>
  )
})
