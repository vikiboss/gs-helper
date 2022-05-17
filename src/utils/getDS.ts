import qs from "./qs";
import md5 from "./md5";
import random from "./random";

// DS 加密算法
const getDS = (query?: string, body?: string) => {
  const obj: Record<string, string> = {
    salt: "xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs",
    t: String(Math.floor(Date.now() / 1000)),
    r: String(random(100000, 200000))
  };
  if (body) obj.b = body;
  if (query) obj.q = query;
  return `${obj.t},${obj.r},${md5(qs(obj))}`;
};

export default getDS;
