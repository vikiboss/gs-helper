import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";

import { MAIN_WINDOW_WIDTH, MAIN_WINDOW_HEIGHT, WINDOW_BACKGROUND_COLOR } from "../constants";

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export const isDev = !app.isPackaged;

const winOptions: BrowserWindowConstructorOptions = {
  width: MAIN_WINDOW_WIDTH,
  height: MAIN_WINDOW_HEIGHT,
  frame: false,
  maximizable: false,
  fullscreenable: false,
  backgroundColor: WINDOW_BACKGROUND_COLOR,
  webPreferences: {
    preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
  }
};

const createMainWindow = () => {
  const win = new BrowserWindow(winOptions);

  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  win.setMenuBarVisibility(false);
  win.setResizable(false);

  return win;
};

export default createMainWindow;
