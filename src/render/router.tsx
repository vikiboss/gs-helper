import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Gacha from "./pages/Gacha";
import Note from "./pages/Note";
import Role from "./pages/Role";
import Game from "./pages/Game";
import Query from "./pages/Query";
import Sign from "./pages/Sign";
import Setting from "./pages/Setting";
import About from "./pages/About";

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/gacha' element={<Gacha />} />
        <Route path='/note' element={<Note />} />
        <Route path='/role' element={<Role />} />
        <Route path='/game' element={<Game />} />
        <Route path='/query' element={<Query />} />
        <Route path='/sign' element={<Sign />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
