import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/AuthGuard";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Setting from "./pages/Setting";

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/setting' element={<Setting />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
