import { app, BrowserWindow } from "electron";
import Store from "electron-store";

import { registerHotkey, unregisterHotkey } from "./hotkeys";
import bindIPC from "./bindIPC";
import createMainWindow from "./createMainWindow";
import initStore from "./initStore";
import initTray from "./initTray";
import restoreSettings from "./restoreSettings";

import type { AppData } from "../typings";

// 在外层定义主窗口，并导出，方便其他子窗口创建时进行引用
let mainWin: BrowserWindow = null;
// Store 用于存储与恢复软件数据（配置、状态等）
let store: Store<AppData>;

// 禁用硬件加速
app.disableHardwareAcceleration();

// 单例模式
const isWinner = app.requestSingleInstanceLock();

// 如果不是第一个实例，直接退出
if (!isWinner) app.quit();

// 以下是第一个实例的逻辑，监听第二实例的启动事件

// 检测到第二次启动的时候，若第一个实例窗口未关闭，则前置显示第一个实例，不再重复创建
app.on("second-instance", () => mainWin?.show());

// 程序准备完毕的事件
app.on("ready", () => {
  // 创建主窗口
  mainWin = createMainWindow();
  // 初始化 Store （读取配置）
  store = initStore();
  // 初始化托盘图标与菜单
  void initTray(mainWin);
  // 恢复设置
  void restoreSettings(mainWin);
  // 注册全局热键
  void registerHotkey(mainWin);
  // 注册 IPC 事件（用于 main 进程与 render 进程安全通信）
  void bindIPC(mainWin);
});

// 监听窗口全部关闭的事件
app.on("window-all-closed", () => {
  // 不是苹果设备则退出，反正只是写给 Windows 用的，没啥用（
  const isNotAppleDevice = process.platform !== "darwin";
  if (isNotAppleDevice) app.quit();
});

// 监听程序激活事件
app.on("activate", () => {
  const windowExist = BrowserWindow.getAllWindows().length !== 0;
  if (windowExist) return;
  // 如果不存在任何窗口，则创建主窗口
  mainWin = createMainWindow();
});

// 监听程序退出的事件，善后，取消注册全局热键
app.on("will-quit", () => void unregisterHotkey());

// 导出 主窗口 与 Store 方便其他部分进行引用
export { mainWin, store };
