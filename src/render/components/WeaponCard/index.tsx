import cn from 'classnames'
import React from 'react'

import styles from './index.less'
import star1 from '../../../assets/star1.png'
import star2 from '../../../assets/star2.png'
import star3 from '../../../assets/star3.png'
import star4 from '../../../assets/star4.png'
import star5 from '../../../assets/star5.png'

import type { MouseEventHandler } from 'react'

type CardWeaponInfo = {
  affix_level: number
  desc: string
  icon: string
  level: number
  name: string
  promote_level: number
  rarity: number
  type_name: string
}

export interface WeaponCardProp {
  className?: string
  withName?: boolean
  onClick?: MouseEventHandler<HTMLElement>
  weapon: CardWeaponInfo
  style?: React.CSSProperties
}

const StarImgs: string[] = [star1, star2, star3, star4, star5]

export default function WeaponCard(props: WeaponCardProp) {
  const { className, onClick, weapon, style, withName = true } = props

  const getStarClass = (rarity: number) => styles[`star${rarity > 5 ? 6 : rarity}`]
  const getStarImage = (rarity: number) => StarImgs[(rarity > 5 ? 5 : rarity) - 1]

  return (
    <div style={style} className={cn(styles.wrapper, className)} onClick={onClick}>
      <div className={getStarClass(weapon.rarity)}>
        <img src={weapon.icon} />
        <img src={getStarImage(weapon.rarity)} />
        <div>{weapon.level}</div>
        {weapon.affix_level > 0 && <div>{weapon.affix_level}</div>}
        {withName && <span>{weapon.name}</span>}
        {/* <span>Lv. {weapon.level}</span> */}
      </div>
    </div>
  )
}
