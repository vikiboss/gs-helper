import { DefaultGameRole } from "./../../constants";
import getCurrentUser from "./getCurrentUser";
import getUserRoleListByCookie from "../../services/getUserRoleListByCookie";

/** 获取米游社绑定的首个区服角色信息 */
const getUserRole = async () => {
  const currentUser = getCurrentUser();
  const list = await getUserRoleListByCookie(currentUser.cookie);
  return list[0] || DefaultGameRole;
};

export default getUserRole;
