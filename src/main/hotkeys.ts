import { app, globalShortcut, BrowserWindow } from "electron";

const registerHotkey = (window: BrowserWindow) => {
  const cq = globalShortcut.register("CommandOrControl+Q", () =>
    window.isVisible() ? window.hide() : window.show()
  );

  const f12 = globalShortcut.register("F12", () => {
    const web = window.webContents;
    web.isDevToolsOpened() ? web.closeDevTools() : web.openDevTools();
  });

  globalShortcut.register("CommandOrControl+Alt+Q", () => void app.quit());

  console.log(cq, f12);
};

const unregisterHotkey = () => globalShortcut.unregisterAll();

export { registerHotkey, unregisterHotkey };
