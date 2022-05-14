import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import styles from "./index.less";

const Query: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.desc}>
      <div>UID 查询</div>
      <Button noIcon text='回首页' onClick={() => navigate("/")} />
    </div>
  );
};

export default Query;
