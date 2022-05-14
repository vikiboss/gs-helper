import React from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import CircleButton from "../../components/CircleButton";

import styles from "./index.less";

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.desc}>
      <CircleButton
        Icon={TiArrowBack}
        size='middle'
        className={styles.backBtn}
        onClick={() => navigate("/")}
      />
      <div>关于页面</div>
    </div>
  );
};

export default About;
