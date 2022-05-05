import React from "react";

import CircularButton from "../CircularButton";
import nativeApi from "../../nativeApi";

import "./index.less";

type WindowFrameProp = {
  size?: { height: number; width: number };
  responsive?: boolean;
  children?: React.ReactElement;
};

const WindowFrame: React.FC<WindowFrameProp> = (props) => {
  const { size, responsive } = props;
  return (
    <div className='frame'>
      <div className='top-bar' />
      <div className='btns'>
        <CircularButton onClick={nativeApi.closeApp} />
      </div>
      {props.children}
    </div>
  );
};

export default WindowFrame;
