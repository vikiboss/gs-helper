import getCurrentUser from "../main/ipcHandlers/getCurrentUser";
import getUserRolesByCookie from "./getUserRoleListByCookie";

import type { GameRole } from "../typings";

const getGameRoleInfo = async (): Promise<GameRole | null> => {
  const currentUser = getCurrentUser();
  const roles = await getUserRolesByCookie(currentUser.cookie);
  return roles[0] || null;
};

export default getGameRoleInfo;
