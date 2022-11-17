import fs from 'node:fs'
import crypto from 'node:crypto'

// MD5 加密算法
export const md5 = (value: string) => crypto.createHash('md5').update(value).digest('hex')

// 文件是否存在
export function isFileExist(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile()
  } catch {
    return false
  }
}

// 文件夹是否存在
export function isDirExist(dirPath: string): boolean {
  try {
    return fs.statSync(dirPath).isDirectory()
  } catch {
    return false
  }
}
