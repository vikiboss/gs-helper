import { BrowserWindow, BrowserWindowConstructorOptions, shell } from "electron";

// 声明内置常量
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

import { registerHotkey } from "./handleHotkeys";
import bindIPC from "./IPC";
import icon from "../assets/icon.ico";
import initTray from "./initTray";
import restoreSettings from "./restoreSettings";

// 配置窗口的选项参数
const winOptions: BrowserWindowConstructorOptions = {
  // 设置窗口默认的宽度、高度
  width: 970,
  height: 600,
  show: false,
  // 无边框窗口（自绘边框）
  frame: false,
  // 不可手动调整大小
  resizable: false,
  // 窗口 icon
  icon: icon,
  // 禁止最大化
  maximizable: false,
  // 禁止全屏
  fullscreenable: false,
  // 加载时的背景颜色
  backgroundColor: "#F9F6F2",
  // web 内容的偏好，此处设置 preload，用于 IPC 通信
  webPreferences: { preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY }
};

/** 创建主窗口的函数 */
const createMainWindow = () => {
  const win = new BrowserWindow(winOptions);

  // 移除窗口顶部的默认菜单栏
  win.removeMenu();
  // 监听准备好了的事件，当就绪时显示主窗口
  win.once("ready-to-show", () => win.show());
  // 阻止窗口边框右键单击
  win.once("system-context-menu", (e) => e.preventDefault());

  // 处理跳转，默认使用外部浏览器打开（比如 target 为 _blank 的 a 链接）
  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // 加载入口文件，这个入口常量是由 electron-forge 和 webpack 内置的
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // 注册 IPC 事件（用于 main 进程与 render 进程安全通信）
  void bindIPC(win);
  // 初始化托盘图标与菜单
  void initTray(win);
  // 恢复设置
  void restoreSettings(win);
  // 注册全局热键
  void registerHotkey(win);

  // 返回创建的窗口实例
  return win;
};

export default createMainWindow;
