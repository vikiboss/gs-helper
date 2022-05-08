import React from "react";

import icon from "../../../assets/icon.png";
import nativeApi from "../../utils/nativeApi";
import CircularButton from "../CircularButton";

import styles from "./index.less";

type WindowFrameProp = {
  title?: string;
  children?: JSX.Element;
};


const WindowFrame: React.FC<WindowFrameProp> = (props) => {
  const { title = "" } = props;
  return (
    <div className={styles.frame}>
      <div className={styles.topBar}>
        <img className={styles.icon} src={icon} alt='icon' />
        <div className={styles.title}>{title}</div>
        <div className={styles.btns}>
          <CircularButton className={styles.btn} onClick={nativeApi.minimizeApp} type='minimize' />
          <CircularButton className={styles.btn} onClick={nativeApi.hideApp} type='close' />
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default WindowFrame;