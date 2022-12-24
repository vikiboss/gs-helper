import fs from 'fs-extra'
import dayjs from 'dayjs'
import { app, dialog } from 'electron'

import { AppName } from '../../constants'
import { getLocalGachaDatas } from './getLocalGachaDatas'
import { mainWin } from '..'
import { updateLocalGachaData } from '../../utils/updateLocalGachaData'

import type { GachaData } from '../../typings'

/** 通过 UID 导出本地的 JSON 祈愿数据 */
export async function exportGacha(uid: string) {
  const now = dayjs().format('YYYYMMDDHHmmss')

  // 保存文件对话框
  const { filePath } = await dialog.showSaveDialog(mainWin, {
    title: `导出 UID ${uid} 的祈愿记录数据文件`,
    defaultPath: `${app.getPath('desktop')}/${uid}-${now}.json`,
    buttonLabel: '导出'
  })

  if (!filePath) {
    return {
      code: -1,
      data: null,
      message: '已取消导出操作'
    }
  }

  // 找到对应的 uid 祈愿数据文件
  const data = getLocalGachaDatas().find((e) => e.info.uid === uid)

  if (!data) {
    return {
      code: -1,
      data: null,
      message: '目标 uid 不存在'
    }
  }

  data.info.lang = 'zh-cn'
  data.info.uigf_version = 'v2.2'
  data.info.export_app = AppName.en
  data.info.export_app_version = app.getVersion()
  data.info.export_time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  data.info.export_timestamp = Date.now() + ''

  // 尝试写出文件
  fs.writeJsonSync(filePath, data)

  return { code: 0, data, message: `已成功导出 UID ${uid} 的祈愿数据！` }
}

/** 导入 JSON 祈愿数据 */
export async function importGacha() {
  // 打开对话框, 选择 JSON 文件
  const { filePaths } = await dialog.showOpenDialog(mainWin, {
    title: '导入祈愿记录数据文件',
    defaultPath: app.getPath('desktop'),
    buttonLabel: '导入',
    filters: [
      {
        name: 'JSON 文件',
        extensions: ['json']
      }
    ],
    properties: ['showHiddenFiles', 'openFile']
  })

  if (!filePaths.length) {
    return {
      code: -1,
      data: null,
      message: '已取消导入操作'
    }
  }

  const content = fs.readJsonSync(filePaths[0], { encoding: 'utf8' })
  const config = JSON.parse(content) as GachaData

  if (!config.info || !config.list) {
    return {
      code: 1,
      data: null,
      message: '格式解析失败，请导入符合要求的 JSON 数据'
    }
  }

  updateLocalGachaData(config)

  return {
    code: 0,
    data: config,
    message: `已成功导入 UID ${config.info.uid} 的祈愿数据！`
  }
}
