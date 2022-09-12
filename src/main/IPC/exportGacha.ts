import dayjs from "dayjs";
import { app, dialog } from "electron";
import fs from "fs/promises";

import { mainWin } from "..";
import getLocalGachaDatas from "../../utils/getLocalGachaDatas";

import type { BaseIPCRes, GachaData } from "../../typings";

/** 导入 JSON 配置信息 */
const exportGacha = async (uid: string): Promise<BaseIPCRes<null | GachaData>> => {
  const now = dayjs().format("YYYYMMDDHHmmss");

  const { filePath } = await dialog.showSaveDialog(mainWin, {
    title: `导出 UID ${uid} 的祈愿记录数据文件`,
    defaultPath: app.getPath("desktop") + `/${uid}-${now}.json`,
    buttonLabel: "导出"
  });

  if (!filePath || !filePath.length) {
    return { ok: false, data: null, message: "已取消导出操作" };
  }

  const data = getLocalGachaDatas().find((e) => e.info.uid === uid);

  if (!data) {
    return { ok: false, data: null, message: "uid 不存在" };
  }

  try {
    data.info.lang = "zh-cn";
    data.info.uigf_version = "v2.2";
    data.info.export_app = "Genshin Helper";
    data.info.export_app_version = app.getVersion();
    data.info.export_time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    data.info.export_timestamp = String(new Date().getTime());

    await fs.writeFile(filePath, JSON.stringify(data), { encoding: "utf-8" });

    return { ok: true, data, message: `已成功导出 UID ${uid} 的祈愿数据！` };
  } catch (e) {
    console.log(e);
    return { ok: true, data: null, message: "尝试写出文件时遇到了错误，导出失败" };
  }
};

export default exportGacha;
