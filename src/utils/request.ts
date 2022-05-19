import axios from "axios";
import { v4 as uuid } from "uuid";

import { store } from "../main";
import { APP_USER_AGENT_BBS, APP_VERSION_BBS } from "../constants";

export type BaseRes<T> = {
  retcode: number;
  data: T | null;
  message: string;
};

axios.defaults.timeout = 6000;

Object.assign(axios.defaults.headers.common, {
  "user-agent": APP_USER_AGENT_BBS,
  "x-rpc-app_version": APP_VERSION_BBS,
  // 1:  iOS Client
  // 2:  Android Client
  // 4:  PC Web
  // 5:  Mobile Web
  "x-rpc-client_type": "5",
  "x-requested-with": "com.mihoyo.hyperion",
  "x-rpc-channel": "appstore"
});

axios.interceptors.request.use(
  (config) => {
    let deviceId = store.get<string, string>("settings.deviceId", "");
    if (!deviceId) {
      deviceId = uuid().replace("-", "").toUpperCase();
      store.set("settings.deviceId", deviceId);
    }
    Object.assign(config.headers.common, { "x-rpc-device_id": deviceId });
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const { url, method } = response.config;
    const path = `/${url.split("/").reverse()[0].split("?")[0]}`;
    console.log(`${method.toUpperCase()}: ${response.status} ${path}`);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;
