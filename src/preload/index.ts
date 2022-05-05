const { contextBridge } = require("electron");

import { EXPOSED_API_FROM_ELECTRON } from "../constants";

import getAppInfo from "./getAppInfo";

contextBridge.exposeInMainWorld(EXPOSED_API_FROM_ELECTRON, {
  getAppInfo
});
