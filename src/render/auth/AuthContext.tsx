import React from "react";

export interface AuthContextType {
  isLogin: boolean;
  login: (cookie: string, callback?: VoidFunction) => void;
  logout: (callback?: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null);

export default AuthContext;
