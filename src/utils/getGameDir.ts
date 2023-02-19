import { app } from 'electron'
import fs from 'fs-extra'
import path from 'node:path'

import { GAME_NAME } from '../constants'
import { store } from '../main'

/** 获取原神游戏在本地启动日志里的安装目录 */
export function getGameDir() {
  const dir = store.get<string, ''>('settings.gameDir')

  if (dir) {
    if (fs.existsSync(dir)) {
      return path.join(dir, 'Genshin Impact Game')
    }

    store.set('settings.gameDir', '')
  }

  // 日志文件子路径
  const subPath = 'AppData/LocalLow/miHoYo'
  // 匹配系统语言对应的游戏名称
  const gameName = GAME_NAME[app.getLocale().includes('zh') ? 'zh' : 'en']
  // 日志文件名
  const filename = 'output_log.txt'

  // 拼接最终日志文件路径
  const logPath = path.join(app.getPath('home'), subPath, gameName, filename)

  // 尝试读取日志文件内容
  const logContent = fs.readFileSync(logPath, { encoding: 'utf8' })
  // 在日志文件里使用正则表达式搜索游戏安装目录
  const gameDirReg = /(\w:\/.+Genshin Impact)\//
  // 获取游戏安装目录
  const gameDir = gameDirReg.test(logContent) ? gameDirReg.exec(logContent)[1] : ''

  console.log('getGameDir: ', gameDir)

  if (gameDir && fs.existsSync(gameDir)) {
    store.set('settings.gameDir', gameDir)
    return path.join(gameDir, 'Genshin Impact Game')
  }

  return ''
}
