import getServerByUid from "./getServerByUid";

const isUidChineseServer = (uid: string): boolean => {
  return getServerByUid(uid).startsWith("cn");
};

export default isUidChineseServer;
