import path from "path";
import { app, BrowserWindow, Menu, MenuItemConstructorOptions, Tray } from "electron";

import icon from "../assets/icon.ico";
import { isDev } from "./createWindow";

const initTray = (window: BrowserWindow) => {
  const tray = new Tray(path.join(__dirname, icon));
  const menus: MenuItemConstructorOptions[] = [
    { label: "打开原神助手", click: () => window.show() },
    { type: "separator" },
    { label: "退出", role: "close", click: () => app.quit() }
  ];
  const devMenu: MenuItemConstructorOptions[] = [
    { label: "Open DevTools", click: () => window.webContents.openDevTools() },
    { type: "separator" }
  ];
  if (isDev) menus.splice(2, 0, ...devMenu);
  const contextMenu = Menu.buildFromTemplate(menus);
  tray.setToolTip(`原神助手 v${app.getVersion()}`);
  tray.setContextMenu(contextMenu);
};

export default initTray;
