import { getGachaListByUrl } from '../services/getGachaListByUrl'
import { updateLocalGachaData } from '../utils/updateLocalGachaData'

/** 通过祈愿链接获取祈愿数据，并将改动更新到本地存档 */
export async function handleGetGachaListByUrl(url: string) {
  // 通过祈愿链接获取祈愿数据
  const gachaData = await getGachaListByUrl(url)
  // 将改动更新到本地存档
  return updateLocalGachaData(gachaData)
}
