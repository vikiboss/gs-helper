import React from "react";
import cn from "classnames";
import { IconType } from "react-icons";
import { BiCircle } from "react-icons/Bi";
import { BsXLg } from "react-icons/Bs";

import styles from "./index.less";

type ButtonProp = {
  type: "confirm" | "cancel";
  size?: "small" | "middle" | "large";
  text: string;
  className?: string;
  onClick?: () => void;
};

const SIZE_MAP = {
  small: 12,
  middle: 20,
  large: 30
};

const TYPE_MAP: Record<string, IconType> = {
  confirm: BiCircle,
  cancel: BsXLg
};

const Button: React.FC<ButtonProp> = (props) => {
  const { onClick = () => {}, className = "", size = "small", type, text } = props;
  const Icon = TYPE_MAP[type];
  return (
    <div className={cn(styles.btn, styles[size], className)} onClick={onClick}>
      <Icon size={SIZE_MAP[size]} className={cn(styles.icon, styles[type])} />
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default Button;
