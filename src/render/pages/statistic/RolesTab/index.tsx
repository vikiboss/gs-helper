import React from 'react';

import RoleCard from '../../../components/RoleCard';
import Button from '../../../components/Button';

import type { Role } from '../../../../services/getOwnedRoleList';

import styles from './index.less';
import nativeApi from '../../../utils/nativeApi';

interface RolesProp {
  data?: Role[];
  uid: string;
}

const Roles: React.FC<RolesProp> = ({ data = [], uid }) => {
  const openCabinet = () => {
    nativeApi.openWindow(`https://enka.network/u/${uid}`);
  };

  const roles = data.slice(0, 8);

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
  );
};

export default Roles;
