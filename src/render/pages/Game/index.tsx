import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import CircleButton from "../../components/CircleButton";
import withAuth from "../../auth/withAuth";
import styles from "./index.less";

const Game: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div>🏗️ 游戏数据页，还在施工中</div>
      <CircleButton
        Icon={TiArrowBack}
        size='middle'
        className={styles.backBtn}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default withAuth(Game);
