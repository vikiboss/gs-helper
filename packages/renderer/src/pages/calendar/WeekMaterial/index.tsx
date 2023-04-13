import React, { useState } from 'react'

import styles from './index.module.less'
import SelectButton from '@/components/SelectButton'

import type { Notice } from '@/hooks/useNotice'

interface WeekItem {
  icon: string
  name: string
}

interface Nomal extends WeekItem {
  drop: number[]
  domain: WeekItem
}

interface Advance extends WeekItem {
  domain: WeekItem
}

interface Talent {
  advance: Advance
  nomal: Nomal
}

interface Material {
  talent: Talent
}

interface Avatar {
  basic: string
  side: string
  full: string
}

interface Poster {
  mobile: string
}

interface WeekBaseRole {
  name: string
  enname: string
  element: string
  rarity: number
  avatar: Avatar
  poster: Poster
}

export interface RepoRole extends WeekBaseRole {
  material: Material
}

interface WeekMaterialProp {
  notice: Notice
  roles: RepoRole[]
}

interface WeekMaterial extends WeekItem {
  roles: WeekBaseRole[]
}

interface WeekBoss extends WeekItem {
  materials: WeekMaterial[]
}

export default function WeekMaterial({ roles }: WeekMaterialProp) {
  const [idx, setIdx] = useState(0)

  // 所有材料对应的周本 Boss（包含重复项）
  const allBosses = roles.map((e) => e.material.talent.advance.domain)
  // Boss 去重
  const bosses = allBosses.filter((e, i) => allBosses.findIndex((f) => f.name === e.name) === i)

  // 所有材料（包含重复项）
  const all = roles.map((e) => e.material.talent.advance)
  // 材料去重
  const materials = all.filter((e, i) => all.findIndex((f) => f.name === e.name) === i)

  const list: WeekBoss[] = bosses.map((boss) => {
    const matchMaterials: WeekMaterial[] = materials
      .filter((material) => material.domain.name === boss.name)
      .map((material) => {
        const matchRoles = roles.filter(
          (role) => role.material.talent.advance.name === material.name
        )

        return { ...material, roles: matchRoles }
      })

    return { ...boss, materials: matchMaterials }
  })

  return (
    <div className={styles.weekMaterial}>
      <div className={styles.top}>
        <SelectButton
          style={{ height: '28px' }}
          value={idx}
          changeItem={setIdx}
          items={list.map((e, i) => ({ label: e.name, value: i }))}
        />
      </div>

      <div className={styles.bossItem}>
        <div>
          <img src={list[idx]?.icon} />
        </div>
        <div>
          {list[idx]?.materials.map((e) => (
            <div key={e.name} className={styles.materialItem}>
              <div>
                <img src={e.icon} />
                <span>{e.name}</span>
              </div>
              <div>
                {e.roles.map((f) => (
                  <div key={f.name} className={styles.role}>
                    <img src={f.avatar.full} title={f.name} />
                    <span>{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className={styles.tip}>
        ※
        每周有三次挑战「值得铭记的强敌」并在收取奖励时树脂消耗减半的次数，不同的角色升级高级天赋时需要这些对应的周本材料
      </span>
    </div>
  )
}
