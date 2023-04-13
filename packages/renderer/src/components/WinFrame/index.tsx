import React from 'react'

import styles from './index.module.less'
import icon from '../../assets/icon.png'
import nativeApi from '@/utils/nativeApi'
import WinButton from '../WinButton'

export interface WinFrameProp {
  title?: string
  children?: JSX.Element
}

export default function WinFrame(props: WinFrameProp) {
  const { title = '' } = props
  return (
    <div className={styles.frame}>
      <div className={styles.topBar}>
        <img className={styles.icon} src={icon} />
        <div className={styles.title}>{title}</div>
        <div className={styles.btns}>
          <WinButton className={styles.btn} onClick={nativeApi.minimizeApp} type='minimize' />
          <WinButton className={styles.btn} onClick={nativeApi.hideApp} type='close' />
        </div>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}
