import Store from 'electron-store';
import { v4 as uuid } from 'uuid';

import type { Schema } from 'electron-store';
import type { AppData } from '../typings';

export const DefaultAppData: AppData = {
  currentUid: '',
  users: [],
  settings: {
    alwaysOnTop: false,
    deviceId: '',
    gameDir: '',
  },
};

/** 初始化 Store */
const initStore = () => {
  const options = { schema, defaults: DefaultAppData };
  return new Store<AppData>(options);
};

/** 定义 Store 的 JSON schema */
const schema: Schema<AppData> = {
  currentUid: { type: 'string' },
  users: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        uid: { type: 'string', pattern: '^[0-9]{0,10}$' },
        cookie: { type: 'string' },
      },
    },
  },
  settings: {
    type: 'object',
    properties: {
      alwaysOnTop: {
        type: 'boolean',
        default: false,
      },
      deviceId: {
        type: 'string',
        default: uuid().replace('-', '').toUpperCase(),
      },
      gameDir: {
        type: 'string',
        default: '',
      },
    },
  },
};

export default initStore;
