import { app, BrowserWindow } from "electron";
import { v4 as uuid } from "uuid";

import initTray from "./initTray";
import bindIPC from "./bindIPC";
import createMainWindow from "./createMainWindow";
import { registerHotkey, unregisterHotkey } from "./hotkeys";

let mainWin: BrowserWindow = null;
const windows = [];

const isWinner = app.requestSingleInstanceLock();

if (isWinner) {
  app.on("second-instance", () => {
    if (!mainWin) return;
    if (mainWin.isMinimized()) mainWin.restore();
    mainWin.focus();
  });

  app.on("ready", () => {
    mainWin = createMainWindow();
    windows.push(mainWin);
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
    windows.push(mainWin);
  });

  app.on("will-quit", () => void unregisterHotkey());
} else {
  app.quit();
}
