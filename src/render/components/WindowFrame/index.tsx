import React from "react";

import "./index.less";

type WindowFrameProp = {
  size?: { height: number; width: number };
  responsive?: boolean;
  children?: React.ReactElement;
};

const WindowFrame: React.FC<WindowFrameProp> = (props) => {
  const { size, responsive } = props;
  return <div className='frame'>{props.children}</div>;
};

export default WindowFrame;
