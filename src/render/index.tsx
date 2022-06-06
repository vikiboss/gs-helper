import React from "react";
import { createRoot } from "react-dom/client";

import AppRouter from "./router";
import nativeApi from "./utils/nativeApi";
import AuthProvider from "./auth/AuthProvider";
import WinFrame from "./components/WinFrame";

import "./index.less";

const root = createRoot(document.getElementById("app"));

const render = async () => {
  const { name } = await nativeApi.getAppInfo();
  const isLogin = Boolean(await nativeApi.getStoreKey("currentUid"));
  root.render(
    <WinFrame title={name}>
      <AuthProvider isLogin={isLogin}>
        <AppRouter />
      </AuthProvider>
    </WinFrame>
  );
};

render();
