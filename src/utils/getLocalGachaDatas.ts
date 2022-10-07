import fs from "fs";
import path from "path";
import { app } from "electron";

import { isDirExist } from "./nodeUtils";

import type { GachaData } from "../typings";

// 尝试获取本地所有祈愿数据
const getLocalGachaDatas = (): GachaData[] => {
  // 获取当前的软件目录
  const AppPath = app.getPath("userData");
  // 获取存放所有祈愿数据的文件夹路径
  const GachaDataDirPath = path.join(AppPath, "GachaDatas");
  // 若该文件夹不存在，则创建，并返回空数据
  if (!isDirExist(GachaDataDirPath)) {
    fs.mkdirSync(GachaDataDirPath);
    return [];
  }
  // 尝试获取存放祈愿数据的文件夹下所有的数据
  const res = fs.readdirSync(GachaDataDirPath, { withFileTypes: true });
  // 待处理数据文件名列表
  const gachaFiles = [];
  // 遍历存放祈愿数据的文件夹下所有的内容
  for (const e of res) {
    // 如果是 json 文件，且名字符合
    if (e.isFile && e.name.match(/^[0-9]{8,10}.json$/)) {
      // 将文件名加入待处理数据文件名列表
      gachaFiles.push(e.name);
    }
  }
  // 最终返回的数据
  const gachas: GachaData[] = [];
  // 遍历待处理数据文件名列表
  for (const file of gachaFiles) {
    // 拼接文件路径
    const filePath = path.join(GachaDataDirPath, file);
    // 读取 JSON 文件内容
    const content = fs.readFileSync(filePath, { encoding: "utf-8" });
    try {
      // 尝试解析，并将成功解析的数据存入列表
      const data = JSON.parse(content);
      gachas.push(data);
    } catch (e: any) {
      console.log(e);
    }
  }
  // 返回数据
  return gachas;
};

export default getLocalGachaDatas;
