import React from "react";
import { createRoot } from "react-dom/client";

import { APP_NAME } from "../constants";
import AppRouter from "./router";
import nativeApi from "./utils/nativeApi";
import WindowFrame from "./components/WindowFrame";

import "./index.less";
import AuthProvider from "./auth/AuthProvider";

const root = createRoot(document.getElementById("app"));

const render = async () => {
  const { version } = await nativeApi.getAppInfo();
  root.render(
    <WindowFrame title={`${APP_NAME} v${version}`}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </WindowFrame>
  );
};

render();
