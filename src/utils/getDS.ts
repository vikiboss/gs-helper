import { md5 } from './nodeUtils'
import { qs, random } from './utils'

// 获取只包含数字与字母的指定位数的随机字符串
const getRandomStr = (n: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let str = ''
  for (let i = 0; i < n; i++) str += chars.charAt(random(0, chars.length - 1))
  return str
}

// ver 2.34.1
const getDS = (query = '', body = '') => {
  const params = {
    salt: 'xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs',
    t: String(Math.floor(Date.now() / 1000)),
    r: String(random(100000, 1000000)),
    b: body,
    q: query
  }
  const DS = `${params.t},${params.r},${md5(qs(params))}`
  console.log('getDS: ', DS)
  return DS
}

// ver 2.37.1
export const getSignDS = () => {
  const params = {
    salt: 'Qqx8cyv7kuyD8fTw11SmvXSFHp7iZD29',
    t: String(Math.floor(Date.now() / 1000)),
    r: getRandomStr(6)
  }
  const DS = `${params.t},${params.r},${md5(qs(params))}`
  console.log('getSignDS: ', DS)
  return DS
}

export default getDS
