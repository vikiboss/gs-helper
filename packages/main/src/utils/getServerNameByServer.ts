export function getServerNameByServer(server: string) {
  if (server.startsWith('cn_gf')) {
    return '天空岛'
  }

  if (server.startsWith('cn_qd')) {
    return '世界树'
  }

  return '国际服'
}
