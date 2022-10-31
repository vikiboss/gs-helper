import getCurrentUser from '../main/IPC/getCurrentUser';
import getUserRolesByCookie from './getUserRoleListByCookie';

import type { GameRole } from '../typings';

const getGameRoleInfo = async (): Promise<GameRole | null> => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const roles = await getUserRolesByCookie(currentUser.cookie);

  return roles.length > 0 ? roles[0] : null;
};

export default getGameRoleInfo;
