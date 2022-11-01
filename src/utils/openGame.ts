import path from 'path';
import util from 'util';
import child_process from 'child_process';
import { app } from 'electron';

const exec = util.promisify(child_process.exec);

import { isAppleDevice } from '../main';
import { isFileExist } from './nodeUtils';
import getGameDir from './getGameDir';

import type { BaseIPCRes } from '../typings';

const dirs = [
  'C:\\Program Files\\Genshin Impact\\Genshin Impact Game',
  'D:\\Program Files\\Genshin Impact\\Genshin Impact Game',
  'E:\\Program Files\\Genshin Impact\\Genshin Impact Game',
  'F:\\Program Files\\Genshin Impact\\Genshin Impact Game',
];

/** 本地启动游戏 */
const openGame = async (): Promise<BaseIPCRes<boolean>> => {
  if (isAppleDevice) {
    return { ok: false, data: false, message: '不支持苹果设备' };
  }

  try {
    // 系统语言
    const lang = app.getLocale();
    // 游戏本体可执行程序名
    const name = lang.includes('zh') ? 'YuanShen.exe' : 'GenshinImpact.exe';

    // 游戏安装目录
    let gameDir = await getGameDir();

    if (!gameDir) {
      // 如果找不到游戏安装目录，尝试这几个默认位置
      for (const dir of dirs) {
        if (isFileExist(path.join(dir, name))) {
          console.log('dir found in presets:', gameDir);
          gameDir = dir;
          break;
        }
      }
    }

    if (!gameDir) {
      return { ok: false, data: false, message: '原神安装目录检测失败，请先尝试打开一次祈愿历史记录页' };
    }

    try {
      console.log('exec:', path.join(gameDir, name));
      exec(name, { cwd: gameDir });
    } catch (e) {
      console.log(e);
    }

    return {
      ok: true,
      data: true,
      message: '原神正在启动中...',
    };
  } catch (e) {
    console.log(e);
    return { ok: false, data: false, message: '原神启动失败' };
  }
};

export default openGame;
