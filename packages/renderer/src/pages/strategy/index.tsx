import cn from 'classnames'
import React from 'react'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.less'
import CircleButton from '@/components/CircleButton'
import Loading from '@/components/Loading'
import useApi from '@/hooks/useApi'
import useMount from '@/hooks/useMount'
import useNotice from '@/hooks/useNotice'
import nativeApi from '@/utils/nativeApi'

interface StrategyItem {
  name: string
  url: string
  highlight?: boolean
  alt?: string
}

export default function Strategy() {
  const navigate = useNavigate()
  const notice = useNotice()

  const { r: fetchRepo, d = [], loading } = useApi<StrategyItem[], [string]>(nativeApi.getRepoData)

  useMount(() => fetchRepo('strategies.json'))

  function handleWindowOpen(link: string, external = false) {
    notice.success({
      message: '正在打开页面...',
      duration: 1000
    })

    if (external) {
      open(link)
    } else {
      nativeApi.openWindow(link)
    }
  }

  return (
    <>
      <div className={styles.container}>
        {!loading ? (
          <>
            <div className={styles.title}>小窗攻略</div>
            <div className={styles.btns}>
              {d.map((e) => {
                const extra = e.highlight ? styles.highlight : ''
                const className = cn(styles.btn, extra)

                return (
                  <div
                    className={className}
                    key={e.name}
                    onClick={() => handleWindowOpen(e.url)}
                    onContextMenu={() => handleWindowOpen(e.url, true)}
                  >
                    <span>{e.name}</span>
                  </div>
                )
              })}
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
