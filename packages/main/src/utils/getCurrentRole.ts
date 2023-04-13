import type { GameRole } from '../../../types'

/** 获取默认角色（与米游社通行证设置的默认角色一致，如果要切换角色（区服），到米游社设置默认角色即可） */
export function getCurrentRole(roles: GameRole[]): null | GameRole {
  if (roles.length <= 0) {
    return null
  }

  return roles.find((e) => e.is_chosen) ?? roles[0]
}
