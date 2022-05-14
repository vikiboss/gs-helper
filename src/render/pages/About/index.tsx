import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import styles from "./index.less";

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.desc}>
      <div>关于页面</div>
      <Button noIcon text='回首页' onClick={() => navigate("/")} />
    </div>
  );
};

export default About;
