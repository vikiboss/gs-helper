import Store, { Schema } from "electron-store";

import { AppData } from "../typings";

const defaultData: AppData = {
  user: {
    buid: "",
    cookie: ""
  },
  gacha: [],
  settings: { alwaysOnTop: false }
};

const schema: Schema<AppData> = {
  user: {
    type: "object",
    properties: {
      buid: { type: "string", pattern: "^[0-9]{0,10}$" },
      cookie: { type: "string" }
    }
  },
  gacha: {
    type: "array",
    items: {
      type: "object",
      properties: {
        info: {
          type: "object",
          properties: {
            uid: { type: "string", pattern: "^[0-9]{3,10}$" },
            lang: { type: "string" },
            export_app: { type: "string" },
            export_app_version: { type: "string" },
            export_time: { type: "string" },
            export_timestamp: { type: "string" },
            uigf_version: { type: "string" }
          }
        },
        list: {
          type: "array",
          items: {
            type: "object",
            properties: {
              gacha_type: { type: "string" },
              item_id: { type: "string" },
              count: { type: "string" },
              time: { type: "string" },
              name: { type: "string" },
              item_type: { type: "string" },
              rank_type: { type: "string" },
              id: { type: "string" },
              uigf_gacha_type: { type: "string" }
            }
          }
        }
      }
    }
  },
  settings: {
    type: "object",
    properties: {
      alwaysOnTop: {
        type: "boolean"
      }
    }
  }
};

export default () => new Store<AppData>({ schema, defaults: defaultData });