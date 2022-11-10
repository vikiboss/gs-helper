import React from 'react'
import cn from 'classnames'
import { FaExpandArrowsAlt, FaMinus } from 'react-icons/fa'

import type { IconType } from 'react-icons'

import styles from './index.less'

export interface WinButtonProp {
  type: 'close' | 'minimize'
  className?: string
  onClick?: () => void
}

const TYPE_MAP: Record<string, IconType> = {
  close: FaExpandArrowsAlt,
  minimize: FaMinus
}

const WinButton: React.FC<WinButtonProp> = (props) => {
  const { onClick, className = '', type } = props

  const Icon = TYPE_MAP[type]

  const divClass = cn(styles.btn, styles.size, className)

  return (
    <div className={divClass} onClick={onClick}>
      <Icon size={12} className={styles.icon} />
    </div>
  )
}

export default WinButton
