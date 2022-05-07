import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";

import nativeApi from "../../nativeApi";

import style from "./index.module.less";

const Home: React.FC = () => {
  const { info, success, warning, faild, holder } = useAlert();
  // const handleClick = async () => {
  //   show({ type: "warning" });
  // };
  return (
    <div className={style.desc}>
      <Button onClick={() => info({ message: "这是一条信息" })} text='显示信息' type='confirm' />
      <Button onClick={() => success({ message: "这是一条成功信息" })} text='显示成功' type='cancel' />
      <Button onClick={() => warning({ message: "这是一条警告信息" })} text='显示警告' type='confirm' />
      <Button onClick={() => faild({ message: "这是一条失败信息" })} text='显示失败' type='cancel' />
      <Link to='/setting'>去设置</Link>
      {holder}
    </div>
  );
};

export default Home;
