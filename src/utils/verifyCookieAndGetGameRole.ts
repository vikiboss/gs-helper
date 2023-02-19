import { getCurrentRole } from './getCurrentRole'
import { request } from './request'
import { API_TAKUMI, GAME_BIZ, LINK_BBS_REFERER } from '../constants'

import type { GameRole, BaseRes, GameRolesData } from '../typings'
import type { Cookies } from 'electron'

export interface AuthResState {
  cookie: string
  valid: boolean
  roleInfo: GameRole | null
}

/** 将 Cookies 类转为 cookie 字符串的函数 */
async function transferCookiesToString(cookies: Cookies) {
  // 获取所有 Cookie
  const cks = await cookies.get({})
  // 拼接 Cookie
  return cks.reduce((p, n) => `${p}${n.name}=${n.value}; `, '').trim()
}

/** 通过 Cookie 获取绑定的角色信息列表 */
async function getUserRolesByCookie(cookie: string): Promise<GameRole[] | null> {
  const url = `${API_TAKUMI}/binding/api/getUserGameRolesByCookie`
  const config = { params: { game_biz: GAME_BIZ }, headers: { referer: LINK_BBS_REFERER, cookie } }
  const { data, status } = await request.get<BaseRes<GameRolesData>>(url, config)

  if (status !== 200 || data.retcode !== 0) {
    console.log('getUserRolesByCookie: ', data)
  }

  return data?.data?.list || null
}

/** 验证 Cookie 有效性并尝试获取绑定的游戏角色 */
export async function verifyCookieAndGetGameRole(cks: Cookies) {
  const cookie = await transferCookiesToString(cks)
  const hasLtoken = cookie.includes('ltoken')

  if (!hasLtoken) {
    return { valid: false, cookie: '', roleInfo: null }
  }

  const roles = await getUserRolesByCookie(cookie)
  const chosenRole = getCurrentRole(roles)

  const valid = chosenRole?.game_uid

  if (!valid) {
    console.log('verifyCookie: ', cookie)
  }

  return { valid: true, cookie, roleInfo: valid ? chosenRole : null }
}
