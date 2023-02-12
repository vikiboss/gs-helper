import { getCurrentUser } from '../main/IPC/getCurrentUser'
import { getUserRolesByCookie } from './getUserRoleList'
import { getCurrentRole } from '../utils/getCurrentRole'

export async function getGameRoleInfo() {
  const user = getCurrentUser()

  if (!user) {
    return null
  }

  const { data } = await getUserRolesByCookie(user.cookie)

  return getCurrentRole(data?.list ?? []) || null
}
