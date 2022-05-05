import { app, BrowserWindow } from "electron";

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const isDev = !app.isPackaged;

const winOptions = {
  width: 970,
  height: 600,
  // frame: false,
  webPreferences: {
    preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
  }
};

const createWindow = () => {
  const win = new BrowserWindow(winOptions);
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.setMenuBarVisibility(false);
  }

  return win;
};

export default createWindow;
