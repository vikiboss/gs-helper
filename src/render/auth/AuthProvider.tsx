import React, { useEffect } from "react";

import nativeApi from "../utils/nativeApi";
import AuthContext from "./AuthContext";

const Provider = AuthContext.Provider;

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = React.useState<boolean>(false);

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

  const value = { isLogin, login, logout };
  return <Provider value={value}>{children}</Provider>;
}

export default AuthProvider;
