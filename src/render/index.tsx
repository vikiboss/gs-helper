import React from "react";
import { createRoot } from "react-dom/client";

import AppRouter from "./router";
import { APP_NAME } from "../constants";
import nativeApi from "./utils/nativeApi";
import AuthProvider from "./auth/AuthProvider";
import WinFrame from "./components/WinFrame";

import "./index.less";

const root = createRoot(document.getElementById("app"));

const render = async () => {
  // const { version } = await nativeApi.getAppInfo();
  const isLogin = Boolean(await nativeApi.getStoreKey("currentUid"));
  // const title = `${APP_NAME} v${version}`;
  root.render(
    <WinFrame title={APP_NAME}>
      <AuthProvider isLogin={isLogin}>
        <AppRouter />
      </AuthProvider>
    </WinFrame>
  );
};

render();
