import fs from 'fs-extra'
import path from 'node:path'
import { app } from 'electron'

import { DefaultGachaData } from '../services/getGachaListByUrl'
import { mergeGachaList } from './mergeGachaList'

import type { GachaData } from '../typings'

// 通过新的抽卡数据来更新配置文件里的抽卡数据
export function updateLocalGachaData(gacha: GachaData) {
  // 获取新的数据的 UID
  const { uid } = gacha.info

  // 获取当前的软件目录
  const AppPath = app.getPath('userData')
  // 获取存放所有祈愿数据的文件夹路径
  const GachaDataDirPath = path.join(AppPath, 'GachaDatas')

  // 若该文件夹不存在，则创建
  if (!fs.existsSync(GachaDataDirPath)) {
    fs.mkdirSync(GachaDataDirPath)
  }

  // 获取该 UID 的数据文件路径
  const GachaFilePath = path.join(GachaDataDirPath, `${uid}.json`)
  const isNewData = !fs.existsSync(GachaFilePath)

  if (isNewData) {
    // 如果该 UID 数据不存在，则说明是第一次获取

    // 预处理数据（排序等）
    const list = mergeGachaList([], gacha.list)
    const data = { info: gacha.info, list }

    // 写入本地文件
    fs.writeFileSync(GachaFilePath, JSON.stringify(data))

    // 直接返回参数里的祈愿数据
    return data
  }
  // 如果该 UID 数据存在，则先读取旧数据，然后做合并处理
  try {
    // 读取旧数据
    const LocalGachaStr = fs.readFileSync(GachaFilePath, { encoding: 'utf-8' })
    const LocalGacha = JSON.parse(LocalGachaStr) as GachaData

    // 合并处理
    const list = mergeGachaList(LocalGacha.list, gacha.list)

    // 写入新数据
    const data = { info: gacha.info, list }
    const fileContent = JSON.stringify(data)
    fs.writeFileSync(GachaFilePath, fileContent)

    // 返回合并后的祈愿数据
    return data
  } catch {
    // JSON 解析出错时，返回空数据
    return DefaultGachaData
  }
}
