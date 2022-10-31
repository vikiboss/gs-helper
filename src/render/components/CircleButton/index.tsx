import React from 'react';
import classnames from 'classnames';

import type { IconType } from 'react-icons';

import styles from './index.less';

export interface CircleButtonProp {
  Icon: IconType;
  tip?: string;
  size?: 'small' | 'middle' | 'large';
  className?: string;
  onClick?: (...args: any[]) => any;
}

const SIZE_MAP = {
  small: 16,
  middle: 24,
  large: 42
};

const CircleButton: React.FC<CircleButtonProp> = (props) => {
  const { onClick, className = '', size = 'small', Icon, tip = '' } = props;
  return (
    <div className={classnames(styles.btn, styles[size], className)} onClick={onClick} title={tip}>
      <Icon size={SIZE_MAP[size]} className={styles.icon} />
    </div>
  );
};

export default CircleButton;
