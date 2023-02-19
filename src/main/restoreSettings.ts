import { store } from '.'

import type { AppData } from '../typings'
import type { BrowserWindow } from 'electron'

/** 恢复用户偏好设置 */
export function restoreSettings(win: BrowserWindow) {
  const settings = store.get('settings') as AppData['settings']

  // console.log(settings);
  const { alwaysOnTop } = settings

  // win.setAlwaysOnTop(isDev || alwaysOnTop)

  win.setAlwaysOnTop(alwaysOnTop)
}
