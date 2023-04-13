import dayjs from 'dayjs'
import { app } from 'electron'

import {
  API_HK4E,
  AppName,
  GachaTypeMap,
  TypeToUIGFTypeMap as TypeToUigfTypeMap
} from '../../../constants'
import { request } from '../utils/request'
import { deepClone, wait } from '../utils/utils'

import type { BaseRes, GachaData, GachaItem, RawGachaItem } from '../../../types'

interface RawGachaData {
  page: string
  size: string
  total: string
  list: RawGachaItem[]
  region: string
}

export const DefaultGachaData: GachaData = {
  info: {
    uid: '',
    lang: 'zh-cn',
    export_app: '',
    export_app_version: '',
    export_time: '',
    export_timestamp: '',
    update_time: '',
    uigf_version: 'v2.2'
  },
  list: []
}

export async function getGachaListByUrl(gachaUrl: string) {
  try {
    // 获取 URL 中的参数
    const urlParams = new URL(gachaUrl).searchParams

    // 默认的空数据
    const gacha: GachaData = deepClone(DefaultGachaData)

    // 填充 UIGF v2.2 格式数据的基本信息
    gacha.info.export_app = AppName.en
    gacha.info.export_app_version = app.getVersion()
    gacha.info.update_time = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')

    // 是否已获取 UID
    let hasUidSet = false

    // 依次按类型获取每类祈愿的数据
    for (const type of Object.keys(GachaTypeMap)) {
      // 拼接每个类型的起始 URL 参数
      urlParams.set('game_biz', 'hk4e_cn')
      urlParams.set('size', '20')
      urlParams.set('gacha_type', type)
      urlParams.set('page', '1')
      urlParams.set('end_id', '0')

      // 用于判断是否获取完成的标志
      let hasMore = true
      let times = 0

      // do while 循环，不断加载这个类型每一页的数据
      do {
        if (times > 0) {
          console.log('getGachaListByUrl: ', `retry the ${times}^th time...`)
        }

        // 拼接每一页数据的 URL
        const url = `${API_HK4E}/event/gacha_info/api/getGachaLog?${urlParams.toString()}`

        const { data, status } = await request.get<BaseRes<RawGachaData>>(url)

        // 如果返回状态异常，打印返回的内容
        if (data.retcode !== 0) {
          console.log('getGachaListByUrl: ', data)
        }

        // 如果返回状态正常
        if (status === 200 && data.retcode === 0) {
          // 如果返回列表为空，继续下一个类型的获取
          if (data.data.list.length === 0) break

          // 如果返回的列表数不满 20，则说明是最后一页（新手祈愿只有 20 次，只需要获取一次）
          if (data.data.list.length < 20 || type === '100') {
            hasMore = false
          }

          // 如果还未获取 UID，则进行设置
          if (!hasUidSet) {
            hasUidSet = true
            gacha.info.uid = data.data.list[0].uid
          }

          // 对返回的 list 列表进行数据处理（删除 uid 和 lang 字段）
          const list: GachaItem[] = data.data.list.map((item: RawGachaItem) => {
            if (item.uid) {
              delete item.uid
            }

            if (item.lang) {
              delete item.lang
            }

            return Object.assign(item, {
              uigf_gacha_type: TypeToUigfTypeMap[type]
            })
          })

          // 将 获取并处理过的列表数据 合并到 待返回的数据 里
          gacha.list.push(...list)

          // 处理下一页的 URL 参数
          urlParams.set('page', String(Number(urlParams.get('page')) + 1))
          urlParams.set('end_id', data.data.list.pop().id)
        } else {
          times++
          // 出错时打印异常
          console.log('getGachaListByUrl: ', data.data, data.retcode)

          const idx = urlParams.get('page')
          const error = `failed to fetch page ${idx} in type ${type}`

          console.log('getGachaListByUrl: ', error)
        }

        // 每加载一次数据，等待 500 毫秒，减轻米哈游服务器负担
        await wait(500)
      } while (hasMore && times <= 2)
    }

    // 返回新获取的数据
    return gacha
  } catch {
    return DefaultGachaData
  }
}
