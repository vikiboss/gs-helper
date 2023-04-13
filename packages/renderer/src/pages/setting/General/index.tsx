import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.less'
import Button from '../../../components/Button'
import useAuth from '../../../hooks/useAuth'
import nativeApi from '../utils/nativeApi'

import type { Notice } from '../../../hooks/useNotice'

interface GeneralProp {
  notice: Notice
}

export default function General({ notice }: GeneralProp) {
  const auth = useAuth()
  const navigate = useNavigate()

  async function handleClearData() {
    const isOK = await nativeApi.clearData()

    if (isOK) {
      auth.logout(undefined, true)
    }

    notice[isOK ? 'success' : 'failed'](isOK ? '重置成功，建议重启软件' : '无读写权限')

    setTimeout(() => navigate('/'), 1000)
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
