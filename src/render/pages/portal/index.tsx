import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";

import styles from "./index.less";
import useNotice from "../../hooks/useNotice";

const Portal: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();

  const handleWindowOpen = (link: string) => {
    notice.success({ message: "正在打开页面...", duration: 1000 });
    nativeApi.openWindow(link);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>传送门</div>
        <div className={styles.btns} onClick={() => handleWindowOpen("https://mihoyo.com")}>

        </div>
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={() => navigate("/")}
        />
      </div>
      {notice.holder}
    </>
  );
};

export default Portal;
