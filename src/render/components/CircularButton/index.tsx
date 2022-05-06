import React from "react";
import { IconType } from "react-icons";
import { FaExpandArrowsAlt, FaMinus, FaRedo, FaTrashAlt } from "react-icons/fa";

import "./index.less";

type CircularButtonProp = {
  type: "close" | "minimize" | "delete" | "refresh";
  size?: "small" | "middle" | "large";
  className?: string;
  onClick?: () => void;
};

const SIZE_MAP = {
  small: 16,
  middle: 28,
  large: 48
};

const TYPE_MAP: Record<string, IconType> = {
  close: FaExpandArrowsAlt,
  minimize: FaMinus,
  delete: FaTrashAlt,
  refresh: FaRedo
};

const CircularButton: React.FC<CircularButtonProp> = (props) => {
  const { onClick, className = "", size = "small", type } = props;
  const Icon = TYPE_MAP[type];
  return (
    <div className={`btn size-${size} ${className}`} onClick={onClick}>
      <Icon size={SIZE_MAP[size]} className='icon' />
    </div>
  );
};

export default CircularButton;
