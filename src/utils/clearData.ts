import fs from 'fs';
import path from 'path';
import { app } from 'electron';

import { isFileExist } from './nodeUtils';
import { DefaultAppData } from '../main/initStore';

const clearData = async () => {
  // 获取当前的软件目录
  const AppPath = app.getPath('userData');
  // 获取配置文件路径
  const GachaDataDirPath = path.join(AppPath, 'config.json');
  if (!isFileExist(GachaDataDirPath)) {
    return true;
  } else {
    try {
      await fs.promises.unlink(GachaDataDirPath);
      const data = JSON.stringify(DefaultAppData, undefined, 2);
      await fs.promises.writeFile(GachaDataDirPath, data, { encoding: 'utf-8' });
      return true;
    } catch {
      return false;
    }
  }
};

export default clearData;
