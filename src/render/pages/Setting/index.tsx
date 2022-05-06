import React from "react";
import { Link } from "react-router-dom";

import "./index.less";

const Setting: React.FC = () => {
  return (
    <div className='desc'>
      <div>暂无设置</div>
      <Link to='/'>去首页</Link>
    </div>
  );
};

export default Setting;
