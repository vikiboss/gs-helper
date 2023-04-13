import cn from 'classnames'
import React from 'react'

import styles from './index.module.less'
import BounceNumber from '../BounceNumber'

interface RoleNumberProp {
  className?: string
  avatar: string
  value: number
  description: string
}

export default function RoleNumber(props: RoleNumberProp) {
  const { value, avatar, className, description } = props

  return (
    <div className={cn(styles.wrapper, className)}>
      <div>
        {avatar && <img src={avatar} />}
        <BounceNumber size={20} number={value} />
      </div>
      <span>{description}</span>
    </div>
  )
}
