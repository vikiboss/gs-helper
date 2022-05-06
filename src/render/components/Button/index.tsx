import React from "react";
import { IconType } from "react-icons";
import { BiCircle } from "react-icons/Bi";
import { BsXLg } from "react-icons/Bs";

import "./index.less";

type ButtonProp = {
  type: "confirm" | "cancel";
  size?: "small" | "middle" | "large";
  text: string;
  className?: string;
  onClick?: () => void;
};

const SIZE_MAP = {
  small: 12,
  middle: 18,
  large: 24
};

const TYPE_MAP: Record<string, IconType> = {
  confirm: BiCircle,
  cancel: BsXLg
};

const Button: React.FC<ButtonProp> = (props) => {
  const { onClick = () => {}, className = "", size = "small", type, text } = props;
  const Icon = TYPE_MAP[type];
  return (
    <div className={`btn btn-size-${size} ${className}`} onClick={onClick}>
      <Icon size={SIZE_MAP[size]} className={`btn-icon btn-color-${type}`} />
      <div className='btn-text'>{text}</div>
    </div>
  );
};

export default Button;
