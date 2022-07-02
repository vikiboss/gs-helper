import React from "react";

import getServerNameByServer from "../../../../utils/getServerNameByServer";

import type { RolesState } from "..";

import styles from "./index.less";

interface RolesProp {
  data: RolesState;
}

const Roles: React.FC<RolesProp> = ({ data }) => {
  return (
    <div className={styles.roles}>
      <div className={styles.user}>
        <div>{data.role.nickname}</div>
        <div>
          Lv.{data.role.level} {getServerNameByServer(data.role.region)} {data.uid}
        </div>
      </div>
    </div>
  );
};

export default Roles;
