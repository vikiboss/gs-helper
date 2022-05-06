import React from "react";

import icon from "../../../assets/icon.png";
import nativeApi from "../../nativeApi";
import CircularButton from "../CircularButton";

import "./index.less";

type WindowFrameProp = {
  title?: string;
  children?: React.ReactNode;
};

const WindowFrame: React.FC<WindowFrameProp> = (props) => {
  const { title = "" } = props;
  return (
    <div className='frame'>
      <div className='top-bar'>
        <img className='win-icon' src={icon} alt='icon' />
        <div className='title'>{title}</div>
        <div className='btns'>
          <CircularButton className='cbtn' onClick={nativeApi.minimizeApp} type='minimize' />
          <CircularButton className='cbtn' onClick={nativeApi.hideApp} type='close' />
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default WindowFrame;
