import React from "react";
import { FaExpandArrowsAlt } from "react-icons/fa";

import "./index.less";

type CircularButtonProp = {
  type?: "close" | "minimize" | "delete" | "refresh";
  size?: "small" | "middle" | "large";
  className?: string;
  onClick?: () => void;
};

const map = {
  small: 16,
  middle: 28,
  large: 48
};

const CircularButton: React.FC<CircularButtonProp> = (props) => {
  const { onClick, className = "", size = "small" } = props;
  return (
    <div className={`btn size-${size} ${className}`} onClick={onClick}>
      <FaExpandArrowsAlt size={map[size]} className='icon' />
    </div>
  );
};

export default CircularButton;
