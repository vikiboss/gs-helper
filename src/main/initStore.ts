import Store, { Schema } from "electron-store";

const defaultData: any = {
  userData: {
    uid: "",
    cookie: ""
  },
  gachaData: [],
  settings: {}
};

const schema: Schema<typeof defaultData> = {
  userData: {
    type: "object",
    properties: {
      uid: { type: "string", pattern: "^[0-9]{3,10}$" },
      cookie: { type: "string" }
    }
  },
  gachaData: {
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
    properties: {}
  }
};

export default () => new Store({ schema });
