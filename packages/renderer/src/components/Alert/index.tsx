import cn from 'classnames'
import React from 'react'

import styles from './index.module.less'

export interface AlertProp {
  visible: boolean
  message: string
  type: 'info' | 'warning' | 'success' | 'failed'
}

export default function Alert(props: AlertProp) {
  const { visible, type, message } = props
  const visibleClass = visible ? styles.show : styles.hide

  return <div className={cn(styles.alert, styles[type], visibleClass)}>{message}</div>
}
