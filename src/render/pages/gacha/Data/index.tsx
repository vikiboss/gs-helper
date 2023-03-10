import cn from 'classnames'
import React, { useState } from 'react'

import styles from './index.less'
import { GachaMap } from '..'
import { NormalItemList } from '../../../../constants'
import useMount from '../../../hooks/useMount'
import nativeApi from '../../../utils/nativeApi'
import getListByType from '../utils/getListByType'

import type { PageProp } from '..'
import type { CalendarEvent } from '../../../../services/getCalendarList'
import type { GachaData, GachaType } from '../../../../typings'

type TableRow = '3' | '4' | '5' | '合计'
type TableColumn = GachaType | '合计'

export default function Data({ gacha, notice }: PageProp) {
  const [CalendarList, setCalendarList] = useState<CalendarEvent[]>([])

  useMount(() => {
    ;(async function () {
      try {
        const { data } = await nativeApi.getCalendarEvents()

        if (data?.list.length > 0) {
          setCalendarList(data.list)
        }
      } catch (e) {
        const isOffline = e?.message?.includes('getaddrinfo')
        const msg = isOffline ? '网络状况不佳，请检查后重试 T_T' : '加载超时，请检查网络连接 T_T'
        notice.failed(msg)
      }
    })()
  })

  function getGachaNumsAndRates(rank: TableRow, type: TableColumn) {
    const isAllStar = rank === '合计'
    const isAllType = type === '合计'
    const starList = isAllStar ? gacha.list : gacha.list.filter((e) => e.rank_type === rank)
    const gachaList = isAllType ? gacha.list : getListByType(gacha.list, type)
    const itemList = isAllType ? starList : getListByType(starList, type)
    return `${itemList.length} / ${((itemList.length * 100) / (gachaList.length || 1)).toFixed(2)}%`
  }

  function getPoolsNamesByList(list: GachaData['list']) {
    const data: { title: string; name: GachaType; list: { name: string; times: number }[] }[] = [
      { title: '角色池', name: 'activity', list: [] },
      { title: '武器池', name: 'weapon', list: [] },
      { title: '常驻池', name: 'normal', list: [] },
      { title: '新手池', name: 'newer', list: [] }
    ]
    ;['activity', 'normal', 'weapon', 'newer'].forEach((type: GachaType) => {
      const filteredList = getListByType(list, type)
      for (const [i, e] of filteredList.entries()) {
        if (e.rank_type === '5') {
          const target = data.filter((f) => f.name === type)[0]
          if (target) {
            const len = target.list.length
            const offset = len ? target.list.reduce((p, n) => p + n.times, 0) : 0
            target.list.push({ name: e.name, times: i + 1 - offset })
          }
        }
      }
    })

    return data.filter((e) => e.list.length > 0)
  }

  const pools = getPoolsNamesByList(gacha.list)

  return (
    <div className={styles.content}>
      <div>
        <div>
          <div className={styles.tableName}>〓出货数、出货率〓</div>
          <div className={styles.detailTable}>
            <div>
              <div className={styles.head}>出货数 / 率</div>
              <div className={styles.head}>角色池</div>
              <div className={styles.head}>武器池</div>
              <div className={styles.head}>常驻池</div>
              <div className={styles.head}>新手池</div>
              <div className={styles.head}>合计</div>
            </div>
            {['5', '4', '3', '合计'].map((e: TableRow) => (
              <div key={e}>
                <div className={styles.head}>{e === '合计' ? e : `${e}星`}</div>
                {[...Object.keys(GachaMap), '合计'].map((f: TableColumn) => (
                  <div className={cn(styles[`star${e}`], styles.star)} key={f}>
                    {getGachaNumsAndRates(e, f)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {CalendarList.length > 0 ? (
          <div>
            <div className={styles.poolName}>〓五星出货详情〓</div>
            {pools.length > 0 ? (
              pools.map((e) => (
                <div key={e.title} className={styles.poolList}>
                  <div>
                    <span>{e.title}</span>
                    <span>
                      {e.list.filter((f) => NormalItemList.includes(f.name)).length}
                      {e.name !== 'normal' &&
                        `+${e.list.filter((f) => !NormalItemList.includes(f.name)).length}`}
                    </span>
                  </div>
                  <div>
                    {e.list.map((item, i) => {
                      const role = CalendarList.filter((f) => f.title === item.name)[0]

                      function showDetail(
                        _item: { name: string; times: number },
                        isLimit: boolean
                      ) {
                        const pn = _item.times * 160
                        const name = (isLimit ? '限定五星' : '五星') + _item.name
                        const msg = `${name}，累计消耗 ${_item.times} 次祈愿，价值 ${pn} 原石`
                        notice.success(msg)
                      }

                      const isLimit = !NormalItemList.includes(item.name)

                      function getColor(times: number) {
                        if (times > 72) {
                          return 'red'
                        }

                        if (times > 60) {
                          return 'orange'
                        }

                        return 'green'
                      }

                      const style = getColor(item.times)

                      return (
                        <div
                          onClick={() => showDetail(item, isLimit)}
                          title={item.name}
                          key={item.name + i}
                          className={styles.avatar}
                        >
                          <img key={item.name + i} src={role?.img_url} alt={item.name} />
                          <span className={styles[style]}>{item.times}</span>
                          {isLimit && <span>限定</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.tip}>暂无五星数据</div>
            )}
          </div>
        ) : (
          <div className={styles.tip}>正在获取角色图片...</div>
        )}
      </div>
    </div>
  )
}
