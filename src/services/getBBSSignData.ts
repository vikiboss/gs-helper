import { getBBSSignActId } from './getBBSSignActId'
import { API_TAKUMI, LINK_BBS_REFERER } from '../constants'
import { request } from '../utils/request'

import type { BaseRes } from '../typings'

export interface SignItem {
  cnt: number
  icon: string
  name: string
}

export interface SignData {
  awards: SignItem[]
  month: number
  resign: boolean
}

export async function getBBSSignData() {
  const actId = getBBSSignActId()

  const url = `${API_TAKUMI}/event/bbs_sign_reward/home`
  const config = { params: { act_id: actId }, headers: { referer: LINK_BBS_REFERER } }

  const { status, data } = await request.get<BaseRes<SignData>>(url, config)

  if (status !== 200 || data?.retcode !== 0) {
    console.log('getBBSSignData: ', data)
  }

  return data
}
