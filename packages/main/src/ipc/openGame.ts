import { app } from 'electron'
import fs from 'fs-extra'
import cp from 'node:child_process'
import path from 'node:path'
import util from 'node:util'

import { getGameDir } from '../utils/getGameDir'

const exec = util.promisify(cp.exec)

const presetDirs = [
  'C:\\Program Files\\Genshin Impact\\Genshin Impact Game',
  'C:\\Genshin Impact\\Genshin Impact Game',
  'D:\\Program Files\\Genshin Impact\\Genshin Impact Game',
  'D:\\Genshin Impact\\Genshin Impact Game',
  'E:\\Program Files\\Genshin Impact\\Genshin Impact Game',
  'E:\\Genshin Impact\\Genshin Impact Game',
  'F:\\Program Files\\Genshin Impact\\Genshin Impact Game',
  'F:\\Genshin Impact\\Genshin Impact Game',
  'G:\\Program Files\\Genshin Impact\\Genshin Impact Game',
  'G:\\Genshin Impact\\Genshin Impact Game'
]

/** 本地启动游戏 */
export async function openGame() {
  // 系统语言
  const lang = app.getLocale()
  // 游戏本体可执行程序名
  const name = lang.includes('zh') ? 'YuanShen.exe' : 'GenshinImpact.exe'

  // 游戏安装目录
  let gameDir = getGameDir()

  if (!gameDir) {
    // 如果找不到游戏安装目录，尝试这几个默认位置
    presetDirs.forEach((dir) => {
      if (fs.existsSync(path.join(dir, name))) {
        console.log('dir found in preset:', gameDir)
        gameDir = dir
      }
    })
  }

  if (!gameDir) {
    return {
      code: -1,
      data: null,
      message: '原神安装目录检测失败，请先尝试打开一次祈愿历史记录页'
    }
  }

  try {
    console.log('exec:', path.join(gameDir, name))
    exec(name, { cwd: gameDir })
  } catch (e) {
    console.log(e)
  }

  return {
    code: 0,
    data: true,
    message: '原神正在启动中...'
  }
}
