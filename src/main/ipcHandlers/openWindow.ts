import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

import { APP_USER_AGENT_DESKTOP } from "../../constants";
import { isDev } from "../createMainWindow";

const wins = new Map<string, BrowserWindow>();

const ScriptRefineBBS = `
var items = ["mhy-bbs-app-header", "mhy-button", "header-bar", "bbs-qr"];
for (const item of items) {
  const els = document.getElementsByClassName(item);
  if (els.length) Array.from(els).forEach((e) => (e.style.display = "none"));
}
`;

const openWindow = async (
  _: Electron.IpcMainEvent,
  url: string,
  options: BrowserWindowConstructorOptions = {},
  UA?: string
): Promise<void> => {
  if (wins.has(url)) return wins.get(url).show();
  const win = new BrowserWindow({
    width: 1300,
    height: 803,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#F9F6F2",
    ...options
  });

  if (!isDev) win.removeMenu();
  wins.set(url, win);
  win.once("ready-to-show", () => win.show());
  win.on("close", () => wins.delete(url));

  const dom = win.webContents;

  dom.setWindowOpenHandler((details) => {
    dom.loadURL(details.url);
    return { action: "deny" };
  });

  dom.on("did-finish-load", () => dom.executeJavaScript(ScriptRefineBBS));
  dom.setUserAgent(UA || APP_USER_AGENT_DESKTOP);
  dom.loadURL(url);
};

export default openWindow;
