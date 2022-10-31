import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';

// import element from "../../../assets/element.png";
import useNotice from '../../hooks/useNotice';
import useAuth from '../../hooks/useAuth';
import nativeApi from '../../utils/nativeApi';
import Button from '../../components/Button';
import CircleButton from '../../components/CircleButton';

import type { UserData } from '../../../typings';

import styles from './index.less';

interface LoginProp {
  from?: string;
}

interface LocationState {
  changeAccount?: boolean;
  isExpired?: boolean;
}

const LoginGuides = [
  '① 点击 「登录米游社」 按钮打开登录窗口',
  '② 在登录窗口中登录 「米游社」 账号',
  '③ 成功登录后关闭登录窗口',
  '④ 点击 「验证账号」 按钮完成登录'
];

const Login: React.FC<LoginProp> = (props) => {
  const notice = useNotice();
  const auth = useAuth();
  const navigate = useNavigate();
  const state = useLocation().state as LocationState;
  const [users, setUsers] = useState<UserData[]>([]);
  const [isSwitching, setIsSwitching] = useState<boolean>(state?.changeAccount);

  useEffect(() => {
    if (props?.from) notice.faild({ message: '请登录以使用全部功能' });
    if (state?.isExpired) notice.faild({ message: '验证信息已过期，请重新登录' });
    (async () => {
      const users: UserData[] = await nativeApi.getStoreKey('users');
      if (users.length > 0) {
        // if (isSwitching) notice.info({ message: "点击页面底部已登录 UID 可快速切换本地账号" });
        users.sort((p, n) => Number(p.uid) - Number(n.uid));
        setUsers(users);
      }
      // setUsers([...users, ...users]);
      // setUsers([...users, ...users, ...users, ...users, ...users, ...users]);
    })();
  }, []);

  const handleLogin = () => {
    notice.success({ message: '正在打开登录页面...', duration: 1200 });
    nativeApi.loginByBBS();
  };

  const handleRefresh = async () => {
    const user = await nativeApi.getCurrentUser();
    if (!user) {
      auth.logout();
      notice.faild({ message: '未获取到 UID 信息，请确保登录成功且在米游社绑定过 UID' });
      return;
    } else {
      notice.success({ message: '登录成功，正在前往首页登录前页面...' });
      setTimeout(() => {
        setIsSwitching(false);
        auth.login();
      }, 1200);
    }
  };

  const handleUserSwitch = async (uid: string) => {
    await nativeApi.changeUser(uid);
    notice.success({ message: `已切换到 UID ${uid}，正在前往首页...` });
    setTimeout(() => {
      setIsSwitching(false);
      auth.login();
    }, 1000);
  };

  const naviProps = {
    to: props?.from || '/',
    replace: true
  };

  if (auth.isLogin && !isSwitching) return <Navigate {...naviProps} />;

  const handleBack = async () => {
    const user = await nativeApi.getCurrentUser();
    if (!user) auth.logout();
    navigate('/');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.title}>{isSwitching ? '切换' : '登录'} 「米游社」 账号</div>
        </div>
        <div className={styles.content}>
          <div>
            <div>操作步骤：</div>
            {LoginGuides.map((e) => 
              <div className={styles.step} key={e}>
                {e}
              </div>
            )}
            <span>注意：如果之前没有使用过米游社 APP，请先前往米游社 APP 绑定 UID</span>
          </div>
          <div className={styles.btns}>
            <Button type='confirm' size='middle' text='登录米游社' onClick={handleLogin} />
            <Button type='confirm' size='middle' text='验证账号' onClick={handleRefresh} />
          </div>
          {users.length > 0 && 
            <div className={styles.localUser}>
              <div>※ 点击下方 UID 可快速登录本地账号 ※</div>
              <div
                style={{
                  justifyContent: users.length > 6 ? 'flex-start' : 'center',
                  overflow: users.length > 6 ? 'auto' : 'hidden'
                }}
              >
                {users.map((e, i) => 
                  <Button
                    key={e.uid + i}
                    text={e.uid}
                    onClick={handleUserSwitch.bind(null, e.uid)}
                  />
                )}
              </div>
            </div>
          }
        </div>
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={handleBack}
        />
      </div>
      {notice.holder}
    </>
  );
};

export default Login;
