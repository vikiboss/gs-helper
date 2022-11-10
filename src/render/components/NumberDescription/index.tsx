import React from 'react'
import cn from 'classnames'

import BounceNumber from '../BounceNumber'

import styles from './index.less'

interface NumberDescriptionProp {
  className?: string
  value: number
  sub?: string
  description: string
}

const NumberDescription: React.FC<NumberDescriptionProp> = (props) => {
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

export default NumberDescription
