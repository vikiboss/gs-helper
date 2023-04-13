import { app } from 'electron'
import fs from 'fs-extra'
import path from 'node:path'

import { DefaultAppData } from '../initStore'

export async function clearData() {
  // 获取当前的软件目录
  const AppPath = app.getPath('userData')

  // 获取配置文件路径
  const GachaDataDirPath = path.join(AppPath, 'config.json')

  // 配置文件不存在则返回
  if (!fs.existsSync(GachaDataDirPath)) {
    return true
  }

  // 当配置文件存在
  try {
    // 尝试删除配置文件
    fs.unlinkSync(GachaDataDirPath)

    // 写入默认配置
    fs.writeJsonSync(GachaDataDirPath, DefaultAppData, { spaces: 2 })

    return true
  } catch {
    return false
  }
}
