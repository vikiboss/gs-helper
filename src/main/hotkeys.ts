import { app, globalShortcut, BrowserWindow } from "electron";

const registerHotkey = (win: BrowserWindow) => {
  globalShortcut.register("CommandOrControl+Q", () =>
    win.isVisible() && !win.isMinimized() ? win.hide() : win.show()
  );

  globalShortcut.register("CommandOrControl+Alt+Q", () => void app.quit());
};

const unregisterHotkey = () => globalShortcut.unregisterAll();

export { registerHotkey, unregisterHotkey };
