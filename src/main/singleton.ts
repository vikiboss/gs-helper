import { app, BrowserWindow } from "electron";

import createWindow from "./createWindow";

let win: BrowserWindow = null;

const isWinner = app.requestSingleInstanceLock();

if (isWinner) {
  app.on("second-instance", () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  app.on("ready", () => void (win = createWindow()));

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
