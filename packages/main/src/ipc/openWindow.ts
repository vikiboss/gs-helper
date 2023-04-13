import { app, BrowserWindow } from 'electron'

import { isDev, store } from '..'

import type { BrowserWindowConstructorOptions } from 'electron'

import { APP_USER_AGENT_DESKTOP } from '@/constants'

export const subWins: Set<BrowserWindow> = new Set()

export async function openWindow(
  _: Electron.IpcMainEvent,
  url: string,
  options: BrowserWindowConstructorOptions = {},
  UA = ''
) {
  const win = new BrowserWindow({
    width: 1300,
    height: 803,
    autoHideMenuBar: true,
    backgroundColor: '#F9F6F2',
    alwaysOnTop: isDev || store.get('settings').alwaysOnTop,
    ...options
  })

  if (!isDev) {
    win.removeMenu()
  }

  subWins.add(win)

  win.addListener('close', () => subWins.delete(win))

  const dom = win.webContents

  // 在窗口内跳转
  dom.setWindowOpenHandler((details) => {
    dom.loadURL(details.url)
    return { action: 'deny' }
  })

  // 设置 UA
  dom.setUserAgent(UA || APP_USER_AGENT_DESKTOP + app.getVersion())

  // 加载页面
  dom.loadURL(url)

  // 鼠标右键返回上一页面
  dom.addListener('context-menu', () => {
    if (dom.canGoBack()) {
      dom.goBack()
    }
  })
}
