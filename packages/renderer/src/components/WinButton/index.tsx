import cn from 'classnames'
import React from 'react'
import { FaExpandArrowsAlt, FaMinus } from 'react-icons/fa'

import styles from './index.module.less'

import type { IconType } from 'react-icons'

export interface WinButtonProp {
  type: 'close' | 'minimize'
  className?: string
  onClick?: () => void
}

const TYPE_MAP: Record<string, IconType> = {
  close: FaExpandArrowsAlt,
  minimize: FaMinus
}

export default function WinButton(props: WinButtonProp) {
  const { onClick, className = '', type } = props

  const Icon = TYPE_MAP[type]

  const divClass = cn(styles.btn, styles.size, className)

  return (
    <div className={divClass} onClick={onClick}>
      <Icon size={12} className={styles.icon} />
    </div>
  )
}
