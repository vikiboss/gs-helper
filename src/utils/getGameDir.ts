import { promises as fs } from 'fs';
import path from 'path';
import { app } from 'electron';

import { GAME_NAME } from '../constants';
import { isAppleDevice, isDev } from '../main';

/** 获取原神游戏在本地启动日志里的安装目录 */
const getGameDir = async () => {
  if (isAppleDevice) return '';
  try {
    // 获取系统语言
    const lang = app.getLocale();
    // 匹配系统语言对应的游戏名称
    const name = GAME_NAME[lang.includes('zh') ? 'zh' : 'en'];
    // 日志文件名
    const filename = 'output_log.txt';
    // 日志文件子路径
    const subPath = 'AppData/LocalLow/miHoYo';
    // 拼接最终日志文件路径
    const logPath = path.join(app.getPath('home'), subPath, name, filename);
    // 尝试读取日志文件内容
    const logContent = await fs.readFile(logPath, { encoding: 'utf-8' });
    // 在日志文件里使用正则表达式搜索游戏安装目录
    const gameDirReg = /\w:\/.+(Genshin Impact Game)/;
    // 获取游戏安装目录
    const gameDir = gameDirReg.exec(logContent)[0] || '';

    if (isDev) {
      console.log('getGameDir: ', gameDir);
    }

    return gameDir;
  } catch (e) {
    console.log(e);
    return '';
  }
};

export default getGameDir;
