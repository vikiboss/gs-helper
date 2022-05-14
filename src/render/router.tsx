import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Gacha from "./pages/Gacha";
import Note from "./pages/Note";
import Hero from "./pages/Hero";
import Game from "./pages/Game";
import Query from "./pages/Query";
import Setting from "./pages/Setting";

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/gacha' element={<Gacha />} />
        <Route path='/note' element={<Note />} />
        <Route path='/hero' element={<Hero />} />
        <Route path='/game' element={<Game />} />
        <Route path='/query' element={<Query />} />
        <Route path='/setting' element={<Setting />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
