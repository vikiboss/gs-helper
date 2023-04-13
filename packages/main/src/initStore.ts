import Store from 'electron-store'

import type { AppData } from '@/types'
import type { Schema } from 'electron-store'

export const DefaultAppData: AppData = {
  currentUid: '',
  users: [],
  settings: {
    alwaysOnTop: false,
    deviceId: '',
    gameDir: ''
  }
}

/** 定义 Store 的 JSON schema */
const schema: Schema<AppData> = {
  currentUid: { type: 'string' },
  users: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        uid: { type: 'string', pattern: '^[0-9]{0,10}$' },
        cookie: { type: 'string' }
      }
    }
  },
  settings: {
    type: 'object',
    properties: {
      alwaysOnTop: {
        type: 'boolean',
        default: false
      },
      deviceId: {
        type: 'string',
        default: ''
      },
      gameDir: {
        type: 'string',
        default: ''
      }
    }
  }
}

/** 初始化 Store */
export function initStore() {
  const options = { schema, defaults: DefaultAppData }
  return new Store<AppData>(options)
}
