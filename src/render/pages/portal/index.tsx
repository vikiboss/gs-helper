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
  name: '哔哩哔哩原神直播间';
  description: '聚焦原神全新版本前瞻直播，领原石';
  url: 'https://live.bilibili.com/21987615';
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

  const handleWindowOpen = (link: string) => {
    notice.success({ message: '正在打开页面...', duration: 1000 });
    nativeApi.openWindow(link);
  };

  return (
    <>
      <div className={styles.container}>
        {!loading ? (
          <>
            <div className={styles.title}>传送门</div>
            <div className={styles.btns}>
              {data.map(e => (
                <>
                  <div>{e.name}</div>
                  <div>{e.description}</div>
                  <div onClick={() => handleWindowOpen(e.url)}>{e.url}</div>
                </>
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

export default Portal;
