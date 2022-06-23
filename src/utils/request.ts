import axios from "axios";

import { APP_USER_AGENT_BBS } from "../constants";
import { store } from "../main";

// 创建 Axios 实例并设置默认配置、请求头等
const request = axios.create({
  timeout: 6000,
  headers: {
    "User-Agent": APP_USER_AGENT_BBS,
    "x-rpc-app_version": "2.28.1",
    "x-rpc-client_type": "5",
    "x-requested-with": "com.mihoyo.hyperion",
    "x-rpc-channel": "appstore"
  }
});

// x-rpc-client_type 字段的说明：
//
// 1:  iOS Client
// 2:  Android Client
// 4:  PC Web
// 5:  Mobile Web

request.interceptors.request.use(
  (config) => {
    const deviceId = store.get("settings.deviceId", "");
    Object.assign(config.headers, { "x-rpc-device_id": deviceId });
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
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

export default request;
