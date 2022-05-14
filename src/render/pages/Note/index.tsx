import React from "react";
import { useNavigate } from "react-router-dom";
import withAuth from "../../auth/withAuth";

import Button from "../../components/Button";
import styles from "./index.less";

const Note: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.desc}>
      <div>旅行者札记</div>
      <Button noIcon text='回首页' onClick={() => navigate("/")} />
    </div>
  );
};

export default withAuth(Note);
