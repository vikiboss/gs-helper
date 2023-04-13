import { store } from '..'

/** 获取当前账号 */
export function getCurrentUser() {
  const currentUid = store.get('currentUid', '')

  if (!currentUid) {
    return null
  }

  return store.get('users').find((e) => e.uid === currentUid) || null
}
