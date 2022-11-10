import React from 'react'
import cn from 'classnames'

import BounceNumber from '../BounceNumber'

import styles from './index.less'

interface RoleNumberProp {
  className?: string
  avatar: string
  value: number
  description: string
}

const RoleNumber: React.FC<RoleNumberProp> = (props) => {
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

export default RoleNumber
