import React from "react";

import RoleCard from "../../../components/RoleCard";

import type { Role } from "../../../../services/getOwnedRoleList";

import styles from "./index.less";

interface RolesProp {
  data: Role[];
}

const Roles: React.FC<RolesProp> = ({ data }) => {
  return (
    <div className={styles.roles}>
      <div className={styles.roleTable}>
        {data.length > 0 ? (
          data.slice(0, 8).map((e) => <RoleCard role={e} key={e.id} />)
        ) : (
          <div>角色为空</div>
        )}
      </div>
    </div>
  );
};

export default Roles;
