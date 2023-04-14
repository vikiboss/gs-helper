import cn from 'classnames'
import React from 'react'

import styles from './index.module.less'

import type { MouseEventHandler } from 'react'

import star1 from '@/assets/star1.png'
import star2 from '@/assets/star2.png'
import star3 from '@/assets/star3.png'
import star4 from '@/assets/star4.png'
import star5 from '@/assets/star5.png'

type CardItemInfo = {
  rarity: number
  icon: string
  level: number
  name: string
}

export interface ItemCardProp {
  className?: string
  withName?: boolean
  onClick?: MouseEventHandler<HTMLElement>
  item: CardItemInfo
  style?: React.CSSProperties
}

const StarImgs: string[] = [star1, star2, star3, star4, star5]

export default function ItemCard({
  className,
  onClick,
  item,
  style,
  withName = true
}: ItemCardProp) {
  const getStarClass = (rarity: number) => styles[`star${rarity > 5 ? 6 : rarity}`]
  const getStarImage = (rarity: number) => StarImgs[(rarity > 5 ? 5 : rarity) - 1]

  return (
    <div style={style} className={cn(styles.wrapper, className)} onClick={onClick}>
      <div className={getStarClass(item.rarity)}>
        <img src={item.icon} />
        <img src={getStarImage(item.rarity)} />
        {withName && <span>{item.name}</span>}
        {item?.level > 0 && <div>{item.level}</div>}
      </div>
    </div>
  )
}
