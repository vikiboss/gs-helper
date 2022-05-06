import path from "path";
import { app, Menu, Tray, BrowserWindow, MenuItemConstructorOptions } from "electron";

import icon from "../assets/icon.ico";
import { isDev } from "./createMainWindow";
import { APP_NAME, MENU } from "../constants";

const initTray = (window: BrowserWindow) => {
  const tray = new Tray(path.join(__dirname, icon));

  const menus: MenuItemConstructorOptions[] = [
    { label: MENU.open, click: () => void window.show(), accelerator: "CommandOrControl+Q" },
    {
      label: MENU.alwaysOnTop,
      type: "checkbox",
      checked: window.isAlwaysOnTop(),
      click: () => void window.setAlwaysOnTop(!window.isAlwaysOnTop())
    },
    { type: "separator" },
    {
      label: MENU.quit,
      role: "close",
      click: () => void app.quit(),
      accelerator: "CommandOrControl+Alt+Q"
    }
  ];
  const web = window.webContents;
  const devMenu: MenuItemConstructorOptions[] = [
    {
      label: MENU.openDevTools,
      checked: web.isDevToolsOpened(),
      type: "checkbox",
      click: () => (web.isDevToolsOpened() ? web.closeDevTools() : web.openDevTools())
    },
    { type: "separator" }
  ];

  if (isDev) menus.splice(2, 0, ...devMenu);
  const contextMenu = Menu.buildFromTemplate(menus);

  tray.on("double-click", () => void (window.isVisible() ? window.hide() : window.show()));
  tray.setToolTip(`${APP_NAME} v${app.getVersion()}`);
  tray.setContextMenu(contextMenu);

  app.on("will-quit", () => void tray.destroy());
};

export default initTray;
