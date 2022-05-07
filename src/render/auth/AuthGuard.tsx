import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const withAuth = (Component: React.ComponentType) => {
  return function () {
    const { isLogin } = useAuth();
    const location = useLocation();
    if (isLogin) return <Component />;
    const naviProps = { to: "/login", state: { from: location }, replace: true };
    return <Navigate {...naviProps} />;
  };
};

export default withAuth;
