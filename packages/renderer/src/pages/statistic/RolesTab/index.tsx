import React from 'react'

import styles from './index.module.less'
import Button from '../../../components/Button'
import RoleCard from '../../../components/RoleCard'
import nativeApi from '../utils/nativeApi'

import type { Role } from '../../../../services/getOwnedRoleList'

interface RolesProp {
  data?: Role[]
  uid: string
}

export default function Roles({ data = [], uid }: RolesProp) {
  function openCabinet() {
    nativeApi.openWindow(`https://enka.network/u/${uid}`)
  }

  const roles = data.slice(0, 8)

  return (
    <div className={styles.roles}>
      <div className={styles.roleTable}>
        {roles.map((e) => (
          <RoleCard role={e} key={e.id} />
        ))}
      </div>
      <Button text='查看角色展示柜' className={styles.btn} onClick={openCabinet} />
      <div className={styles.tip}>
        ※
        以上展示角色信息来源于米游社个人主页，如需查看游戏内「角色展示柜」的详细数据，请点击「查看角色展示柜」按钮。
      </div>
    </div>
  )
}
