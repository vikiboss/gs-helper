import Store from "electron-store";
import { app, BrowserWindow } from "electron";

import initTray from "./initTray";
import initStore from "./initStore";
import bindIPC from "./bindIPC";
import createMainWindow from "./createMainWindow";
import { registerHotkey, unregisterHotkey } from "./hotkeys";

let mainWin: BrowserWindow = null;
let store: Store;

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
