import { getCurrentUser } from '../main/IPC/getCurrentUser'
import { getUserRolesByCookie } from './getUserRoleList'

export async function getGameRoleInfo() {
  const user = getCurrentUser()

  if (!user) {
    return null
  }

  const { cookie } = user
  const { data } = await getUserRolesByCookie(cookie)

  return data.list[0]
}
