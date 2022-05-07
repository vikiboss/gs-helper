import React from "react";

export interface AuthContextType {
  isLogin: boolean;
  login: (callback?: VoidFunction) => void;
  logout: (callback?: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null);

export default AuthContext;
