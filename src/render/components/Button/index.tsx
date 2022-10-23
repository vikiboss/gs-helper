import React from "react";
import cn from "classnames";
import { BiCircle } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";

import type { IconType } from "react-icons";

import styles from "./index.less";

export interface ButtonProp {
  type?: "confirm" | "cancel";
  size?: "small" | "middle" | "large";
  theme?: "light" | "dark";
  style?: React.CSSProperties;
  text: string;
  className?: string;
  onClick?: (...args: any[]) => any;
}

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
  const { onClick, className = "", size = "small", theme = "dark", style = {}, type, text } = props;
  const Icon = type ? TYPE_MAP[type] : null;
  return (
    <div
      style={{ zIndex: 1, ...style }}
      className={cn(styles.btn, styles[theme], styles[size], className)}
      onClick={onClick}
    >
      {Icon && <Icon size={SIZE_MAP[size]} className={cn(styles.icon, type ? styles[type] : "")} />}
      <div className={cn(styles.text, Icon ? styles.withIcon : styles.noIcon)}>{text}</div>
    </div>
  );
};

export default Button;
