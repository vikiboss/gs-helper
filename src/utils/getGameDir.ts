import { promises as fs } from 'node:fs';
import path from 'node:path';
import { app } from 'electron';

import { GAME_NAME } from '../constants';
import { isAppleDevice, store } from '../main';
import { isDirExist } from './nodeUtils';

/** 获取原神游戏在本地启动日志里的安装目录 */
const getGameDir = async (): Promise<string> => {
  if (isAppleDevice) {
    return '';
  }

  try {
    const dir = store.get<string, ''>('settings.gameDir');

    if (dir) {
      if (isDirExist(dir)) {
        return path.join(dir, 'Genshin Impact Game');
      }
      store.set('settings.gameDir', '');
    }

    // 获取系统语言
    const lang = app.getLocale();
    // 匹配系统语言对应的游戏名称
    const gameName = GAME_NAME[lang.includes('zh') ? 'zh' : 'en'];
    // 日志文件名
    const filename = 'output_log.txt';
    // 日志文件子路径
    const subPath = 'AppData/LocalLow/miHoYo';
    // 拼接最终日志文件路径
    const logPath = path.join(app.getPath('home'), subPath, gameName, filename);
    // 尝试读取日志文件内容
    const logContent = await fs.readFile(logPath, { encoding: 'utf-8' });
    // 在日志文件里使用正则表达式搜索游戏安装目录
    const gameDirReg = /(\w:\/.+Genshin Impact)\//;
    // 获取游戏安装目录
    const gameDir = gameDirReg.test(logContent) ? gameDirReg.exec(logContent)[1] : '';

    console.log('getGameDir: ', gameDir);

    if (gameDir && isDirExist(gameDir)) {
      store.set('settings.gameDir', gameDir);
      return path.join(gameDir, 'Genshin Impact Game');
    }
    return '';
  } catch (e) {
    console.log(e);
    return '';
  }
};

export default getGameDir;
