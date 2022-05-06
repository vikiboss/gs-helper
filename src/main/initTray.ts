import path from "path";
import { app, BrowserWindow, Menu, MenuItemConstructorOptions, Tray } from "electron";

import icon from "../assets/icon.ico";
import { isDev } from "./createWindow";
import { APP_NAME, MENU } from "../constants";

const initTray = (window: BrowserWindow) => {
  const tray = new Tray(path.join(__dirname, icon));

  const menus: MenuItemConstructorOptions[] = [
    { label: MENU.open, click: () => void window.show() },
    { type: "separator" },
    { label: MENU.quit, role: "close", click: () => void app.quit() }
  ];
  const devMenu: MenuItemConstructorOptions[] = [
    { label: MENU.openDevTools, click: () => void window.webContents.openDevTools() },
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
