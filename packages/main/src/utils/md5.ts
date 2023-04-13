import crypto from 'node:crypto'

// MD5 加密算法
export function md5(value: string) {
  return crypto.createHash('md5').update(value).digest('hex')
}
