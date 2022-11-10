import React from 'react'

import Button from '../../../components/Button'
import nativeApi from '../../../utils/nativeApi'
import useAuth from '../../../hooks/useAuth'

import type { Notice } from '../../../hooks/useNotice'

import styles from './index.less'
import { useNavigate } from 'react-router-dom'

interface GeneralProp {
  notice: Notice
}

const General: React.FC<GeneralProp> = ({ notice }) => {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleClearData = async () => {
    const isOK = await nativeApi.clearData()

    if (isOK) {
      auth.logout(undefined, true)
    }

    notice[isOK ? 'success' : 'faild']({ message: isOK ? '重置成功，建议重启软件' : '无读写权限' })

    setTimeout(() => navigate('/'), 1600)
  }

  return (
    <div className={styles.main}>
      <div className={styles.welcome}>持续开发中，敬请期待</div>
      <div className={styles.clearCache}>
        <Button text='重置配置文件' onClick={handleClearData} />
        <span>
          此操作会清空本地所有账号信息并重置配置文件（不包括祈愿记录数据），清空后需要重新登录，请谨慎操作！
        </span>
      </div>
    </div>
  )
}

export default General
