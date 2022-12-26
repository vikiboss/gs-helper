import React from 'react'
import cn from 'classnames'
import { BiCircle } from 'react-icons/bi'
import { BsXLg } from 'react-icons/bs'

import type { IconType } from 'react-icons'

import styles from './index.less'

export interface ButtonProp {
  type?: 'confirm' | 'cancel'
  size?: 'small' | 'middle' | 'large'
  theme?: 'light' | 'dark'
  style?: React.CSSProperties
  text: string
  className?: string
  onClick?: (...args: any[]) => any
}

const SIZE_MAP = {
  small: 12,
  middle: 20,
  large: 30
}

const TYPE_MAP: Record<string, IconType> = {
  confirm: BiCircle,
  cancel: BsXLg
}

export default function Button(props: ButtonProp) {
  const { onClick, className = '', size = 'small', theme = 'dark', style = {}, type, text } = props

  const Icon = type ? TYPE_MAP[type] : null

  const divClass = cn(styles.btn, styles[theme], styles[size], className)
  const iconClass = Icon ? cn(styles.icon, type ? styles[type] : '') : ''
  const textClass = cn(styles.text, Icon ? styles.withIcon : styles.noIcon)

  return (
    <div style={{ zIndex: 1, ...style }} className={divClass} onClick={onClick}>
      {Icon && <Icon size={SIZE_MAP[size]} className={iconClass} />}
      <div className={textClass}>{text}</div>
    </div>
  )
}
