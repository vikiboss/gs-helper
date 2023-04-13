/** 对象深拷贝的函数 */
export function deepClone<T>(obj: T) {
  const getType = (e: any) => Object.prototype.toString.call(e).slice(8, -1)
  const isValid = (e: any) => getType(e) === 'Object' || getType(e) === 'Array'

  if (!isValid(obj)) {
    return obj
  }

  const targetObj = Array.isArray(obj) ? [] : ({} as any)

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      targetObj[key] = isValid(obj[key]) ? deepClone(obj[key]) : obj[key]
    }
  }

  return targetObj
}
