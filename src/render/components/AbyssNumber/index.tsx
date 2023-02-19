import cn from 'classnames'
import React from 'react'

import styles from './index.less'
import BounceNumber from '../BounceNumber'

interface AbyssNumberProp {
  className?: string
  values: [number, number]
  description?: string
}

export default function AbyssNumber(props: AbyssNumberProp) {
  const { values, className, description = '深境螺旋' } = props

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.horizontal}>
        <BounceNumber size={24} number={values[0]} />
        <div>-</div>
        <BounceNumber size={24} number={values[1]} />
      </div>
      <span>{description}</span>
    </div>
  )
}
