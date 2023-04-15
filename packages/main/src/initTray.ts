import { app, Menu, Tray, nativeImage } from 'electron'
import path from 'node:path'

import { store, isAppleDevice, isWindows } from '.'
import { subWins } from './ipc/openWindow'
import icon from '../../resources/icon.ico'
import macIcon from '../../resources/mac-icon.png'

import type { BrowserWindow, MenuItemConstructorOptions } from 'electron'

import { AppName } from '@/constants'

export const Menus: Record<string, string> = {
  openMainWindow: '打开助手',
  alwaysOnTop: '置顶显示',
  openDevTools: 'DevTools',
  hideMainWindow: '隐藏主界面',
  openSetting: '设置',
  quit: '退出'
}

/** 初始化托盘图标与菜单 */
export function initTray(win: BrowserWindow) {
  const filename = isAppleDevice ? 'mac-icon.png' : 'icon.ico'
  const filePath = path.join(__dirname, '../../resources', filename)

  const image = nativeImage.createFromPath(filePath)

  // 设置图片为自动适应模式的黑白图标
  if (isAppleDevice) {
    image.setTemplateImage(true)
  }

  // 初始化托盘图标
  const tray = new Tray(image)

  // 主窗口的 webContents 用于控制 DevTools 的开关
  const web = win.webContents

  // 定义托盘菜单
  const menus: MenuItemConstructorOptions[] = [
    // 显示主程序
    {
      label: Menus.openMainWindow,
      click: () => win.show(),
      accelerator: 'CommandOrControl+Q'
    },
    // 置顶菜单
    {
      label: Menus.alwaysOnTop,
      type: 'checkbox',
      // visible: isDev,
      checked: store.get('settings.alwaysOnTop'),
      click: () => {
        const targetValue = !win.isAlwaysOnTop()
        store.set('settings.alwaysOnTop', targetValue)
        win.setAlwaysOnTop(targetValue)
        subWins.forEach((e) => e.setAlwaysOnTop(targetValue))
      }
    },
    // 切换 DevTools 开启状态
    {
      label: Menus.openDevTools,
      // visible: isDev,
      click: () => web.openDevTools({ mode: 'detach' })
    },
    // 打开设置
    {
      label: Menus.openSetting,
      // visible: isDev,
      click: () => {
        const url = web.getURL()
        const target = `${url.split('#')[0]}#/setting`
        win.loadURL(target)
        win.show()
      }
    },
    // 退出
    {
      label: Menus.quit,
      role: 'close',
      click: () => app.exit()
    }
  ]

  // 生成菜单
  const contextMenu = Menu.buildFromTemplate(menus)

  // 设置托盘菜单提示文字
  tray.setToolTip(`${AppName.zh} v${app.getVersion()}`)

  // 监听点击事件，绑定程序的显示与隐藏操作
  // tray.on("click", () => (win.isVisible() && !win.isMinimized() ? win.hide() : win.show()));
  tray.on('click', () => isWindows && win.show())

  // 双击显示主界面
  tray.on('double-click', () => win.show())

  // 加载托盘右键菜单
  tray.setContextMenu(contextMenu)

  // 监听即将退出的事件，销毁托盘图标与菜单
  app.on('before-quit', () => tray.destroy())

  // 当置顶状态发生改变时，将状态写入 Store，同时及时刷新菜单的状态显示
  win.on('always-on-top-changed', (_, onTop) => {
    contextMenu.items[1].checked = onTop
    // 刷新托盘右键菜单
    tray.setContextMenu(contextMenu)
    store.set('settings.alwaysOnTop', onTop)
  })
}
