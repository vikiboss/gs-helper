import { app, globalShortcut, BrowserWindow } from "electron";

const registerHotkey = (window: BrowserWindow) => {
  globalShortcut.register("CommandOrControl+Q", () =>
    window.isVisible() ? window.hide() : window.show()
  );

  globalShortcut.register("CommandOrControl+Alt+Q", () => void app.quit());
};

const unregisterHotkey = () => globalShortcut.unregisterAll();

export { registerHotkey, unregisterHotkey };
