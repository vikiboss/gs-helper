import { app, BrowserWindow } from "electron";

import initTray from "./initTray";
import bindIPC from "./bindIPC";
import createWindow from "./createWindow";

let win: BrowserWindow = null;

const isWinner = app.requestSingleInstanceLock();

if (isWinner) {
  app.on("second-instance", () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  app.on("ready", () => {
    win = createWindow();
    void initTray(win);
    void bindIPC(win);
  });

  app.on("window-all-closed", () => {
    const isNotAppleDevice = process.platform !== "darwin";
    if (isNotAppleDevice) app.quit();
  });

  app.on("activate", () => {
    const noWindowExist = BrowserWindow.getAllWindows().length === 0;
    if (noWindowExist) win = createWindow();
  });
} else {
  app.quit();
}
