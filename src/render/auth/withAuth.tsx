import React from "react";
import { useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import Login from "../pages/Login";

const withAuth = (Component: React.ComponentType) => {
  return function () {
    const { isLogin } = useAuth();
    const location = useLocation();
    console.log(location)
    if (isLogin) return <Component />;
    return <Login from={location?.pathname} />;
  };
};

export default withAuth;
