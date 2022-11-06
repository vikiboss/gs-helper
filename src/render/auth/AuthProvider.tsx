import React, { useEffect } from 'react';

import nativeApi from '../utils/nativeApi';
import AuthContext from './AuthContext';

const { Provider } = AuthContext;

type AuthProviderProp = {
  children: React.ReactNode;
  isLogin: boolean;
};

const AuthProvider: React.FC<AuthProviderProp> = (props) => {
  const { children, isLogin: logged } = props;
  const [isLogin, setIsLogin] = React.useState<boolean>(logged);

  const login = () => setIsLogin(true);
  const logout = async (uid?: string, isClear = false) => {
    setIsLogin(false);
    if (isClear) {
      return;
    }
    if (uid) {
      nativeApi.deleteUser(uid);
    } else {
      nativeApi.setStoreKey('currentUid', '');
    }
  };

  useEffect(() => {
    (async () => {
      const uid = await nativeApi.getStoreKey('currentUid');
      const hasUid = Boolean(uid);
      (hasUid ? login : logout)();
    })();
  }, []);

  return <Provider value={{ isLogin, login, logout }}>{children}</Provider>;
};

export default AuthProvider;
