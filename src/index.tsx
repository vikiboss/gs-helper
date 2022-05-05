import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { ContextApi } from "./types";

declare var window: Window & { api: ContextApi };

(async () => {
  const root = createRoot(document.getElementById("app"));
  root.render(<App />);

  const appInfo = await window.api.getAppInfo();
  document.title = document.title + " v" + appInfo.version;
})();
