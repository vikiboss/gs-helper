import fs from "fs";
import path from "path";
import { app } from "electron";

import { DefaultGachaData } from "../services/getGachaListByUrl";
import { isDirExist, isFileExist } from "./nodeUtils";
import mergeGachaList from "./mergeGachaList";

import type { GachaData } from "../typings";

// 通过新的抽卡数据来更新配置文件里的抽卡数据
const updateLocalGachaData = (gacha: GachaData): GachaData => {
  // 获取新的数据的 UID
  const uid = gacha.info.uid;
  // 获取当前的软件目录
  const AppPath = app.getPath("userData");
  // 获取存放所有祈愿数据的文件夹路径
  const GachaDataDirPath = path.join(AppPath, "GachaDatas");
  // 若该文件夹不存在，则创建
  if (!isDirExist(GachaDataDirPath)) fs.mkdirSync(GachaDataDirPath);
  // 获取该 UID 的数据文件路径
  const GachaFilePath = path.join(GachaDataDirPath, `${uid}.json`);
  if (!isFileExist(GachaFilePath)) {
    // 如果该 UID 数据不存在，则说明是第一次获取，直接将该文件保存
    fs.writeFileSync(GachaFilePath, JSON.stringify(gacha), { encoding: "utf-8" });
    // 直接返回参数里的祈愿数据
    return gacha;
  } else {
    // 如果该 UID 数据存在，则先读取旧数据，然后做合并处理
    try {
      // 读取旧数据
      const LocalGachaStr = fs.readFileSync(GachaFilePath, { encoding: "utf-8" });
      const LocalGacha = JSON.parse(LocalGachaStr) as GachaData;
      // 合并处理
      const list = mergeGachaList(LocalGacha.list, gacha.list);
      // 写入新数据
      const fileContent = JSON.stringify({ info: gacha.info, list });
      fs.writeFileSync(GachaFilePath, fileContent, { encoding: "utf-8" });
      // 返回合并后的祈愿数据
      return { info: gacha.info, list };
    } catch {
      // JSON 解析出错时，返回空数据
      return DefaultGachaData;
    }
  }
};

export default updateLocalGachaData;
