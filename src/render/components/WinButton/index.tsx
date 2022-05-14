import React from "react";
import classnames from "classnames";
import { IconType } from "react-icons";
import { FaExpandArrowsAlt, FaMinus } from "react-icons/fa";
import styles from "./index.less";

type WinButtonProp = {
  type: "close" | "minimize";
  size?: "small" | "middle" | "large";
  className?: string;
  onClick?: () => void;
};

const SIZE_MAP = {
  small: 12,
  middle: 24,
  large: 42
};

const TYPE_MAP: Record<string, IconType> = {
  close: FaExpandArrowsAlt,
  minimize: FaMinus
};

const WinButton: React.FC<WinButtonProp> = (props) => {
  const { onClick = () => {}, className = "", size = "small", type } = props;
  const Icon = TYPE_MAP[type];
  return (
    <div className={classnames(styles.btn, styles[size], className)} onClick={onClick}>
      <Icon size={SIZE_MAP[size]} className={styles.icon} />
    </div>
  );
};

export default WinButton;
