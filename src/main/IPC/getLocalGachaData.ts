import { app } from 'electron'
import fs from 'fs-extra'
import path from 'node:path'

import { AppName } from '../../constants'

import type { GachaData } from '../../typings'

// 尝试获取本地所有祈愿数据
export function getLocalGachaData() {
  // 获取当前的软件目录
  const AppPath = app.getPath('userData')
  // 获取存放所有祈愿数据的目录
  const gachaDataDirPath = path.join(AppPath, 'GachaDatas')
  // 若该目录不存在
  if (!fs.existsSync(gachaDataDirPath)) {
    // 旧版的祈愿数据目录
    const fallbackPath = path.join(AppPath.replace(app.getName(), AppName.zh), 'GachaDatas')
    // 判断旧版的目录是否存在
    if (fs.existsSync(fallbackPath)) {
      // 如果存在则迁移
      fs.cpSync(`${fallbackPath}/`, `${gachaDataDirPath}/`, { force: true, recursive: true })
    } else {
      // 如不存在则创建祈愿数据的目录，并返回空数据
      fs.mkdirSync(gachaDataDirPath)
      return []
    }
  }
  // 尝试获取存放祈愿数据的目录下所有的数据
  const res = fs.readdirSync(gachaDataDirPath, { withFileTypes: true })
  // 待处理数据文件名列表
  const gachaFiles: string[] = []
  // 遍历存放祈愿数据的目录下所有的内容
  res.forEach((e) => {
    // 如果是 json 文件，且名字符合
    if (e.isFile && e.name.match(/^[0-9]{8,10}.json$/)) {
      // 将文件名加入待处理数据文件名列表
      gachaFiles.push(e.name)
    }
  })

  // 最终返回的数据
  const gachas: GachaData[] = []
  // 遍历待处理数据文件名列表
  gachaFiles.forEach((filename) => {
    // 拼接文件路径
    const filePath = path.join(gachaDataDirPath, filename)
    // 读取 JSON 文件内容
    const content = fs.readFileSync(filePath, { encoding: 'utf-8' })
    try {
      // 尝试解析，并将成功解析的数据存入列表
      const data = JSON.parse(content)
      gachas.push(data)
    } catch (e: any) {
      console.log(e)
    }
  })

  // 返回数据
  return gachas
}
