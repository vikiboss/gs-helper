import { API_TAKUMI_RECORD, LINK_BBS_REFERER } from '../../../constants'
import { getCurrentUser } from '../ipc/getCurrentUser'
import { getDS } from '../utils/getDS'
import { getServerByUid } from '../utils/getServerByUid'
import { request } from '../utils/request'

import type { BaseRes } from '../../../types'

// 圣遗物词缀
export interface Affixes {
  activation_number: number
  effect: string
}

// 圣遗物属性
export interface Set {
  id: number
  name: string
  affixes: Affixes[]
}

// 衣装
export interface Costume {
  id: number
  name: string
  icon: string
}

// 命座
export interface Constellation {
  id: number
  name: string
  icon: string
  effect: string
  is_actived: boolean
  pos: number
}

// 圣遗物
export interface Reliquarie {
  id: number
  name: string
  icon: string
  pos: number
  rarity: number
  level: number
  set: Set
  pos_name: string
}

// 武器
export interface Weapon {
  id: number
  name: string
  icon: string
  type: number
  rarity: number
  level: number
  promote_level: number
  type_name: string
  desc: string
  affix_level: number
}

export interface Role {
  id: number
  image: string
  icon: string
  name: string
  element: string
  fetter: number
  level: number
  rarity: number
  weapon: Weapon
  reliquaries: Reliquarie[]
  constellations: Constellation[]
  actived_constellation_num: number
  costumes: Costume[]
}

export interface RoleData {
  avatars: Role[]
}

export async function getOwnedRoleList(uid?: string) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return null
  }

  const targetUid = uid || currentUser.uid

  const { cookie } = currentUser
  const url = `${API_TAKUMI_RECORD}/game_record/app/genshin/api/character`
  const postData = { role_id: targetUid, server: getServerByUid(targetUid) }

  const headers = {
    referer: LINK_BBS_REFERER,
    DS: getDS('', JSON.stringify(postData)),
    cookie
  }

  const { status, data } = await request.post<BaseRes<RoleData>>(url, postData, { headers })

  if (status !== 200 || data?.retcode !== 0) {
    console.log('getOwnedRoleList: ', data)
  }

  return data
}
