import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";

import { APP_USER_AGENT_DESKTOP } from "../../constants";
import { isDev, store } from "..";

const openWindow = async (
  _: Electron.IpcMainEvent,
  url: string,
  options: BrowserWindowConstructorOptions = {},
  UA?: string
): Promise<void> => {
  const win = new BrowserWindow({
    width: 1300,
    height: 803,
    autoHideMenuBar: true,
    backgroundColor: "#F9F6F2",
    alwaysOnTop: store.get("settings").alwaysOnTop ?? false,
    ...options
  });

  if (!isDev) {
    win.removeMenu();
  }

  const dom = win.webContents;

  // 在窗口内跳转
  dom.setWindowOpenHandler((details) => {
    dom.loadURL(details.url);
    return { action: "deny" };
  });

  // 设置 UA
  dom.setUserAgent(UA || APP_USER_AGENT_DESKTOP + app.getVersion());

  // 加载页面
  dom.loadURL(url);

  // 鼠标右键返回上一页面
  dom.addListener("context-menu", () => {
    if (dom.canGoBack()) {
      dom.goBack();
    }
  })
};

export default openWindow;
