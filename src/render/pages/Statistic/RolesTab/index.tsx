import React from "react";

import getServerNameByServer from "../../../../utils/getServerNameByServer";

import type { RolesState } from "..";

import styles from "./index.less";
import RoleCard from "../../../components/RoleCard";

interface RolesProp {
  data: RolesState;
}

const Roles: React.FC<RolesProp> = ({ data }) => {
  return (
    <div className={styles.roles}>
      {data.info && <div className={styles.user}>
        <div>{data.info.nickname}</div>
        <div>
          Lv.{data.info.level} {getServerNameByServer(data.info.region)} {data.uid}
        </div>
      </div>}
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
