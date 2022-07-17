import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";
import useAuth from "../../hooks/useAuth";
import useNotice from "../../hooks/useNotice";

import styles from "./index.less";

const Setting: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const notice = useNotice();

  const handleClearData = async () => {
    const isOK = await nativeApi.clearData();
    if (isOK) auth.logout(undefined, true);
    notice[isOK ? "success" : "faild"]({ message: isOK ? "重置成功，建议重启软件" : "无读写权限" });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.welcome}>持续开发中，敬请期待</div>
        <Button text='重置配置文件' className={styles.clearCache} onClick={handleClearData} />
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

export default Setting;
