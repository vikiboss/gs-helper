import getGachaListByUrl from "../../services/getGachaListByUrl";
import updateLocalGachaData from "../../utils/updateLocalGachaData";

import type { GachaData } from "../../typings";

/** 通过祈愿链接获取祈愿数据，并将改动更新到本地存档 */
const handleGetGachaListByUrl = async (url: string): Promise<GachaData> => {
  // 通过祈愿链接获取祈愿数据
  const gachaData = await getGachaListByUrl(url);
  // 将改动更新到本地存档
  return updateLocalGachaData(gachaData);
};

export default handleGetGachaListByUrl;
