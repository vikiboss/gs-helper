import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";

import nativeApi from "../../utils/nativeApi";

import style from "./index.less";

const Home: React.FC = () => {
  const { info, success, warning, faild, holder } = useAlert();
  // const handleClick = async () => {
  //   show({ type: "warning" });
  // };
  return (
    <div className={style.desc}>
      <Button onClick={() => info({ message: "这是一条信息" })} text='显示信息' type='confirm' />
      <Link to='/setting'>去设置</Link>
      {holder}
    </div>
  );
};

export default Home;
