import { app, BrowserWindow, session } from 'electron';

import {
  mainWin, store, isDev, isAppleDevice,
} from '..';
import { APP_USER_AGENT_MOBILE, LINK_MIHOYO_BBS_LOGIN } from '../../constants';
import verifyCookieAndGetGameRole from '../../utils/verifyCookieAndGetGameRole';

import type { UserData } from '../../typings';

/** 通过米游社登录的函数，会打开一个窗口用于登录 */
const loginByBBS = async () => {
  // 配置窗口参数，默认为手机版本登录样式
  const bbsWin = new BrowserWindow({
    width: 400,
    height: 700,
    show: true,
    modal: !isAppleDevice,
    parent: mainWin,
    resizable: false,
    maximizable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    autoHideMenuBar: true,
    backgroundColor: '#F9F6F2',
  });

  // 生产环境下移除窗口顶部的默认菜单
  if (!isDev) {
    bbsWin.removeMenu();
  }

  const dom = bbsWin.webContents;

  // 阻止弹出新窗口
  dom.setWindowOpenHandler(() => ({ action: 'deny' }));
  // 设置 UA 为手机版本
  dom.setUserAgent(APP_USER_AGENT_MOBILE + app.getVersion());
  // 加载米游社登录页面
  dom.loadURL(LINK_MIHOYO_BBS_LOGIN);

  // 监听登录窗口被关闭事件
  bbsWin.on('close', async () => {
    // 获取 cookie
    const { cookies } = session.defaultSession;
    // 验证 cookie 有效性（是否成功登录）
    const { valid, cookie, roleInfo } = await verifyCookieAndGetGameRole(cookies);
    // 设置当前 uid，有效登录时 uid 设置正常，未登录则置空
    store.set('currentUid', roleInfo ? roleInfo.game_uid : '');
    // Cookie 无效，或者未绑定游戏角色，则不对本地 store 处理
    if (!valid || !roleInfo) {
      return;
    }
    // Cookie 有效，且绑定了游戏角色，则继续处理
    const user: UserData = { uid: roleInfo.game_uid, cookie };
    // 获取本地所有账户
    const localUsers = store.get('users');
    // 尝试获取新登录的账户在本地的账户列表里的索引（如果存在）
    const userIndex = localUsers.map((e) => e.uid).indexOf(user.uid);
    // 如果索引不为-1，那么说明账户已存在，进行更新操作
    if (userIndex !== -1) {
      // 删除旧的账号信息，加入新的账号信息
      localUsers.splice(userIndex, 1, user);
    } else {
      // 如果索引为 -1  则说明是新号，直接加入本地账户列表
      localUsers.push(user);
    }
    // 将新的账号信息列表保存至本地磁盘中
    store.set('users', localUsers);
    // 登录窗口关闭后，聚焦主窗口
    mainWin.focus();
  });
};

export default loginByBBS;
