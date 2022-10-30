import { app } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';

import { isDev, isAppleDevice } from '../main';
import { isFileExist } from '../utils/nodeUtils';
import getGameDir from './getGameDir';

/** 获取原神游戏在本地缓存里的祈愿记录链接，只有在游戏里打开过祈愿记录页面，缓存里才会有祈愿链接 */
const getGachaUrl = async () => {
  if (isAppleDevice) return '';
  try {
    // 获取游戏安装目录
    const gameDir = await getGameDir();

    if (!gameDir) {
      return '';
    }

    // 系统语言
    const lang = app.getLocale();
    // 游戏本体数据目录名
    const name = lang.includes('zh') ? 'YuanShen_Data' : 'GenshinImpact_Data';
    // 游戏本体 web 缓存目录
    const subDir = `${name}/webCaches/Cache/Cache_Data/data_2`;
    // web 缓存文件路径
    const cacheFilePath = path.join(gameDir, subDir);

    if (!isFileExist(cacheFilePath)) {
      return '';
    }

    // 读取 web 缓存文件
    const content = await fs.readFile(cacheFilePath, { encoding: 'utf-8' });
    // 祈愿链接正则
    const UrlReg = /https.+?game_biz=hk4e_\w+/g;
    // 正则匹配祈愿链接
    const urlMatches = content.match(UrlReg) || [''];
    // 读取祈愿链接
    const url = urlMatches[urlMatches.length - 1];

    if (isDev) {
      console.log('getGachaUrl: ', url.split('?')[0] + '?...');
    }

    return url;
  } catch (e) {
    console.log(e);
    return '';
  }
};

export default getGachaUrl;
