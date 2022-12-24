export const Servers = [
  'cn_gf01', // 1 开头，国区官服-天空岛
  'cn_gf01', // 2 开头，国区官服-天空岛
  'cn_gf01', // 3 开头，国区官服-天空岛
  'cn_gf01', // 4 开头，国区官服-天空岛
  'cn_qd01', // 5 开头，国区渠道服-世界树
  'os_usa', // 6 开头，美服
  'os_euro', // 7 开头，欧服
  'os_aisa', // 8 开头，亚服
  'os_cht' // 9 开头，港澳台服
] as const

export function getServerByUid(uid: string) {
  // 通过正则表达式过滤掉无效的 UID，合法的 UID 须是以数字 1-9 开头
  if (!/^[1-9]$/.test(uid[0])) {
    return ''
  }

  return Servers[Number(uid[0]) - 1]
}
