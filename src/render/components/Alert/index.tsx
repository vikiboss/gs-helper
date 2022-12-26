import React from 'react'
import cn from 'classnames'

import styles from './index.less'

export interface AlertProp {
  visible: boolean
  message: string
  type: 'info' | 'warning' | 'success' | 'faild'
}

export default function Alert(props: AlertProp) {
  const { visible, type, message } = props
  const visibleClass = visible ? styles.show : styles.hide
  return <div className={cn(styles.alert, styles[type], visibleClass)}>{message}</div>
}
