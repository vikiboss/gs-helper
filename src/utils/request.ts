import axios from "axios";

import { APP_USER_AGENT_BBS } from "../constants";

axios.defaults.timeout = 6000;
axios.defaults.headers.common["user-agent"] = APP_USER_AGENT_BBS;
// axios.defaults.headers.common["x-rpc-device_id"] = "";
axios.defaults.headers.common["x-rpc-app_version"] = "2.27.1";
axios.defaults.headers.common["x-rpc-client_type"] = "5";
// 1:  iOS Client
// 2:  Android Client
// 4:  PC Web
// 5:  Mobile Web

axios.interceptors.request.use(
  (config) => config,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(`StatusCode: ${response.status}`);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;
