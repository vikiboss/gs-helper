import cn from 'classnames'
import React from 'react'

import styles from './index.less'
import BounceNumber from '../BounceNumber'

interface NumberDescriptionProp {
  className?: string
  value: number
  sub?: string
  description: string
}

export default function NumberDescription(props: NumberDescriptionProp) {
  const { value, sub, description, className } = props

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.horizontal}>
        <BounceNumber size={24} number={value} />
        <span className={styles.fullNum}>{sub}</span>
      </div>
      <span>{description}</span>
    </div>
  )
}
