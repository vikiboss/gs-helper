import React from 'react'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.less'
import CircleButton from '../../components/CircleButton'
import Loading from '../../components/Loading'
import useApi from '../../hooks/useApi'
import useMount from '../../hooks/useMount'
import useNotice from '../../hooks/useNotice'
import nativeApi from '../../utils/nativeApi'

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
            <div className={styles.tip}>
              ※ 小提示：在任意链接上右键，可以使用系统「默认浏览器」打开页面。
            </div>
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
