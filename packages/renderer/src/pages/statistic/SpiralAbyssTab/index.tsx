/* eslint-disable camelcase */
import dayjs from 'dayjs'
import React from 'react'

import styles from './index.module.less'
import star1 from '@/assets/star1.png'
import star2 from '@/assets/star2.png'
import star3 from '@/assets/star3.png'
import AbyssNumber from '../../../components/AbyssNumber'
import Loading from '../../../components/Loading'
import NumberDescription from '../../../components/NumberDescription'
import RoleNumber from '../../../components/RoleNumber'

import type { SpiralAbyssData } from '../../../../services/getSpiralAbyss'

interface SpiralAbyssProp {
  data: SpiralAbyssData
}

function formatTime(timestamp: string) {
  return dayjs(Number(timestamp) * 1000).format('YYYY/MM/DD HH:mm')
}

const starMap = ['', star1, star2, star3]

export default function SpiralAbyss(props: SpiralAbyssProp) {
  const {
    data: {
      schedule_id,
      is_unlock,
      floors,
      max_floor,
      total_star,
      start_time,
      end_time,
      total_win_times,
      total_battle_times,
      damage_rank,
      defeat_rank,
      normal_skill_rank,
      energy_skill_rank,
      take_damage_rank
    }
  } = props

  const hasData = start_time && is_unlock && total_battle_times !== 0
  const period = `${formatTime(start_time)} ~ ${formatTime(end_time)}`
  const succRate = Math.round((total_win_times / total_battle_times) * 100)
  const [floor, zone] = max_floor.split('-').map(Number)

  const map = ['最强一击', '最多击败', '最多元素战技', '最多元素爆发', '最多承伤']

  const ranks = [damage_rank, defeat_rank, normal_skill_rank, energy_skill_rank, take_damage_rank]

  const roleNums = ranks.map((e, i) => ({
    avatar: e.length > 0 ? e[0].avatar_icon : '',
    value: e.length > 0 ? e[0].value : 0,
    description: map[i]
  }))

  return (
    <div className={styles.spiralAbyss}>
      {hasData ? (
        <>
          <div className={styles.row}>
            <AbyssNumber values={[floor, zone]} description='本期最深抵达' />
            <NumberDescription value={total_star} description='本期获星' sub='/36' />
            <NumberDescription value={total_battle_times} description='本期战斗次数' />
            <NumberDescription value={total_win_times} description='本期完成次数' />
            <NumberDescription value={succRate} description='本期完成率' sub='%' />
            {roleNums.map((e) => (
              <RoleNumber key={e.description} {...e} />
            ))}
          </div>

          <div className={styles.detail}>
            {floors.length > 0 ? (
              floors
                .sort((a, b) => b.index - a.index)
                .slice(0, 4)
                .map((e) => (
                  <div key={e.index} className={styles.abyssItem}>
                    <div className={styles.abyssIndex}>
                      <div>
                        <span>第</span>
                        <span>{e.index}</span>
                        <span>层</span>
                      </div>
                    </div>
                    <div className={styles.zones}>
                      {e.levels.map((f) => {
                        const [start, end] = f.battles.map((g) =>
                          dayjs(Number(g.timestamp) * 1000).format('M月D日 HH:mm')
                        )

                        return (
                          <div className={styles.zone} key={f.index}>
                            <div className={styles.stars}>
                              <div>第 {f.index} 间</div>
                              <div>
                                <img src={starMap[f.star]} className={styles.star} />
                                {start && <span>上半：{start}</span>}
                                {end && <span>下半：{end}</span>}
                              </div>
                            </div>
                            <div className={styles.roles}>
                              {f.battles.map((g) => (
                                <div className={styles.rolesRow} key={g.index}>
                                  {g.avatars.map((h) => {
                                    const backgroundColor = h.rarity === 4 ? '#9677b3' : '#c08d4b'
                                    return (
                                      <img src={h.icon} key={h.id} style={{ backgroundColor }} />
                                    )
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
            ) : (
              <Loading isEmpty style={{ height: '100%' }} text='TA 好像还没有开始打深境螺旋' />
            )}
          </div>
          <div className={styles.tip}>{`统计周期：${period} （总第 ${schedule_id} 期）`}</div>
        </>
      ) : (
        <span className={styles.none}>暂无当期数据</span>
      )}
    </div>
  )
}
