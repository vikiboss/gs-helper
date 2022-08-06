import React from "react";

import getServerNameByServer from "../../../../utils/getServerNameByServer";
import RoleCard from "../../../components/RoleCard";

import type { RolesState } from "..";

import styles from "./index.less";

interface RolesProp {
  data: RolesState;
}

const Roles: React.FC<RolesProp> = ({ data }) => {
  return (
    <div className={styles.roles}>
      {data.role && (
        <div className={styles.user}>
          <div>{data.role.nickname}</div>
          <div>
            Lv.{data.role.level} {getServerNameByServer(data.role.region)} {data.uid}
          </div>
        </div>
      )}
      <div className={styles.roleTable}>
        {data.list.length > 0 ? (
          data.list.slice(0, 8).map((e) => <RoleCard role={e} key={e.id} />)
        ) : (
          <div>角色为空</div>
        )}
      </div>
    </div>
  );
};

export default Roles;
