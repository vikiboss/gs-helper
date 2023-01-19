import React from 'react'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

import CircleButton from '../../components/CircleButton'
import nativeApi from '../../utils/nativeApi'
import useNotice from '../../hooks/useNotice'
import useApi from '../../hooks/useApi'
import Loading from '../../components/Loading'
import useMount from '../../hooks/useMount'

import styles from './index.less'

interface PortalItem {
  name: string
  description: string
  url: string
  icon: string
  highlight: false
  browser: false
}

export default function Portal() {
  const navigate = useNavigate()
  const notice = useNotice()
  const { r: fetchRepo, data, loading } = useApi<PortalItem[], [string]>(nativeApi.getRepoData)

  useMount(() => fetchRepo('portals.json'))

  function handleClick(link: PortalItem, openInDefaultBrowser = false) {
    if (link?.browser || openInDefaultBrowser) {
      window.open(link.url)
    } else {
      notice.success({ message: '正在打开页面...', duration: 1000 })
      nativeApi.openWindow(link.url, { title: link.name })
    }
  }

  return (
    <>
      <div className={styles.container}>
        {!loading ? (
          <>
            <div className={styles.title}>传送门</div>
            <div className={styles.cards}>
              {data?.map((e) => (
                <div
                  key={e.name}
                  className={styles.card}
                  onClick={() => handleClick(e)}
                  onContextMenu={() => handleClick(e, true)}
                >
                  <div>
                    <img src={e.icon} />
                    <div>{e.name}</div>
                  </div>
                  <div>{e.description}</div>
                </div>
              ))}
            </div>
            <div className={styles.tip}>※ 使用鼠标右键，可以在系统默认浏览器中打开。</div>
          </>
        ) : (
          <Loading />
        )}
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={() => navigate('/')}
        />
      </div>
      {notice.holder}
    </>
  )
}
