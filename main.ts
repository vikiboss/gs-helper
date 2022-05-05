import { app, BrowserWindow } from "electron";

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const isDev = !app.isPackaged;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    // frame: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  const isNotAppleDevice = process.platform !== "darwin";
  if (isNotAppleDevice) app.quit();
});

app.on("activate", () => {
  const noWindowExist = BrowserWindow.getAllWindows().length === 0;
  if (noWindowExist) createWindow();
});
