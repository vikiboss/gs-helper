import React, { useEffect } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import CircleButton from '../../components/CircleButton';
import nativeApi from '../../utils/nativeApi';
import useNotice from '../../hooks/useNotice';

import styles from './index.less';
import useApi from '../../hooks/useApi';
import Loading from '../../components/Loading';

const Strategy: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [request, loading, data = []] = useApi(nativeApi.getStrategyList);

  useEffect(() => {
    request();
  }, []);

  const handleWindowOpen = (link: string) => {
    notice.success({
      message: '正在打开页面...',
      duration: 1000,
    });

    nativeApi.openWindow(link);
  };

  return (
    <>
      <div className={styles.container}>
        {!loading ? (
          <>
            <div className={styles.title}>小窗攻略</div>
            <div className={styles.btns}>
              {data.map(e => (
                <div
                  className={cn(
                    styles.btn,
                    e.hightlight ? styles.hightlight : ''
                  )}
                  key={e.name}
                  title={e.alt}
                  onClick={handleWindowOpen.bind(null, e.url)}
                >
                  <span>{e.name}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Loading />
        )}
        <CircleButton
          Icon={TiArrowBack}
          size="middle"
          className={styles.backBtn}
          onClick={() => navigate('/')}
        />
      </div>
      {notice.holder}
    </>
  );
};

export default Strategy;
