import React from "react";
import { createRoot } from "react-dom/client";

import nativeApi from "./nativeApi";
import Home from "./pages/Home";
import WindowFrame from "./components/WindowFrame";
import { APP_NAME } from "../constants";

import "./index.less";

const root = createRoot(document.getElementById("app"));

const render = async () => {
  const version = (await nativeApi.getAppInfo()).version;
  root.render(
    <WindowFrame title={`${APP_NAME} v${version}`}>
      <Home />
    </WindowFrame>
  );
};

render();
