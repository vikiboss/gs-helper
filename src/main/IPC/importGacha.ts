import { app, dialog } from "electron";
import fs from "fs/promises";
import { mainWin } from "..";

import type { BaseIPCRes, GachaData } from "../../typings";
import updateLocalGachaData from "../../utils/updateLocalGachaData";

/** 导入 JSON 配置信息 */
const importGacha = async (): Promise<BaseIPCRes<GachaData | null>> => {
  const { filePaths } = await dialog.showOpenDialog(mainWin, {
    title: "导入祈愿记录数据文件",
    defaultPath: app.getPath("desktop"),
    buttonLabel: "导入",
    filters: [
      {
        name: "JSON 文件",
        extensions: ["json"]
      }
    ],
    properties: ["showHiddenFiles"]
  });

  if (!filePaths || !filePaths.length) {
    return { ok: false, data: null, message: "已取消导入操作" };
  }

  try {
    const content = await fs.readFile(filePaths[0], { encoding: "utf-8" });
    const config = JSON.parse(content) as GachaData;

    if (config.info && config.list) {
      updateLocalGachaData(config);
      const message = `已成功导入 UID ${config.info.uid} 的祈愿数据！`;
      return { ok: true, data: config, message };
    } else {
      return { ok: false, data: config, message: "格式解析失败，请导入符合要求的 JSON 数据" };
    }
  } catch (e) {
    console.log(e);
    return { ok: false, data: null, message: "尝试写入文件时遇到了错误，导入失败" };
  }
};

export default importGacha;
