import cn from 'classnames'
import React from 'react'

import star1 from '../../../assets/star1.png'
import star2 from '../../../assets/star2.png'
import star3 from '../../../assets/star3.png'
import star4 from '../../../assets/star4.png'
import star5 from '../../../assets/star5.png'

import Pyro from '../../../assets/pyro.png'
import Hydro from '../../../assets/hydro.png'
import Anemo from '../../../assets/anemo.png'
import Electro from '../../../assets/electro.png'
import Geo from '../../../assets/geo.png'
import Cryo from '../../../assets/cryo.png'
import Dendro from '../../../assets/dendro.png'

import type { MouseEventHandler } from 'react'

import styles from './index.less'

type CardRoleInfo = {
  actived_constellation_num: number
  element: string
  icon: string
  level: number
  name: string
  rarity: number
}

export interface RoleCardProp {
  className?: string
  withName?: boolean
  withBorder?: boolean
  onClick?: MouseEventHandler<HTMLElement>
  role: CardRoleInfo
  style?: React.CSSProperties
}

const StarImgs: string[] = [star1, star2, star3, star4, star5]
const ElementImgs: Record<string, string> = {
  Pyro,
  Hydro,
  Anemo,
  Electro,
  Geo,
  Cryo,
  Dendro
}

const RoleCard: React.FC<RoleCardProp> = ({
  className,
  onClick,
  role,
  style,
  withBorder = true,
  withName = true
}) => {
  const getStarClass = (rarity: number) => styles[`star${rarity > 5 ? 6 : rarity}`]
  const getStarImage = (rarity: number) => StarImgs[(rarity > 5 ? 5 : rarity) - 1]

  return (
    <div style={style} className={cn(styles.wrapper, className)} onClick={onClick}>
      <div className={cn(getStarClass(role.rarity), withBorder ? styles.border : '')}>
        <img src={role.icon} />
        <img src={getStarImage(role.rarity)} />
        <img src={ElementImgs[role.element]} />
        <span>Lv. {role.level}</span>
        {role.actived_constellation_num > 0 && <div>{role.actived_constellation_num}</div>}
      </div>
      {withName && <span>{role.name}</span>}
    </div>
  )
}

export default RoleCard
