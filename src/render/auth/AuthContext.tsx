import React from "react";

export interface AuthContextType {
  isLogin: boolean;
  login: () => void;
  logout: (uid?: string) => void;
}

const AuthContext = React.createContext<AuthContextType>(null);

export default AuthContext;
