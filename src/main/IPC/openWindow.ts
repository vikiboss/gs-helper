import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";

import { APP_USER_AGENT_DESKTOP } from "../../constants";
import { isDev } from "../createMainWindow";

const wins = new Map<string, BrowserWindow>();

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
  dom.setUserAgent(UA || APP_USER_AGENT_DESKTOP + app.getVersion());
  dom.loadURL(url);
};

export const ScriptRefineBBS = `
console.log("ScriptRefineBBS: 优化脚本开始执行");

let isCleared = false;
let timer = null;
const items = ["mhy-bbs-app-header", "mhy-button", "header-bar", "bbs-qr"];

const clear = () => {
  for (const item of items) {
    const els = document.getElementsByClassName(item);
    if (els.length) {
      console.log("ScriptRefineBBS: 检测到：" + item + "，已将其清除");
      isCleared = true;
      Array.from(els).forEach((e) => (e.style.display = "none"));
    }
  }

  if (isCleared) {
    clearInterval(timer);
    timer = null;
    console.log("ScriptRefineBBS: 脚本执行结束，已将目标清理完成");
  } else {
    console.log("ScriptRefineBBS: 未找到目标元素，刷新中...");
  }
};

timer = setInterval(clear, 500);

setTimeout(() => {
  if(timer) {
    clearInterval(timer)
    console.log("ScriptRefineBBS: 脚本执行结束，未发现待处理元素");
  };
}, 10000);
`;

export default openWindow;
