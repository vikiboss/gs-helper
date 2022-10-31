import React from 'react';
import { useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import Login from '../pages/login';

const withAuth = (Component: React.ComponentType) => {
  return function Auth() {
    const { isLogin } = useAuth();
    const location = useLocation();

    if (isLogin) {
      return <Component />;
    }

    return <Login from={location?.pathname} />;
  };
};

export default withAuth;
