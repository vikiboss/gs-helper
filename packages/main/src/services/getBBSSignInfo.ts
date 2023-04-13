import { getBBSSignActId } from './getBBSSignActId'
import { getCurrentUser } from '../ipc/getCurrentUser'
import { getServerByUid } from '../utils/getServerByUid'
import { request } from '../utils/request'

import type { BaseRes } from '@/types'

import { API_TAKUMI, LINK_BBS_REFERER } from '@/constants'

export interface SignInfo {
  first_bind: boolean
  is_sign: boolean
  is_sub: boolean
  month_first: boolean
  sign_cnt_missed: number
  today: string
  total_sign_day: number
}

export async function getBBSSignInfo() {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return null
  }

  const { cookie, uid } = currentUser
  const actId = getBBSSignActId()

  const params = { act_id: actId, uid, region: getServerByUid(uid) }
  const url = `${API_TAKUMI}/event/bbs_sign_reward/info`
  const config = { params, headers: { referer: LINK_BBS_REFERER, cookie } }

  const { status, data } = await request.get<BaseRes<SignInfo>>(url, config)

  if (status !== 200 || data?.retcode !== 0) {
    console.log('getBBSSignInfo: ', data)
  }

  return data
}
