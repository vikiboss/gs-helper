import React from "react";
import { createRoot } from "react-dom/client";
import WindowFrame from "./components/WindowFrame";

import Home from "./pages/Home";

import "./index.less";

const root = createRoot(document.getElementById("app"));

root.render(
  <WindowFrame>
    <Home />
  </WindowFrame>
);
