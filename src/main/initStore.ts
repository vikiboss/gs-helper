import Store from "electron-store";
import { v4 as uuid } from "uuid";

import { deepClone } from "../utils/utils";

import type { Schema } from "electron-store";
import type { AppData } from "../typings";

export const DefaultAppData: AppData = {
  currentUid: "",
  users: [],
  settings: { alwaysOnTop: false, deviceId: "" }
};

/** 初始化 Store */
const initStore = () => {
  const options = { schema, defaults: deepClone(DefaultAppData) };
  const store = new Store<AppData>(options);
  // 初始化 device id
  const deviceId = store.get("settings.deviceId", "");
  // 没有 device id 则随机生成并写入配置
  if (!deviceId) store.set("settings.deviceId", uuid().replace("-", "").toUpperCase());
  return store;
};

/** 定义 Store 的 JSON schema */
const schema: Schema<AppData> = {
  currentUid: { type: "string" },
  users: {
    type: "array",
    items: {
      type: "object",
      properties: {
        uid: { type: "string", pattern: "^[0-9]{0,10}$" },
        cookie: { type: "string" }
      }
    }
  },
  settings: {
    type: "object",
    properties: {
      alwaysOnTop: {
        type: "boolean"
      },
      deviceId: {
        type: "string"
      }
    }
  }
};

export default initStore;
