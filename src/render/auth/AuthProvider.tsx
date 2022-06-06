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
      const uid = await nativeApi.getStoreKey("currentUid");
      setIsLogin(Boolean(uid));
    })();
  }, []);

  const login = () => setIsLogin(true);
  const logout = async (uid?: string) => {
    setIsLogin(false);
    if (uid) {
      nativeApi.deleteUser(uid);
    } else {
      nativeApi.setStoreKey("currentUid", "");
    }
  };

  return <Provider value={{ isLogin, login, logout }}>{children}</Provider>;
};

export default AuthProvider;
