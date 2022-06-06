import { md5 } from "./nodeUtils";
import { qs, random } from "./utils";

/** 获取指定位数只包含数字与字母的随机字符串 */
const getRandomStr = (n: number) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < n; i++) str += chars.charAt(random(0, chars.length - 1));
  return str;
};

// Github: @lulu666lulu
// 比较新的 DS 加密算法，不同版本米游社、不同接口的 DS 算法可能有所差异
const getDS = (query: string = "", body: string = "") => {
  const params = {
    salt: "xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs",
    t: String(Math.floor(Date.now() / 1000)),
    r: String(random(100000, 1000000)),
    b: body,
    q: query
  };
  const DS = `${params.t},${params.r},${md5(qs(params))}`;
  console.log("getDS: ", JSON.stringify(params), DS);
  return DS;
};

// 米游社签到 DS 算法
// 目前只在 GitHub 上找到 2.3.0 版本的签到 DS 算法
export const getSignDS = () => {
  const params = {
    salt: "h8w582wxwgqvahcdkpvdhbh2w9casgfl",
    t: String(Math.floor(Date.now() / 1000)),
    r: getRandomStr(6)
  };
  const DS = `${params.t},${params.r},${md5(qs(params))}`;
  console.log("getSignDS: ", JSON.stringify(params), DS);
  return DS;
};

export default getDS;
