import React, { useEffect } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import CircleButton from '../../components/CircleButton';
import nativeApi from '../../utils/nativeApi';

import styles from './index.less';
import useNotice from '../../hooks/useNotice';
import useApi from '../../hooks/useApi';
import Loading from '../../components/Loading';

interface PortalItem {
  name: string;
  description: string;
  url: string;
  icon: string;
  hightlight: false;
  browser: false;
}

const Portal: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [request, data = [], loading] = useApi<PortalItem[]>(
    nativeApi.getRepoData
  );

  useEffect(() => {
    request('portals.json');
  }, []);

  const handleWindowOpen = (link: PortalItem) => {
    if (link.browser) {
      window.open(link.url);
    } else {
      notice.success({ message: '正在打开页面...', duration: 1000 });
      nativeApi.openWindow(link.url, { title: link.name });
    }
  };

  return (
    <>
      <div className={styles.container}>
        {!loading ? 
          <>
            <div className={styles.title}>传送门</div>
            <div className={styles.cards}>
              {data.map((e) => 
                <div
                  key={e.name}
                  className={styles.card}
                  onClick={() => handleWindowOpen(e)}
                >
                  <div>
                    <img src={e.icon} alt='icon' />
                    <div>{e.name}</div>
                  </div>
                  <div>{e.description}</div>
                </div>
              )}
            </div>
          </>
         : 
          <Loading />
        }
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={() => navigate('/')}
        />
      </div>
      {notice.holder}
    </>
  );
};

export default Portal;
