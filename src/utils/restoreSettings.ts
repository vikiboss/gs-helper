import { store } from "../main";

import type { BrowserWindow } from "electron";
import type { AppData } from "../typings";

const restoreSettings = (win: BrowserWindow) => {
  const settins = store.get("settings") as AppData["settings"];
  // console.log(settins);
  const { alwaysOnTop } = settins;
  win.setAlwaysOnTop(alwaysOnTop);
};

export default restoreSettings;
