import React, { useEffect, useState } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import CircleButton from '../../components/CircleButton';
import GameStatsTab from './GameStatsTab';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import nativeApi from '../../utils/nativeApi';
import RolesTab from './RolesTab';
import SelectButton from '../../components/SelectButton';
import SpiralAbyssTab from './SpiralAbyssTab';
import useApi from '../../hooks/useApi';
import useNotice from '../../hooks/useNotice';
import withAuth from '../../auth/withAuth';

import styles from './index.less';

export type TypeState = 'statistic' | 'roles' | 'abyss';

const { getGameRoleCard, getOwnedRoleList, getSpiralAbyss } = nativeApi;

const Statistic: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();

  const [type, setType] = useState<TypeState>('statistic');
  // const [type, setType] = useState<TypeState>('abyss');

  const [accountUid, setAccountUid] = useState<string>('');
  const [currentUid, setCurrentUid] = useState<string>('');
  const [inputUid, setInputUid] = useState<string>('');

  const [fetchCard, l1, card] = useApi(getGameRoleCard);
  const [fetchRoles, l2, roles] = useApi(getOwnedRoleList);
  const [fetchAbyss, l3, abyss] = useApi(getSpiralAbyss);

  const loaded = !(l1 || l2 || l3) && card && roles && abyss;

  useEffect(() => {
    (async () => {
      const { uid } = await nativeApi.getCurrentUser();
      setAccountUid(uid);
      setCurrentUid(uid);

      await updateInfo(uid);
    })();
  }, []);

  const updateInfo = async (uid?: string) => {
    const results = await Promise.all([
      fetchCard(uid),
      fetchRoles(uid),
      fetchAbyss(uid),
    ]);
    return results.every(Boolean);
  };

  const handleQuery = async () => {
    if (!inputUid) {
      const clipboardText = await nativeApi.readClipboardText();
      const text = clipboardText.replace(/\s/g, '').trim();

      if (!text.match(/^[1-9][0-9]{7,9}$/)) {
        return notice.warning({ message: '剪切板内容无效' });
      }

      setInputUid(text.trim());
    } else {
      if (!inputUid.match(/^[1-9][0-9]{7,9}$/)) {
        return notice.warning({ message: 'UID 无效，请检查' });
      }

      notice.info({ message: '小派蒙努力查询中...', autoHide: false });

      const isOK = await updateInfo(inputUid);

      if (!isOK) {
        notice.faild({ message: '该 UID 不存在、未绑定米游社或数据未公开' });
      } else {
        setCurrentUid(inputUid);
        notice.success({ message: '数据获取成功', duration: 1000 });
      }
    }
  };

  const items: { label: string; value: TypeState }[] = [
    { label: '数据概览', value: 'statistic' },
    { label: '角色展示柜', value: 'roles' },
    { label: '深境螺旋', value: 'abyss' },
  ];

  const backToMyProfile = async () => {
    setCurrentUid(accountUid);
    await updateInfo(accountUid);
  };

  return (
    <>
      <div className={styles.container}>
        {loaded ? (
          <>
            <div className={styles.top}>
              <div className={styles.user}>
                <div>{card.role.nickname}</div>
                <div>{`Lv.${card.role.level} ${accountUid}`}</div>
              </div>
              <SelectButton
                className={styles.selectBtns}
                items={items}
                value={type}
                changeItem={setType}
              />
              {accountUid !== currentUid && (
                <Button
                  className={styles.btn}
                  text="返回"
                  onClick={backToMyProfile}
                />
              )}
              <div className={styles.inputArea}>
                <Input
                  value={inputUid}
                  onChange={e => setInputUid(e.target.value)}
                  autoFocus
                  type="number"
                  placeholder="查询 UID"
                  onKeyDown={e => e.key === 'Enter' && handleQuery()}
                />
                <Button
                  text={inputUid === '' ? '粘贴' : '查询'}
                  onClick={handleQuery}
                />
              </div>
            </div>
            <div className={styles.content}>
              {type === 'statistic' && <GameStatsTab data={card} />}
              {type === 'roles' && <RolesTab data={roles} />}
              {type === 'abyss' && <SpiralAbyssTab data={abyss} />}
            </div>
          </>
        ) : (
          <Loading />
        )}
        <CircleButton
          Icon={TiArrowBack}
          size="middle"
          className={styles.backBtn}
          onClick={() => navigate('/')}
        />
      </div>
      {notice.holder}
    </>
  );
};

export default withAuth(Statistic);
