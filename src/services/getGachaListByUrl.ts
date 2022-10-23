import { app } from "electron";
import D from "dayjs";

import request from "../utils/request";
import { deepClone, wait } from "../utils/utils";
import { API_HK4E, AppName, GachaTypeMap, TypeToUIGFTypeMap } from "../constants";

import type { BaseRes, GachaData, GachaItem, RawGachaItem } from "../typings";

interface RawGachaData {
  page: string;
  size: string;
  total: string;
  list: RawGachaItem[];
  region: string;
}

export const DefaultGachaData: GachaData = {
  info: {
    uid: "",
    lang: "zh-cn",
    export_app: "",
    export_app_version: "",
    export_time: "",
    export_timestamp: "",
    update_time: "",
    uigf_version: "v2.2"
  },
  list: []
};

const getGachaListByUrl = async (url: string): Promise<GachaData> => {
  try {
    // 获取 URL 中的参数
    const urlParams = new URLSearchParams(/\?(.*?)(#.+)?$/i.exec(url)[1]);

    // 默认的空数据
    const gacha: GachaData = deepClone(DefaultGachaData);

    // 填充 UIGF v2.2 格式数据的基本信息
    gacha.info.export_app = AppName;
    gacha.info.export_app_version = app.getVersion();
    gacha.info.update_time = D(new Date()).format("YYYY-MM-DD HH:mm:ss");

    // 是否已获取 UID
    let hasUid = false;

    // 依次按类型获取每类祈愿的数据
    for (const type of Object.keys(GachaTypeMap)) {
      // 拼接每个类型的起始 URL 参数
      urlParams.set("game_biz", "hk4e_cn");
      urlParams.set("size", "20");
      urlParams.set("gacha_type", type);
      urlParams.set("page", "1");
      urlParams.set("end_id", "0");

      // 用于判断是否获取完成的标志
      let [hasMore, times] = [true, 0];

      // do while 循环，不断加载这个类型每一页的数据
      do {
        if (times > 0) {
          console.log("getGachaListByUrl: ", `开始重试第 ${times} 次...`);
        }

        // 拼接每一页数据的 URL
        const url = `${API_HK4E}/event/gacha_info/api/getGachaLog?${urlParams.toString()}`;
        const { data, status } = await request.get<BaseRes<RawGachaData>>(url);

        // 如果返回状态异常，打印返回的内容
        if (data.retcode !== 0) console.log("getGachaListByUrl: ", data);

        // 如果返回状态正常
        if (status === 200 && data.retcode === 0) {
          // 如果返回列表为空，继续下一个类型的获取
          if (data.data.list.length === 0) break;

          // 如果返回的列表数不满 20，则说明是最后一页（新手祈愿只有 20 次，只需要获取一次）
          if (data.data.list.length < 20 || type === "100") hasMore = false;

          // 如果还未获取 UID，则进行设置
          if (!hasUid) {
            hasUid = true;
            gacha.info.uid = data.data.list[0].uid;
          }

          // 对返回的 list 列表进行数据处理（删除 uid 和 lang 字段）
          const list: GachaItem[] = data.data.list.map((e: RawGachaItem) => {
            e.uid && delete e.uid;
            e.lang && delete e.lang;
            return Object.assign(e, { uigf_gacha_type: TypeToUIGFTypeMap[type] });
          });

          // 将 获取并处理过的列表数据 合并到 待返回的数据 里
          gacha.list.push(...list);

          // 处理下一页的 URL 参数
          urlParams.set("page", String(Number(urlParams.get("page")) + 1));
          urlParams.set("end_id", data.data.list.pop().id);
        } else {
          times++;
          // 出错时打印异常
          console.log("getGachaListByUrl: ", data.data, status);
          const error = `获取${GachaTypeMap[type]}第${urlParams.get("page")}页失败`;
          console.log("getGachaListByUrl: ", error);
        }

        // 每加载一次数据，等待 300 毫秒，减轻米哈游服务器负担
        await wait(300);
      } while (hasMore && times <= 2);
    }

    // 返回新获取的数据
    return gacha;
  } catch {
    return DefaultGachaData;
  }
};

export default getGachaListByUrl;
