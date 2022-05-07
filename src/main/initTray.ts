import path from "path";
import { app, Menu, Tray, BrowserWindow, MenuItemConstructorOptions } from "electron";

import icon from "../assets/icon.ico";
import { APP_NAME, MENU } from "../constants";
// import { isDev } from "./createMainWindow";

const initTray = (win: BrowserWindow) => {
  const tray = new Tray(path.join(__dirname, icon));

  const menus: MenuItemConstructorOptions[] = [
    { label: MENU.open, click: () => win.show(), accelerator: "CommandOrControl+Q" },
    {
      label: MENU.alwaysOnTop,
      type: "checkbox",
      checked: win.isAlwaysOnTop(),
      click: () => win.setAlwaysOnTop(!win.isAlwaysOnTop())
    },
    { type: "separator" },
    {
      label: MENU.quit,
      role: "close",
      click: () => app.quit(),
      accelerator: "CommandOrControl+Alt+Q"
    }
  ];
  
  const web = win.webContents;
  const devMenu: MenuItemConstructorOptions[] = [
    {
      label: MENU.openDevTools,
      checked: web.isDevToolsOpened(),
      type: "checkbox",
      click: () => (web.isDevToolsOpened() ? web.closeDevTools() : web.openDevTools())
    },
    { type: "separator" }
  ];

  menus.splice(2, 0, ...devMenu);
  // if (isDev) menus.splice(2, 0, ...devMenu);
  const contextMenu = Menu.buildFromTemplate(menus);

  tray.on("double-click", () => (win.isVisible() && win.isFocused() ? win.hide() : win.show()));
  tray.setToolTip(`${APP_NAME} v${app.getVersion()}`);
  tray.setContextMenu(contextMenu);

  app.on("will-quit", () => tray.destroy());
};

export default initTray;
