import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import withAuth from "../../auth/withAuth";
import CircleButton from "../../components/CircleButton";

import styles from "./index.less";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.desc}>
      <div>🏗️ 角色详情页，还在施工中</div>
      <CircleButton
        Icon={TiArrowBack}
        size='middle'
        className={styles.backBtn}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default withAuth(Hero);
