import React from "react";
import classnames from "classnames";
import { IconType } from "react-icons";
import { FaExpandArrowsAlt, FaMinus } from "react-icons/fa";
import styles from "./index.less";

export interface WinButtonProp {
  type: "close" | "minimize";
  className?: string;
  onClick?: () => void;
}

const TYPE_MAP: Record<string, IconType> = {
  close: FaExpandArrowsAlt,
  minimize: FaMinus
};

const WinButton: React.FC<WinButtonProp> = (props) => {
  const { onClick, className = "", type } = props;
  const Icon = TYPE_MAP[type];
  return (
    <div className={classnames(styles.btn, styles.size, className)} onClick={onClick}>
      <Icon size={12} className={styles.icon} />
    </div>
  );
};

export default WinButton;
