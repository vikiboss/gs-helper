import qs from "./qs";
import md5 from "./md5";
import random from "./random";

// DS 加密算法
const getDS = (info: string, body?: Object) => {
  const obj = {
    salt: "xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs",
    t: Math.floor(Date.now() / 1000),
    r: random(100000, 200000),
    b: body ? JSON.stringify(body) : "",
    q: info
  };
  return `${obj.t},${obj.r},${md5(qs(obj))}`;
};

export default getDS;
