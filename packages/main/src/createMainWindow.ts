import { app, BrowserWindow, shell } from 'electron'
import { join } from 'node:path'

import { isDev } from '.'
import { registerHotkey } from './handleHotkeys'
import { initTray } from './initTray'
import { bindIPC } from './ipc'
import { restoreSettings } from './restoreSettings'
import icon from '../../resources/icon.ico'

import type { BrowserWindowConstructorOptions } from 'electron'

/** 配置窗口的选项参数 */
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
  icon,
  // 禁止最大化
  maximizable: false,
  // 禁止全屏
  fullscreenable: false,
  // 加载时的背景颜色
  backgroundColor: '#F9F6F2',
  // 设置 web 页面的 preload，用于 IPC 通信
  webPreferences: {
    preload: join(app.getAppPath(), 'packages/preload/dist/index.js')
  }
}

/** 创建主窗口的函数 */
export function createMainWindow() {
  const win = new BrowserWindow(winOptions)

  // 移除窗口顶部的默认菜单栏
  win.removeMenu()
  // 监听准备好了的事件，当就绪时显示主窗口
  win.once('ready-to-show', () => win.show())
  // 阻止窗口边框右键单击
  win.once('system-context-menu', (e) => e.preventDefault())

  // 处理跳转，默认使用外部浏览器打开（比如 target 为 _blank 的 a 链接）
  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString()

  // 加载入口文件
  win.loadURL(pageUrl)

  // for debug
  if (isDev) {
    win?.webContents.openDevTools({ mode: 'detach' })
  }

  // 注册 IPC 事件（用于 main 进程与 render 进程安全通信）
  bindIPC(win)
  // 初始化托盘图标与菜单
  initTray(win)
  // 恢复设置
  restoreSettings(win)
  // 注册全局热键
  registerHotkey(win)

  // 返回创建的窗口实例
  return win
}
