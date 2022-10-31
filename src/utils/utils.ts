/** 进行延时操作的函数 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// 对象拼接成字符串，类似 URLSearchParams，可选是否对参数编码
export const qs = (obj: Record<string, string>, encode = false) => {
  let res = '';
  for (const [k, v] of Object.entries(obj))
    res += `${k}=${encode ? encodeURIComponent(v) : v}&`;
  return res.slice(0, res.length - 1);
};

/** 取指定范围随机数的函数 */
export const random = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** 对象深拷贝的函数 */
export const deepClone = <T>(obj: T): T => {
  const getType = (e: any) => Object.prototype.toString.call(e).slice(8, -1);
  const isValid = (e: any) => getType(e) === 'Object' || getType(e) === 'Array';

  if (!isValid(obj)) {
    return obj;
  }

  const _obj = Array.isArray(obj) ? [] : {} as any;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      _obj[key] = isValid(obj[key]) ? deepClone(obj[key]) : obj[key];
    }
  }

  return _obj;
};
