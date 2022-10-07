import { store } from ".";

import type { BrowserWindow } from "electron";
import type { AppData } from "../typings";

/** 恢复用户偏好设置 */
const restoreSettings = (win: BrowserWindow) => {
  const settings = store.get("settings") as AppData["settings"];
  // console.log(settings);
  const { alwaysOnTop } = settings;
  win.setAlwaysOnTop(alwaysOnTop);
};

export default restoreSettings;
