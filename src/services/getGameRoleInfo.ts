import { getCurrentUser } from '../main/IPC/getCurrentUser'
import { getUserRolesByCookie } from './getUserRoleList'

import type { GameRole } from '../typings'

export async function getGameRoleInfo() {
  const user = getCurrentUser()

  if (!user) {
    return null
  }

  const { cookie } = user
  const { data } = await getUserRolesByCookie(cookie)

  return data.list.find((e: GameRole) => e.is_chosen) || null
}
