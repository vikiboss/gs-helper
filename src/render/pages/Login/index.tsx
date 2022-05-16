import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import useNotice from "../../hooks/useNotice";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";
import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import { TiArrowBack } from "react-icons/ti";

import type { AppData } from "../../../typings";

import styles from "./index.less";
import { LOGIN_GUIDES } from "../../../constants";

type LoginProp = {
  from?: string;
};

const Login: React.FC<LoginProp> = (props) => {
  const notice = useNotice();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isLogin, login } = useAuth();
  const [logged, setLogged] = useState<boolean>(isLogin);
  const [isSwitching, setIsSwitching] = useState<boolean>((state as any)?.changeAccount);
  const isExpired = (state as any)?.isExpired;

  const naviProps = {
    to: props?.from || "/",
    replace: true
  };

  useEffect(() => {
    if (props?.from) notice.faild({ message: "请登录以使用全部功能" });
    if (isExpired) notice.faild({ message: "验证信息已过期，请重新登录" });
    if (isSwitching) notice.info({ message: "请登录 「新的账号」 以切换账号" });
  }, []);

  const handleLogin = () => {
    nativeApi.loginViaMihoyoBBS();
  };

  const handleRefresh = async () => {
    const user: AppData["user"] = await nativeApi.getStoreKey("user");
    if (!user?.cookie) return notice.faild({ message: "未检测到有效验证信息，请重新登录" });
    setLogged(true);
    notice.success({ message: "登录成功，正在返回登录前页面..." });
    setTimeout(() => {
      setIsSwitching(false);
      login();
    }, 1200);
  };

  if (isLogin && !isSwitching) return <Navigate {...naviProps} />;

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.title}>登录 「米游社」 账号</div>
        <div>
          <div className={styles.desc}>操作步骤：</div>
          {LOGIN_GUIDES.map((e) => (
            <div className={styles.step} key={e}>
              {e}
            </div>
          ))}
        </div>
        <div className={styles.btns}>
          <Button type='confirm' size='middle' text='登录米游社' onClick={handleLogin} />
          <Button type='confirm' size='middle' text='刷新状态' onClick={handleRefresh} />
        </div>
        {/* {logged && <Link to={naviProps.to}>如果没有自动跳转，请点此手动跳转</Link>} */}
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={() => navigate("/")}
        />
      </div>
      {notice.holder}
    </>
  );
};

export default Login;
