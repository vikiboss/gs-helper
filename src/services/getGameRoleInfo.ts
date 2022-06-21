import getCurrentUser from "../main/IPC/getCurrentUser";
import getUserRolesByCookie from "./getUserRoleListByCookie";

import type { GameRole } from "../typings";

const getGameRoleInfo = async (): Promise<GameRole | null> => {
  const currentUser = getCurrentUser();
  const roles = await getUserRolesByCookie(currentUser.cookie);
  return (roles && roles[0]) || null;
};

export default getGameRoleInfo;
