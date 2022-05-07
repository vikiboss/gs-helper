import axios from "axios";

import { APP_USER_AGENT } from "../constants";

axios.defaults.adapter = require("axios/lib/adapters/http");
axios.defaults.timeout = 6000;
axios.defaults.headers.common["user-agent"] = APP_USER_AGENT;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;
