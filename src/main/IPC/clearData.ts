import fs from 'node:fs/promises'
import path from 'node:path'
import { app } from 'electron'

import { isFileExist } from '../../utils/nodeUtils'
import { DefaultAppData } from '../initStore'

const clearData = async () => {
  // 获取当前的软件目录
  const AppPath = app.getPath('userData')

  // 获取配置文件路径
  const GachaDataDirPath = path.join(AppPath, 'config.json')

  // 配置文件不存在则返回
  if (!isFileExist(GachaDataDirPath)) {
    return true
  }

  // 当配置文件存在
  try {
    // 尝试删除配置文件
    await fs.unlink(GachaDataDirPath)

    // 读取默认配置
    const data = JSON.stringify(DefaultAppData, undefined, 2)

    // 写入默认配置
    await fs.writeFile(GachaDataDirPath, data, { encoding: 'utf-8' })

    return true
  } catch {
    return false
  }
}

export default clearData
