import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";

import { APP_USER_AGENT_DESKTOP } from "../../constants";
import { isDev } from "..";

const wins = new Map<string, BrowserWindow>();

const openWindow = async (
  _: Electron.IpcMainEvent,
  url: string,
  options: BrowserWindowConstructorOptions = {},
  UA?: string
): Promise<void> => {
  if (wins.has(url)) {
    return wins.get(url).show();
  }

  const win = new BrowserWindow({
    width: 1300,
    height: 803,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#F9F6F2",
    ...options
  });

  if (!isDev) {
    win.removeMenu();
  }

  wins.set(url, win);
  win.once("ready-to-show", () => win.show());
  win.on("close", () => wins.delete(url));

  const dom = win.webContents;

  dom.setWindowOpenHandler((details) => {
    dom.loadURL(details.url);
    return { action: "deny" };
  });

  dom.setUserAgent(UA || APP_USER_AGENT_DESKTOP + app.getVersion());
  dom.loadURL(url);
};

export default openWindow;
