import React from "react";

import "./style.less";

import { ContextApi } from "./types";

declare const window: Window & { api: ContextApi };
const api = window.api;

const App: React.FC = () => {
  const handleClick = async () => {};

  return <h1 onClick={handleClick}>Hello Electron</h1>;
};

export default App;
