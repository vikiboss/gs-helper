const { contextBridge } = require("electron");

import { EXPOSEd_API_FROM_ELECTRON } from "../constants";

import getAppInfo from "./getAppInfo";

contextBridge.exposeInMainWorld(EXPOSEd_API_FROM_ELECTRON, {
  getAppInfo
});
