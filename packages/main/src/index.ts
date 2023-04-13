import { app, BrowserWindow } from 'electron'

import { createMainWindow } from './createMainWindow'
import { unregisterHotkey } from './handleHotkeys'
import { initStore } from './initStore'

import type { AppData } from '@/types'
import type Store from 'electron-store'

// 导出 主窗口 与 Store 方便其他部分进行引用

// 在外层定义主窗口，并导出，方便其他子窗口创建时进行引用
export let mainWin: BrowserWindow = null
// Store 用于存储与恢复软件数据（配置、状态等）
export let store: Store<AppData>

// 禁用硬件加速
app.disableHardwareAcceleration()

// 单例模式
const isWinner = app.requestSingleInstanceLock()

// 用以代表开发模式的变量，导出以供其他部分引用
export const isDev = !app.isPackaged
// Windows
export const isWindows = process.platform === 'win32'
// macOS
export const isAppleDevice = process.platform === 'darwin'

// 如果不是第一个实例，直接退出
if (!isWinner) {
  app.quit()
}

// 以下是第一个实例的逻辑，监听第二实例的启动事件

// 检测到第二次启动的时候，若第一个实例窗口未关闭，则前置显示第一个实例，不再重复创建
app.on('second-instance', () => mainWin?.show())

// 程序准备完毕的事件
app.on('ready', () => {
  // 隐藏 dock 图标
  // if (isAppleDevice) {
  //   app.dock.hide()
  // }
  // 初始化 Store （读取配置）
  store = initStore()
  // 创建主窗口
  mainWin = createMainWindow()
})

// 监听窗口全部关闭的事件
app.on('window-all-closed', () => {
  // 不是苹果设备则退出
  if (!isAppleDevice) {
    app.quit()
  }
})

// 监听程序激活事件
app.on('activate', () => {
  const windowExist = BrowserWindow.getAllWindows().length !== 0
  if (windowExist) {
    return
  }
  // 如果不存在任何窗口，则创建主窗口
  mainWin = createMainWindow()
})

// 监听程序退出的事件，善后，取消注册全局热键
app.on('before-quit', () => isWindows && unregisterHotkey())
