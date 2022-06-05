import { store } from ".";

import type { UserData } from "../typings";

/** 按 UID 删除已登录用户 */
const deleteUser = async (uid: string) => {
  // 读取本地已登录用户列表
  const users: UserData[] = store.get("users");
  // 过滤掉待删除用户
  const newUsers = users.filter((e) => e.uid !== uid);
  // 保存已过滤的用户列表
  store.set("users", newUsers);
};

export default deleteUser;
