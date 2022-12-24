import { API_TAKUMI_RECORD, LINK_BBS_REFERER } from '../constants'
import { getCurrentUser } from '../main/IPC/getCurrentUser'
import { getDS } from '../utils/getDS'
import { getServerByUid } from '../utils/getServerByUid'
import { qs } from '../utils/utils'
import { request } from '../utils/request'

import type { BaseRes } from '../typings'

export type DispatchItem = {
  avatar_side_icon: string
  remained_time: string
  status: string
}

export type DailyNotesData = {
  current_expedition_num: number
  current_home_coin: number
  current_resin: number
  expeditions: DispatchItem[]
  finished_task_num: number
  home_coin_recovery_time: string
  is_extra_task_reward_received: boolean
  max_expedition_num: number
  max_home_coin: number
  max_resin: number
  remain_resin_discount_num: number
  resin_discount_num_limit: number
  resin_recovery_time: string
  total_task_num: number
  transformer: {
    obtained: boolean
    recovery_time: {
      Day: number
      Hour: number
      Minute: number
      Second: number
      reached: true
    }
  }
}

export async function getDailyNotes() {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return null
  }

  const { cookie, uid } = currentUser
  const url = `${API_TAKUMI_RECORD}/game_record/app/genshin/api/dailyNote`

  const params = { role_id: uid, server: getServerByUid(uid) }
  const headers = { referer: LINK_BBS_REFERER, cookie, DS: getDS(qs(params)) }

  const { status, data } = await request.get<BaseRes<DailyNotesData>>(url, {
    params,
    headers
  })

  // { data: null, message: 'Please login', retcode: 10001 }
  if (status !== 200 || data?.retcode !== 0) {
    console.log('getDailyNotes: ', data)
  }

  return data
}
