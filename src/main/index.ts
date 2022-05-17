import { app, BrowserWindow } from "electron";
import Store from "electron-store";

import { registerHotkey, unregisterHotkey } from "./hotkeys";
import bindIPC from "./bindIPC";
import createMainWindow from "./createMainWindow";
import initStore from "./initStore";
import initTray from "./initTray";
import restoreSettings from "../utils/restoreSettings";

import type { AppData } from "../typings";

let mainWin: BrowserWindow = null;
let store: Store<AppData>;

app.disableHardwareAcceleration();

const isWinner = app.requestSingleInstanceLock();

if (isWinner) {
  app.on("second-instance", () => {
    if (!mainWin) return;
    mainWin.show();
  });

  app.on("ready", () => {
    mainWin = createMainWindow();
    store = initStore();
    void initTray(mainWin);
    void restoreSettings(mainWin);
    void registerHotkey(mainWin);
    void bindIPC(mainWin);
  });

  app.on("window-all-closed", () => {
    const isNotAppleDevice = process.platform !== "darwin";
    if (isNotAppleDevice) app.quit();
  });

  app.on("activate", () => {
    const windowExist = BrowserWindow.getAllWindows().length !== 0;
    if (windowExist) return;
    mainWin = createMainWindow();
  });

  app.on("will-quit", () => void unregisterHotkey());
} else {
  app.quit();
}

export { mainWin, store };
