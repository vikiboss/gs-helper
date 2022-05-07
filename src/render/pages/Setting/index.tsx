import React from "react";
import { Link } from "react-router-dom";
import withAuth from "../../auth/AuthGuard";

import styles from "./index.less";

const Setting: React.FC = () => {
  return (
    <div className={styles.desc}>
      <div>暂无设置</div>
      <Link to='/'>去首页</Link>
    </div>
  );
};

export default withAuth(Setting);
