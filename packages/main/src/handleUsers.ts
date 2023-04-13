import { session } from 'electron'

import { store } from '.'

import type { UserData } from '../../types'

// 一系列用户操作的函数

/** 按 UID 删除已登录用户 */
export async function deleteUser(uid: string) {
  // 读取本地已登录用户列表
  const users: UserData[] = store.get('users')
  // 过滤掉待删除用户
  const newUsers = users.filter((e) => e.uid !== uid)
  // 保存已过滤的用户列表
  store.set('users', newUsers)
}

/** 清空 Session 中所有有关米哈游的 Cookie 信息 */
export async function clearSessionCookie() {
  // 获取默认 Session
  const ses = session.defaultSession
  // 获取所有米哈游相关 Cookie
  const mihoyoCks = await ses.cookies.get({ domain: 'mihoyo.com' })
  // 遍历清空
  mihoyoCks.forEach((ck) => {
    // 判断协议
    const protocal = ck.secure ? 'https://' : 'http://'
    // 拼接域
    const link = ck.domain + ck.path
    // 按照域和名称移除 Cookie
    ses.cookies.remove(protocal + link, ck.name)
  })
}

/** 切换账号，为防止 Session 冲突，切换时清空 Seession 的缓存 */
export async function changeUser(uid: string) {
  // 配置当前 uid 字段
  store.set('currentUid', uid)
  // 清空 Seession 有关米哈游的 Cookie 缓存
  await clearSessionCookie()
}
