import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Daily from "./pages/Daily";
import Gacha from "./pages/Gacha";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Month from "./pages/Month";
import Query from "./pages/Query";
import Role from "./pages/Role";
import Setting from "./pages/Setting";
import Sign from "./pages/Sign";
import Strategy from "./pages/Strategy";

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/daily' element={<Daily />} />
        <Route path='/gacha' element={<Gacha />} />
        <Route path='/game' element={<Game />} />
        <Route path='/login' element={<Login />} />
        <Route path='/month' element={<Month />} />
        <Route path='/query' element={<Query />} />
        <Route path='/role' element={<Role />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/sign' element={<Sign />} />
        <Route path='/strategy' element={<Strategy />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
