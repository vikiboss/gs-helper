import { ipcRenderer } from "electron";

import { AppInfo } from "../types";
import { IPC_EVENTS } from "../constants";

const getAppInfo = (): Promise<AppInfo> => {
  return ipcRenderer.invoke(IPC_EVENTS.getAppInfo);
};

export default getAppInfo;
