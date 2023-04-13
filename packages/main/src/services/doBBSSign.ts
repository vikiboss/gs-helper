import { getBBSSignActId } from './getBBSSignActId'
import { getCurrentUser } from '../ipc/getCurrentUser'
import { getSignDS } from '../utils/getDS'
import { getServerByUid } from '../utils/getServerByUid'
import { request } from '../utils/request'

import type { BaseRes } from '@/types'

import { API_TAKUMI, LINK_BBS_REFERER } from '@/constants'

export interface DoSignData {
  code: string
}

export async function doBBSSign() {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    throw new Error('current user is empty')
  }

  const { cookie, uid } = currentUser
  const actId = getBBSSignActId()

  const postData = { act_id: actId, region: getServerByUid(uid), uid }

  const headers = {
    referer: LINK_BBS_REFERER,
    cookie,
    DS: getSignDS()
  }

  const url = `${API_TAKUMI}/event/bbs_sign_reward/sign`

  const { status, data } = await request.post<BaseRes<DoSignData>>(url, postData, { headers })

  if (status !== 200 || data?.retcode !== 0) {
    console.log('doBBSSign: ', data)
  }

  return data
}
