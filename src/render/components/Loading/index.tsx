import React from 'react';

import paimon from '../../../assets/paimon.gif';
import paimon2 from '../../../assets/paimon2.gif';

export interface LoadingProp {
  text?: string;
  style?: React.CSSProperties;
  isEmpty?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

const Loading: React.FC<LoadingProp> = (props) => {
  const { isEmpty = false, className, style: _style = {} } = props;
  const text = isEmpty ? '没有内容' : '小派蒙正在努力加载中...';
  const style: React.CSSProperties = {
    ..._style,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    justifySelf: 'center'
  };
  return (
    <div style={style} className={className}>
      <img
        src={isEmpty ? paimon2 : paimon}
        style={{ width: '120px', marginBottom: '12px' }}
      />
      <div style={{ marginBottom: '12px' }}>{props.text || text}</div>
    </div>
  );
};

export default Loading;
