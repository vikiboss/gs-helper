import { store } from "..";

import type { UserData } from "../../typings";

/** 获取当前账号 */
const getCurrentUser = (): UserData | null => {
  const currentUid = store.get("currentUid", "");
  const uids = store.get("users").map((e) => e.uid);
  if (!uids.includes(currentUid)) return null;
  return store.get("users").filter((e) => e.uid === currentUid)[0] as UserData;
};

export default getCurrentUser;
