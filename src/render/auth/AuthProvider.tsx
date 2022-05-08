import React, { useEffect } from "react";

import nativeApi from "../utils/nativeApi";
import AuthContext from "./AuthContext";

const Provider = AuthContext.Provider;

type AuthProviderProp = {
  children: React.ReactNode;
  isLogin: boolean;
};

const AuthProvider: React.FC<AuthProviderProp> = (props) => {
  const { children, isLogin: logged } = props;
  const [isLogin, setIsLogin] = React.useState<boolean>(logged);

  useEffect(() => {
    (async () => {
      const cookie = await nativeApi.getStoreKey("user.cookie");
      setIsLogin(Boolean(cookie));
    })();
  }, []);

  const login = (callback?: VoidFunction) => {
    setIsLogin(true);
    return callback ? callback() : true;
  };

  const logout = async (callback?: VoidFunction) => {
    setIsLogin(false);
    await nativeApi.clearCookie();
    return callback ? callback() : true;
  };

  return <Provider value={{ isLogin, login, logout }}>{children}</Provider>;
};

export default AuthProvider;
