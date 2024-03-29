import axios from 'axios'
import { v4 as uuid } from 'uuid'

import { APP_USER_AGENT_BBS, BBS_VERSION } from '../constants'
import { store } from '../main'

// 创建 Axios 实例并设置默认配置、请求头等
export const request = axios.create({
  timeout: 12000,
  headers: {
    'user-agent': APP_USER_AGENT_BBS,
    'content-type': 'application/json; charset=utf-8',
    'x-rpc-app_version': BBS_VERSION,
    'x-rpc-page': 'v3.7.1-ys_#ys',
    'x-rpc-tool_version': 'v3.7.1-ys',
    'x-rpc-client_type': '5',
    'x-rpc-device_name': 'iPhone'
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
    const id = store.get('settings.deviceId', '')

    if (!id) {
      const did = uuid().replace('-', '').toUpperCase()
      store.set('settings.deviceId', did)
      Object.assign(config.headers, { 'x-rpc-device_id': did })
    }

    return config
  },
  (error) => {
    console.log(error?.message || error)
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
    console.log(error?.message || error)
    return Promise.reject(error)
  }
)
