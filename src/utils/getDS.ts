import { md5 } from "./nodeUtils";
import { qs, random } from "./utils";

// 获取只包含数字与字母的指定位数的随机字符串
const getRandomStr = (n: number) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < n; i++) str += chars.charAt(random(0, chars.length - 1));
  return str;
};

// 比较新的 DS 加密算法，目前貌似 2.3.0 后续版本都能用，Github@lulu666lulu
const getDS = (query: string = "", body: string = "") => {
  const params = {
    salt: "xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs",
    t: String(Math.floor(Date.now() / 1000)),
    r: String(random(100000, 1000000)),
    b: body,
    q: query
  };
  const DS = `${params.t},${params.r},${md5(qs(params))}`;
  console.log("getDS: ", DS);
  return DS;
};

// 米游社 2.3.0 版本的签到 DS 算法
export const getSignDS = () => {
  const params = {
    salt: "h8w582wxwgqvahcdkpvdhbh2w9casgfl",
    t: String(Math.floor(Date.now() / 1000)),
    r: getRandomStr(6)
  };
  const DS = `${params.t},${params.r},${md5(qs(params))}`;
  console.log("getSignDS: ", DS);
  return DS;
};

export default getDS;
