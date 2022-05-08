import React from "react";
import { useNavigate } from "react-router-dom";

import withAuth from "../../auth/AuthGuard";
import Button from "../../components/Button";

import styles from "./index.less";

const Setting: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.desc}>
      <div>暂无设置</div>
      <Button noIcon text='去首页' onClick={() => navigate("/")} />
    </div>
  );
};

export default withAuth(Setting);
