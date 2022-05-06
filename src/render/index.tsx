import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import nativeApi from "./nativeApi";
import WindowFrame from "./components/WindowFrame";
import { APP_NAME } from "../constants";

import Home from "./pages/Home";
import Setting from "./pages/Setting";

import "./index.less";

const root = createRoot(document.getElementById("app"));

const render = async () => {
  const version = (await nativeApi.getAppInfo()).version;
  root.render(
    <WindowFrame title={`${APP_NAME} v${version}`}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/setting' element={<Setting />} />
        </Routes>
      </HashRouter>
    </WindowFrame>
  );
};

render();
