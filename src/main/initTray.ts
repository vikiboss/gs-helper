import path from "path";
import { app, Menu, Tray, BrowserWindow, MenuItemConstructorOptions } from "electron";

import icon from "../assets/icon.ico";
import { APP_NAME, MENU } from "../constants";
import { isDev } from "./createMainWindow";

const initTray = (win: BrowserWindow) => {
  const tray = new Tray(path.join(__dirname, icon));
  const web = win.webContents;

  const menus: MenuItemConstructorOptions[] = [
    { label: MENU.open, click: () => win.show(), accelerator: "CommandOrControl+Q" },
    {
      label: MENU.alwaysOnTop,
      type: "checkbox",
      checked: win.isAlwaysOnTop(),
      click: () => win.setAlwaysOnTop(!win.isAlwaysOnTop())
    },
    {
      label: MENU.openDevTools,
      visible: isDev,
      checked: web.isDevToolsOpened(),
      type: "checkbox",
      click: () => (web.isDevToolsOpened() ? web.closeDevTools() : web.openDevTools())
    },
    {
      label: MENU.quit,
      role: "close",
      click: () => app.quit(),
      accelerator: "CommandOrControl+Alt+Q"
    }
  ];

  const contextMenu = Menu.buildFromTemplate(menus);

  win.on("always-on-top-changed", (_, onTop) => (contextMenu.items[1].checked = onTop));
  web.on("devtools-opened", () => (contextMenu.items[2].checked = true));
  web.on("devtools-closed", () => (contextMenu.items[2].checked = false));

  tray.setToolTip(`${APP_NAME} v${app.getVersion()}`);
  tray.on("click", () => (win.isVisible() && !win.isMinimized() ? win.hide() : win.show()));
  tray.setContextMenu(contextMenu);

  app.on("will-quit", () => tray.destroy());
};

export default initTray;
