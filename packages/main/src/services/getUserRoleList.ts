import { API_TAKUMI, GAME_BIZ, LINK_BBS_REFERER } from '../../../constants'
import { request } from '../utils/request'

import type { BaseRes, GameRolesData } from '../../../types'

/** 通过 Cookie 获取绑定的角色信息列表 */
export async function getUserRolesByCookie(cookie: string) {
  const url = `${API_TAKUMI}/binding/api/getUserGameRolesByCookie`
  const params = { game_biz: GAME_BIZ }
  const headers = { referer: LINK_BBS_REFERER, cookie }
  const config = { params, headers }

  const { status, data } = await request.get<BaseRes<GameRolesData>>(url, config)

  // { data: null, message: '登录失效，请重新登录', retcode: -100 }
  if (status !== 200 || data?.retcode !== 0) {
    console.log('getUserRolesByCookie: ', data)
  }

  return data
}
