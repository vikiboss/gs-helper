import { store } from ".";

import type { BrowserWindow } from "electron";
import type { AppData } from "../typings";

/** 恢复用户偏好设置 */
const restoreSettings = (win: BrowserWindow) => {
  const settins = store.get("settings") as AppData["settings"];
  console.log(settins);
  const { alwaysOnTop } = settins;
  win.setAlwaysOnTop(alwaysOnTop);
};

export default restoreSettings;
