import { getCurrentUser } from '../ipc/getCurrentUser'
import { getServerByUid } from '../utils/getServerByUid'
import { request } from '../utils/request'

import type { BaseRes } from '@/types'

import { API_HK4E, LINK_BBS_REFERER } from '@/constants'

interface DayData {
  current_primogems: number
  current_mora: number
  last_primogems: number
  last_mora: number
}

interface GroupBy {
  action_id: number
  action: string
  num: number
  percent: number
}

interface MonthData {
  current_primogems: number
  current_mora: number
  last_primogems: number
  last_mora: number
  current_primogems_level: number
  primogems_rate: number
  mora_rate: number
  group_by: GroupBy[]
}

export interface MonthInfo {
  uid: number
  region: string
  account_id: number
  nickname: string
  date: string
  month: number
  optional_month: number[]
  data_month: number
  data_last_month: number
  day_data: DayData
  month_data: MonthData
  lantern: boolean
}

export async function getMonthInfo(month = 0) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return null
  }

  const { cookie, uid } = currentUser
  const url = `${API_HK4E}/event/ys_ledger/monthInfo`
  const params = { month, bind_uid: uid, bind_region: getServerByUid(uid) }
  const headers = { referer: LINK_BBS_REFERER, cookie }
  const config = { params, headers }

  const { status, data } = await request.get<BaseRes<MonthInfo>>(url, config)

  if (status !== 200 || data?.retcode !== 0) {
    console.log('getMonthInfo: ', data)
  }

  return data
}
