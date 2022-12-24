import { getCurrentUser } from '../main/IPC/getCurrentUser'
import { getUserRolesByCookie } from './getUserRoleList'

export async function getGameRoleInfo() {
  const { cookie } = getCurrentUser()
  const { data } = await getUserRolesByCookie(cookie)

  return data.list[0]
}
