import React from "react";
import { createRoot } from "react-dom/client";

import AppRouter from "./router";
import { APP_NAME } from "../constants";
import nativeApi from "./utils/nativeApi";
import AuthProvider from "./auth/AuthProvider";
import WindowFrame from "./components/WindowFrame";

import "./index.less";

const root = createRoot(document.getElementById("app"));

const render = async () => {
  const { version } = await nativeApi.getAppInfo();
  const isLogin = Boolean(await nativeApi.getStoreKey("user.cookie"));
  root.render(
    <WindowFrame title={`${APP_NAME} v${version}`}>
      <AuthProvider isLogin={isLogin}>
        <AppRouter />
      </AuthProvider>
    </WindowFrame>
  );
};

render();
