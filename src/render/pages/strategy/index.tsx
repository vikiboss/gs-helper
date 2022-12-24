import React, { useEffect } from 'react'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import CircleButton from '../../components/CircleButton'
import Loading from '../../components/Loading'
import nativeApi from '../../utils/nativeApi'
import useApi from '../../hooks/useApi'
import useNotice from '../../hooks/useNotice'

import styles from './index.less'

interface StrategyItem {
  name: string
  url: string
  hightlight?: boolean
  alt?: string
}

const Strategy: React.FC = () => {
  const navigate = useNavigate()
  const notice = useNotice()

  const { r: fetchRepo, d = [], loading } = useApi<StrategyItem[], [string]>(nativeApi.getRepoData)

  useEffect(() => {
    fetchRepo('strategies.json')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleWindowOpen = (link: string) => {
    notice.success({
      message: '正在打开页面...',
      duration: 1000
    })

    nativeApi.openWindow(link)
  }

  return (
    <>
      <div className={styles.container}>
        {!loading ? (
          <>
            <div className={styles.title}>小窗攻略</div>
            <div className={styles.btns}>
              {d.map((e) => {
                const extra = e.hightlight ? styles.hightlight : ''
                const className = cn(styles.btn, extra)

                return (
                  <div
                    className={className}
                    key={e.name}
                    onClick={handleWindowOpen.bind(null, e.url)}
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

export default Strategy
