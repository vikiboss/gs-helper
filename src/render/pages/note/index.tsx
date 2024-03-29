import React, { useState } from 'react'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

import styles from './index.less'
import Pie from './Pie'
import mora from '../../../assets/mora.png'
import primogem from '../../../assets/primogem.png'
import { getGreetingMsg } from '../../../utils/getGreetingMsg'
import { wait } from '../../../utils/utils'
import withAuth from '../../auth/withAuth'
import BounceNumber from '../../components/BounceNumber'
import CircleButton from '../../components/CircleButton'
import Loading from '../../components/Loading'
import SelectButton from '../../components/SelectButton'
import useMount from '../../hooks/useMount'
import useNotice from '../../hooks/useNotice'
import nativeApi from '../../utils/nativeApi'

import type { MonthInfo } from '../../../services/getMonthInfo'

export default withAuth(function Month() {
  const navigate = useNavigate()
  const notice = useNotice()
  const [initMonth, setInitMonth] = useState<number>(0)
  const [month, setMonth] = useState<number>(0)
  const [monthInfos, setMonthInfos] = useState<MonthInfo[]>([])

  useMount(init)

  async function init() {
    try {
      const { data: initMonthData } = await nativeApi.getMonthInfo()

      setInitMonth(initMonthData.data_month)
      setMonth(initMonthData.data_month)

      const data: MonthInfo[] = []
      const months = initMonthData.optional_month

      months.forEach(async (e, i) => {
        await wait(1000)

        const { data: res } = await nativeApi.getMonthInfo(e)

        if (res) {
          data.push(res)

          if (i + 1 === months.length) {
            setMonthInfos(data)
          }
        } else {
          notice.failed('网络异常，部分月份数据获取失败，请重试')
        }
      })
    } catch (e) {
      const isOffline = e?.message?.includes('getaddrinfo')
      const msg = isOffline ? '网络状况不佳，请检查后重试 T_T' : '加载超时，请检查网络连接 T_T'
      notice.failed(msg)
    }
  }

  const initData = monthInfos.find((e) => e.data_month === initMonth)

  function main(initData: MonthInfo) {
    const monthInfo = monthInfos.find((e) => e.data_month === month)

    const monthData = monthInfo.month_data
    const pSign = monthData.primogems_rate >= 0
    const mSign = monthData.mora_rate >= 0

    const greeting = getGreetingMsg(undefined, true)

    const diffMessage = `，相比上月 ${pSign ? '+' : '-'}${Math.abs(monthData.primogems_rate)}%`

    return (
      <>
        <div className={styles.title}>冒险札记</div>
        <div className={styles.content}>
          <div className={styles.greeting}>
            {initData.nickname}，{greeting}
          </div>
          <div className={styles.today}>
            <div className={styles.itemBg}>
              <span>今日</span>
              <div className={styles.item}>
                <img src={primogem} />
                <BounceNumber
                  number={initData.day_data.current_primogems}
                  wrapperStyle={{ width: '40px' }}
                />
                <img src={mora} />
                <BounceNumber
                  number={initData.day_data.current_mora}
                  wrapperStyle={{ width: '80px' }}
                />
              </div>
            </div>
            <div className={styles.itemBg}>
              <span>昨日</span>
              <div className={styles.item}>
                <img src={primogem} />
                <BounceNumber
                  number={initData.day_data.last_primogems}
                  wrapperStyle={{ width: '40px' }}
                />
                <img src={mora} />
                <BounceNumber
                  number={initData.day_data.last_mora}
                  wrapperStyle={{ width: '80px' }}
                />
              </div>
            </div>
          </div>

          <div className={styles.filter}>
            {initData.optional_month.length === 0 ? (
              <span>暂无数据</span>
            ) : (
              <SelectButton
                value={month}
                changeItem={setMonth}
                items={initData.optional_month.map((e) => ({ label: `${e}月`, value: e }))}
              />
            )}
          </div>

          <div className={styles.monthContent}>
            <div>
              <div className={styles.monthTitle}>{monthInfo.data_month}月冒险札记</div>
              <div className={styles.monthDesc}>当月累计获取资源</div>
              <div className={styles.monthItem}>
                <img src={primogem} />
                <BounceNumber
                  number={monthData.current_primogems}
                  wrapperStyle={{ width: '80px' }}
                />
                <span>
                  相当于 {Math.floor(monthData.current_primogems / 160)} 次祈愿
                  {monthData.last_primogems > 0 && diffMessage}
                </span>
              </div>
              <div className={styles.monthItem}>
                <img src={mora} />
                <BounceNumber number={monthData.current_mora} wrapperStyle={{ width: '80px' }} />
                {monthData.last_mora > 0 && (
                  <span>
                    相比上月 {mSign ? '+' : '-'}
                    {Math.abs(monthData.mora_rate)}%
                  </span>
                )}
              </div>
            </div>
            <div>
              <Pie
                data={monthData.group_by.map((e) => ({
                  id: e.action,
                  value: e.num
                }))}
                width={480}
                height={240}
              />
            </div>
          </div>
          <div className={styles.tip}>
            ※ 仅统计 「充值途径」 之外获取的资源，可能存在延迟，请以游戏内为准，此处仅供参考。
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={styles.container}>
        {monthInfos.length ? main(initData) : <Loading />}

        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={() => navigate('/')}
        />
      </div>
      {notice.holder}
    </>
  )
})
