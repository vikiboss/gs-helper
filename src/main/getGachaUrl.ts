import fs from "fs";
import path from "path";
import { app } from "electron";

import { GAME_NAME } from "../constants";
import { isDev } from "./createMainWindow";

/** 获取原神游戏在本地日志里的祈愿记录链接，只有在游戏里打开过祈愿记录页面，日志里才会有祈愿链接 */
const getGachaUrl = async () => {
  // 获取系统语言
  const lang = app.getLocale();
  // 匹配系统语言对应的游戏名称
  const name = GAME_NAME[lang] || "原神";
  // 日志文件名
  const filename = "output_log.txt";
  // 日志文件子路径
  const subPath = "AppData/LocalLow/miHoYo";
  // 拼接最终日志文件路径
  const logPath = path.join(app.getPath("home"), subPath, name, filename);
  // 尝试读取祈愿记录链接
  try {
    const logContent = await fs.promises.readFile(logPath, { encoding: "utf-8" });
    // 正则表达式搜索祈愿链接
    const URLReg = /^OnGetWebViewPageFinish:(.+#\/log)$/gm;
    const url = URLReg.exec(logContent)[1] || "";
    if (isDev) console.log("getGachaUrl: ", url.split("?")[0] + "?...");
    return url;
  } catch (e) {
    return "";
  }
};

export default getGachaUrl;
