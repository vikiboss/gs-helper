const deepClone = (obj: any) => {
  const getType = (e: any) => Object.prototype.toString.call(e).slice(8, -1);
  const isValid = (e: any) => getType(e) === "Object" || getType(e) === "Array";
  if (!isValid(obj)) return obj;
  const _obj = Array.isArray(obj) ? [] : ({} as any);
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    _obj[key] = isValid(obj[key]) ? deepClone(obj[key]) : obj[key];
  }
  return _obj;
};

export default deepClone;
