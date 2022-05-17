import { SERVERS } from "./../constants";

const getServerByUid = (uid: string): string => {
  // 通过正则表达式过滤掉无效的 UID，合法的 UID 须是以数字 1-9 开头
  if (/^[1-9]$/.test(uid[0])) return "";
  return SERVERS[Number(uid[0]) - 1];
};

export default getServerByUid;
