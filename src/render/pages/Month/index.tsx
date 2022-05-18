import React, { useEffect } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import withAuth from "../../auth/withAuth";
import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";

import styles from "./index.less";

const Month: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await nativeApi.getMonthInfo();
      console.log(res);
    })();
  }, []);

  return (
    <div className={styles.desc}>
      <div>🏗️ 旅行者札记页，还在施工中</div>
      <CircleButton
        Icon={TiArrowBack}
        size='middle'
        className={styles.backBtn}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default withAuth(Month);
