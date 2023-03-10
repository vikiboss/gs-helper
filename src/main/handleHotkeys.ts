import { app, globalShortcut } from 'electron'

import type { BrowserWindow } from 'electron'

// 一系列热键操作函数

/** 注册全局热键 */
export function registerHotkey(win: BrowserWindow) {
  // 注册老板键
  globalShortcut.register('CommandOrControl+Q', () =>
    win.isVisible() && !win.isMinimized() ? win.hide() : win.show()
  )

  // 注册退出键
  globalShortcut.register('Alt+F4', () => app.quit())
}

/** 取消注册所有全局热键 */
export function unregisterHotkey() {
  globalShortcut.unregisterAll()
}
