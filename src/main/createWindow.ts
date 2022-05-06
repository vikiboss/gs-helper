import { app, BrowserWindow } from "electron";
import { MAIN_WINDOW_WIDTH, MAIN_WINDOW_HEIGHT } from "../constants";

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export const isDev = !app.isPackaged;

const winOptions = {
  width: MAIN_WINDOW_WIDTH,
  height: MAIN_WINDOW_HEIGHT,
  frame: false,
  maximizable: false,
  backgroundColor: "#ebe7df",
  webPreferences: {
    preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
  }
};

const createWindow = () => {
  const win = new BrowserWindow(winOptions);

  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  win.setMenuBarVisibility(false);
  win.setResizable(false);

  return win;
};

export default createWindow;
