import React from "react";
import { IoClose } from "react-icons/io5";

import "./index.less";

type CircularButtonProp = {
  type?: "close" | "minimize" | "delete" | "refresh";
  size?: "small" | "middle" | "large";
  className?: string;
  onClick?: () => void;
};

const map = {
  small: 24,
  middle: 24,
  large: 24
};

const CircularButton: React.FC<CircularButtonProp> = (props) => {
  const { type = "close", onClick, className = "", size = "small" } = props;
  return (
    <div className={`btn size-${size} ${className}`} onClick={onClick}>
      <div className={`type type-${type}`}>
        <IoClose size={map[size]} className='icon' />
      </div>
    </div>
  );
};

export default CircularButton;
