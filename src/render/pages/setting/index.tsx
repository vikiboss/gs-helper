import React, { useState } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';

import About from './About';
import CircleButton from '../../components/CircleButton';
import General from './General';
import SelectButton from '../../components/SelectButton';
import useNotice from '../../hooks/useNotice';

import styles from './index.less';

interface LocationState {
  tab?: 'general' | 'about';
}

const Setting: React.FC = () => {
  const notice = useNotice();
  const navigate = useNavigate();
  const state = useLocation().state as LocationState;
  const [tab, setTab] = useState<LocationState['tab']>(state?.tab ?? 'general');

  const tabs = [
    { label: '通用设置', value: 'general' },
    { label: '关于原神助手', value: 'about' },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <SelectButton value={tab} changeItem={setTab} items={tabs} />
        </div>
        <div className={styles.content}>
          {tab === 'general' && <General notice={notice} />}
          {tab === 'about' && <About notice={notice} />}
        </div>
        <CircleButton Icon={TiArrowBack} size='middle' className={styles.backBtn} onClick={() => navigate('/')} />
      </div>
      {notice.holder}
    </>
  );
};

export default Setting;
