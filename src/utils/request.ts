import axios from 'axios'

import { APP_USER_AGENT_BBS, BBS_VERSION } from '../constants'
import { store } from '../main'

// 创建 Axios 实例并设置默认配置、请求头等
export const request = axios.create({
  timeout: 10000,
  headers: {
    'Accept-Encoding': '*',
    Accept: 'application/json, text/plain, */*',
    'User-Agent': APP_USER_AGENT_BBS,
    'x-requested-with': 'com.mihoyo.hyperion',
    'x-rpc-app_version': BBS_VERSION,
    'x-rpc-page': '3.1.3_#/ys',
    'x-rpc-channel': 'appstore',
    'x-rpc-client_type': '5',
    'x-rpc-device_model': 'iPhone12,8',
    'x-rpc-device_name': 'iPhone',
    'x-rpc-platform': 'ios',
    'x-rpc-sys_version': '15.6'
  }
})

// x-rpc-client_type 字段的说明：
//
// 1:  iOS Client
// 2:  Android Client // v2.34.1 salt: z8DRIUjNDT7IT5IZXvrUAxyupA1peND9
// 4:  PC Web
// 5:  Mobile Web // v2.34.1 salt: 9nQiU3AV0rJSIBWgdynfoGMGKaklfbM7

request.interceptors.request.use(
  (config) => {
    const deviceId = store.get('settings.deviceId', '')
    Object.assign(config.headers, { 'x-rpc-device_id': deviceId })
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    const { url, method } = response.config
    const { hostname } = new URL(url)

    console.log(`${method.toUpperCase()}: ${response.status} => ${hostname}`)

    return response
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
