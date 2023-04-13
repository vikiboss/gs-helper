import cn from 'classnames'
import React, { useMemo } from 'react'

import styles from './index.module.less'
import getAverageTimes from '../utils/getAverageTimes'
import getGachaStatistics from '../utils/getGachaStatistics'
import getLuckInfo from '../utils/getLuckInfo'
import getMostInfo from '../utils/getMostInfo'
import transformGachaDataDate from '../utils/transformGachaDataDate'

import type { PageProp } from '..'

const LevelMap = ['虚位以待', '欧皇就是我', '运气还不错', '==平==', '有点非啊', '纯纯非洲人']

export default function Overview({ gacha }: PageProp) {
  const MostInfo = useMemo(() => getMostInfo(gacha), [gacha])
  const statistics = useMemo(() => getGachaStatistics(gacha), [gacha])
  const luckInfo = useMemo(() => getLuckInfo(gacha), [gacha])
  const limitRoleTimes = useMemo(() => getAverageTimes(gacha, 'role'), [gacha])
  const limitWeaponTimes = useMemo(() => getAverageTimes(gacha, 'weapon'), [gacha])
  const dateInfo = transformGachaDataDate(gacha.list)
  const maxTimes = Math.max(...dateInfo.map((e) => e.value))
  const days = dateInfo.filter((e) => e.value === maxTimes)
  const maxDay = days.length && days[days.length - 1].day

  // // 抽卡期望 62 抽
  function getLevel(times: number) {
    switch (true) {
      case times >= 72:
        return 5
      case times >= 64:
        return 4
      case times >= 60:
        return 3
      case times >= 52:
        return 2
      case times >= 1:
        return 1
      default:
        return 0
    }
  }

  const updateTime = gacha.info.update_time

  return (
    <div className={styles.content}>
      <div className={styles.tip}>上次数据更新时间：{updateTime}</div>
      <div className={styles.cards}>
        {statistics.map((e) => (
          <div key={e.name} className={cn(styles.luck, styles[`luck-${getLevel(e.times)}`])}>
            <div className={cn([styles.name, styles[e.name]])}>{e.name}</div>
            <div className={styles.summary}>
              <div className={styles.count}>{e.times}</div>
              <div className={styles.title}>{LevelMap[getLevel(e.times)]}</div>
            </div>
            <div className={styles.tags} key={e.name}>
              {e.unluckyDays > 0 && (
                <span className={styles.tag}>{`已垫 ${e.unluckyDays} 抽`}</span>
              )}
              {e.unluckyDays_4 > 0 && (
                <span className={styles.tag}>{`已 ${e.unluckyDays_4} 抽未出紫`}</span>
              )}
              <span className={styles.tag}>{e.all ? `共计 ${e.all} 抽` : '从未抽过'}</span>
              <span className={styles.tag}>{e.number ? `已出 ${e.number} 金` : '至今未出金'}</span>
              {e.times > 0 && <span className={styles.tag}>{`平均每金 ${e.times} 抽`}</span>}{' '}
              {e.times > 0 && (
                <span className={styles.tag}>{`平均每金 ${e.times * 160} 原石`}</span>
              )}
              <span className={styles.tag}>{e.comment}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.desc}>
        <div>
          <div>
            {'※ 经历 '}
            <span className={styles.star3}>{luckInfo.count}</span>
            {' 次小保底，歪了 '}
            <span className={styles.star4}>{luckInfo.miss}</span>
            {' 次，歪的概率：'}
            <span className={styles.star5}>{luckInfo.rate}%</span>
          </div>
          {limitRoleTimes > 0 ? (
            <div>
              {'※ 平均每个'}
              <span className={styles.star4}>{'限定五星角色'}</span>
              {'消耗 '}
              <span className={styles.star5}>{Math.round(limitRoleTimes * 160)}</span>
              {' 原石（'}
              <span className={styles.star5}>{limitRoleTimes}</span>
              {' 抽）'}
            </div>
          ) : (
            <div>
              ※ 暂未获得<span className={styles.star4}>{'限定五星角色'}</span>
            </div>
          )}

          {limitWeaponTimes > 0 ? (
            <div>
              {'※ 平均每把'}
              <span className={styles.star4}>{'限定五星武器'}</span>
              {'消耗 '}
              <span className={styles.star5}>{Math.round(limitWeaponTimes * 160)}</span>
              {' 原石（'}
              <span className={styles.star5}>{limitWeaponTimes}</span>
              {' 抽）'}
            </div>
          ) : (
            <div>
              ※ 暂未获得<span className={styles.star4}>{'限定五星武器'}</span>
            </div>
          )}

          {gacha.list.length > 0 ? (
            <div>
              {'※ 共计祈愿 '}
              <span className={styles.star4}>{gacha.list.length}</span>
              {' 次，价值 '}
              <span className={styles.star5}>{gacha.list.length * 160}</span>
              {' 原石'}
            </div>
          ) : (
            <div>※ 没有祈愿记录</div>
          )}
        </div>
        <div>
          {MostInfo.unluckest.valid && (
            <span className={styles.item} style={{ backgroundColor: '#505a6d' }}>
              最非酋的五星：{MostInfo.unluckest.name}，{MostInfo.unluckest.count} 发才出
            </span>
          )}
          {MostInfo.luckest.valid && (
            <span className={styles.item} style={{ backgroundColor: '#e4b44d' }}>
              最欧皇的五星：{MostInfo.luckest.name}，{MostInfo.luckest.count} 发就出啦
            </span>
          )}
          {MostInfo.predestined.valid && MostInfo.predestined.count >= 2 && (
            <span className={styles.item} style={{ backgroundColor: '#8ab648' }}>
              最有缘的五星：{MostInfo.predestined.name}，重复抽到 {MostInfo.predestined.count} 次
            </span>
          )}
          {maxTimes >= 10 && (
            <span className={styles.item} style={{ backgroundColor: '#9d78d2' }}>
              最疯狂的一天：{maxDay}，这天一共抽了 {maxTimes} 次!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
