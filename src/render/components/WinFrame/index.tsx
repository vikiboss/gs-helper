import React from 'react';

import icon from '../../../assets/icon.png';
import nativeApi from '../../utils/nativeApi';
import WinButton from '../WinButton';

import styles from './index.less';

export interface WinFrameProp {
  title?: string;
  children?: JSX.Element;
}

const WinFrame: React.FC<WinFrameProp> = (props) => {
  const { title = '' } = props;
  return (
    <div className={styles.frame}>
      <div className={styles.topBar}>
        <img className={styles.icon} src={icon} alt='icon' />
        <div className={styles.title}>{title}</div>
        <div className={styles.btns}>
          <WinButton className={styles.btn} onClick={nativeApi.minimizeApp} type='minimize' />
          <WinButton className={styles.btn} onClick={nativeApi.hideApp} type='close' />
        </div>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default WinFrame;
