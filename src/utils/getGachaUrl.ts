import { promises as fs } from "fs";
import path from "path";
import { app } from "electron";

import { GAME_NAME } from "../constants";
import { isDev, isAppleDevice } from "../main";
import { isFileExist } from "../utils/nodeUtils";

/** 获取原神游戏在本地缓存里的祈愿记录链接，只有在游戏里打开过祈愿记录页面，缓存里才会有祈愿链接 */
const getGachaUrl = async () => {
  if (isAppleDevice) return "";
  try {
    // 获取系统语言
    const lang = app.getLocale();
    // 匹配系统语言对应的游戏名称
    const name = GAME_NAME[lang.includes("zh") ? "zh" : "en"];
    // 日志文件名
    const filename = "output_log.txt";
    // 日志文件子路径
    const subPath = "AppData/LocalLow/miHoYo";
    // 拼接最终日志文件路径
    const logPath = path.join(app.getPath("home"), subPath, name, filename);
    // 尝试读取日志文件内容
    const logContent = await fs.readFile(logPath, { encoding: "utf-8" });
    // 在日志文件里使用正则表达式搜索游戏安装目录
    const gameDirReg = /\w:\/.+(GenshinImpact_Data|YuanShen_Data)/;
    // 获取游戏安装目录
    const gameDir = gameDirReg.exec(logContent)[0] || "";

    if (!gameDir) {
      return "";
    }

    // web 缓存文件路径
    const cacheFilePath = path.join(gameDir, "webCaches/Cache/Cache_Data/data_2");

    if (!isFileExist(cacheFilePath)) {
      return "";
    }

    // 读取 web 缓存文件
    const content = await fs.readFile(cacheFilePath, { encoding: "utf-8" });
    // 祈愿链接正则
    const UrlReg = /https.+?game_biz=hk4e_\w+/g;
    // 正则匹配祈愿链接
    const urlMatches = content.match(UrlReg) || [""];
    // 读取祈愿链接
    const url = urlMatches[urlMatches.length - 1];

    if (isDev) {
      console.log("getGachaUrl: ", url.split("?")[0] + "?...");
    }

    return url;
  } catch (e) {
    return "";
  }
};

export default getGachaUrl;
