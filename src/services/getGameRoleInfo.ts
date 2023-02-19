import { getUserRolesByCookie } from './getUserRoleList'
import { getCurrentUser } from '../main/IPC/getCurrentUser'
import { getCurrentRole } from '../utils/getCurrentRole'

export async function getGameRoleInfo() {
  const user = getCurrentUser()

  if (!user) {
    return null
  }

  const { data } = await getUserRolesByCookie(user.cookie)

  return getCurrentRole(data?.list ?? []) || null
}
