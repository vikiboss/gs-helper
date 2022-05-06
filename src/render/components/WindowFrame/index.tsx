import React from "react";

import icon from "../../../assets/icon.png";
import nativeApi from "../../nativeApi";
import CircularButton from "../CircularButton";

import "./index.less";

type WindowFrameProp = {
  title?: string;
  children?: React.ReactElement;
};

const WindowFrame: React.FC<WindowFrameProp> = (props) => {
  const { title = "" } = props;
  return (
    <div className='frame'>
      <div className='top-bar'>
        <img className='win-icon' src={icon} alt='icon' />
        <div className='title'>{title}</div>
        <div className='btns'>
          <CircularButton onClick={nativeApi.closeApp} />
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default WindowFrame;
