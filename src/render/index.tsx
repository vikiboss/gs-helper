import React from "react";
import { createRoot } from "react-dom/client";

import nativeApi from "./nativeApi";
import Home from "./pages/Home";
import WindowFrame from "./components/WindowFrame";

import "./index.less";

const root = createRoot(document.getElementById("app"));

const render = async () => {
  const version = (await nativeApi.getAppInfo()).version;
  root.render(
    <WindowFrame title={`原神助手 v${version}`}>
      <Home />
    </WindowFrame>
  );
};

render();
