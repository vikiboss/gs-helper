import React, { useState } from 'react'
import cn from 'classnames'

import type { Notice } from '../../../hooks/useNotice'
import type { CalenderEvent } from '../../../../services/getCalenderList'

import styles from './index.less'

type Type = 'roles' | 'weapons' | 'materials'

interface DailyProp {
  cals: CalenderEvent[]
  notice: Notice
}

const WeekMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const Types: { title: string; name: Type }[] = [
  { title: '按素材查看', name: 'materials' },
  { title: '按角色查看', name: 'roles' },
  { title: '按武器查看', name: 'weapons' }
]

const Tips = [
  '「周日」 所有秘境均开放，所有材料均可获取。',
  '「周一」 与 「周四」 开放的秘境和可获取的材料相同。',
  '「周二」 与 「周五」 开放的秘境和可获取的材料相同。',
  '「周三」 与 「周六」 开放的秘境和可获取的材料相同。',
  '「周一」 与 「周四」 开放的秘境和可获取的材料相同。',
  '「周二」 与 「周五」 开放的秘境和可获取的材料相同。',
  '「周三」 与 「周六」 开放的秘境和可获取的材料相同。'
]

function getUniqueArray(arr: any[], key: string) {
  const set = new Set()
  const results: CalenderEvent[] = []

  arr.forEach((e) => {
    if (!set.has(e[key])) {
      set.add(e[key])
      results.push(e)
    }
  })

  return results
}

const MATERIAL_TYPE = '2'
const WEAPON_TYPE = '1'

function getMaterialList(list: CalenderEvent[]) {
  const kind2 = list.filter((event) => event.kind === MATERIAL_TYPE)

  const materials: CalenderEvent[] = []

  kind2.forEach((e) => {
    const infos = e.contentInfos
    const len = infos.length

    if (len) {
      const talent = infos.find((f) => f.title.includes('哲学'))
      const item = infos[0].title.includes('「') ? talent : infos[len - 1]
      const title = `${item.title.slice(0, 4)}系列`
      materials.push({ ...e, title, img_url: item.icon })
    }
  })

  return getUniqueArray(materials, 'title')
}

export default function DailyMaterial({ cals, notice }: DailyProp) {
  const todayWeek = new Date().getDay()
  const [type, setType] = useState<Type>('roles')
  const [week, setWeek] = useState<number>(todayWeek)

  function sort(p: CalenderEvent, n: CalenderEvent) {
    return JSON.parse(p.sort || '{"0": 999}')[0] - JSON.parse(n.sort || '{"0": 999}')[0]
  }

  // 角色
  const roles = cals.filter((e) => e.break_type === MATERIAL_TYPE)
  roles.sort(sort)

  // 武器
  const weapons = cals.filter((e) => e.break_type === WEAPON_TYPE)
  weapons.sort(sort)

  // 材料
  const materials = getMaterialList(cals)
  materials.sort(sort)

  const EventMap: Record<string, CalenderEvent[]> = { roles, weapons, materials }

  const isToday = (arr: string[]) => arr.includes(String(((week + 6) % 7) + 1))
  const list = EventMap[type].filter((e) => isToday(e.drop_day))

  function handleItemClick(e: CalenderEvent) {
    let message =
      type === 'roles'
        ? `「${e.title}」 天赋培养需要`
        : type === 'weapons'
        ? `「${e.title}」 突破需要`
        : ''

    const contents = ` ${e.contentInfos[0]?.title.slice(0, 4)} 系列`

    message += type !== 'materials' ? contents : e.title
    message += `，可在 「${e.contentSource[0]?.title || '忘却之峡'}」 获取`

    notice.success(message)
  }

  const todayClass = cn(styles.btn, todayWeek === week ? styles.active : '')

  return (
    <div className={styles.content}>
      <div className={styles.contentTop}>
        <div className={styles.weeks}>
          <div className={todayClass} onClick={() => setWeek(todayWeek)}>
            今日
          </div>
          <span>|</span>
          {WeekMap.map((e, i) => {
            const className = cn(styles.btn, i === week ? styles.active : '')
            return (
              <div key={e} className={className} onClick={() => setWeek(i)}>
                {e}
              </div>
            )
          })}
        </div>
        <div className={styles.types}>
          {Types.map((e) => {
            const className = cn(styles.btn, e.name === type ? styles.active : '')
            return (
              <div key={e.name} className={className} onClick={() => setType(e.name)}>
                {e.title}
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.main}>
        {list.map((e) => (
          <div key={e.title} onClick={() => handleItemClick(e)}>
            <img src={e.img_url} />
            <span>{e.title}</span>
          </div>
        ))}
      </div>
      <span className={styles.tip}>
        ※ {Tips[week]}
        秘境在每天的凌晨四点刷新，若当前时间超过零点但未过凌晨四点，请以前一日数据为准。
      </span>
    </div>
  )
}
