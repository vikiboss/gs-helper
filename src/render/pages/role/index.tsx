import React, { Fragment, useEffect, useState } from 'react';
import cn from 'classnames';
import { FaHeart } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import {
  ElementImgs,
  ElementOptions,
  RarityOptions,
  TabMap,
  tabs,
  WeaponOptions,
} from './constants';
import { ElementTypes } from '../../../constants';
import { getFullRoleInfo, getReliquaryEffects, getStarImage } from './utils';
import Button from '../../components/Button';
import CircleButton from '../../components/CircleButton';
import ItemCard from '../../components/ItemCard';
import Loading from '../../components/Loading';
import nativeApi from '../../utils/nativeApi';
import RoleCard from '../../components/RoleCard';
import Select from '../../components/Select';
import useNotice from '../../hooks/useNotice';
import WeaponCard from '../../components/WeaponCard';
import withAuth from '../../auth/withAuth';

import lock from '../../../assets/lock.png';

import type { PublicRole } from '../../../services/getPublicRoleList';
import type { Role as RoleInfo } from '../../../services/getOwnedRoleList';

import styles from './index.less';

export type RenderRoleInfo = RoleInfo & PublicRole;
export type TabType = 'weapon' | 'reliquary' | 'constellation' | 'profile';

type Filters = [number, string, number];

const defaultFilters: Filters = [0, 'all', 0];

const Role: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const [index, setIndex] = useState<number>(0);
  const [constellIndex, setConstellIndex] = useState<number>(0);
  const [infoTab, setInfoTab] = useState<TabType>('weapon');
  const [isRoleChanging, setIsRoleChanging] = useState<boolean>(true);
  const [mode, setMode] = useState<'detail' | 'list'>('list');
  const [publicRoles, setPublicRolos] = useState<PublicRole[]>([]);
  const [roles, setRoles] = useState<RoleInfo[]>([]);

  const updateInfo = async (): Promise<void> => {
    try {
      // 获取官网公开的全部角色列表，包含介绍、图片、声优、语音等数据
      const pbRoles = await nativeApi.getPublicRoleList();

      if (!pbRoles.length) {
        updateInfo();
        return;
      }

      setPublicRolos(pbRoles);

      // 获取用户的角色列表
      const ownedRoles = await nativeApi.getOwnedRoleList();
      // 角色排序先后依据：角色等级、角色星级、角色命座数、武器星级、武器等级

      console.log(ownedRoles);

      ownedRoles.sort(
        (p, n) => n.level - p.level
          || n.rarity - p.rarity
          || n.actived_constellation_num - p.actived_constellation_num
          || n.weapon.rarity - p.weapon.rarity
          || n.weapon.level - p.weapon.level,
      );

      if (ownedRoles.length) {
        setRoles(ownedRoles);
      }

      // if (roles.length) setRoles([...roles, ...roles]);
    } catch (e) {
      const isOffline = e?.message?.includes('getaddrinfo');
      const msg = isOffline ? '网络状况不佳，请检查后重试 T_T' : '加载超时，请检查网络连接 T_T';
      notice.faild({ message: msg });
    }
  };

  useEffect(() => {
    updateInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fullRoles = getFullRoleInfo(roles, publicRoles).filter((e) => {
    const isRarityOK = filters[0] === 0 || e.rarity === filters[0];
    const isElementOK = filters[1] === 'all' || e.element === filters[1];
    const isWeaponOK = filters[2] === 0 || e.weapon.type === filters[2];
    return isElementOK && isWeaponOK && isRarityOK;
  });
  const isDetail = mode === 'detail' && fullRoles.length > 0;
  const currentRole = fullRoles[index];
  const reliquaryEffects = isDetail ? getReliquaryEffects(fullRoles[index].reliquaries) : [];

  const toggleMode = () => {
    setInfoTab('weapon');
    setMode(isDetail ? 'list' : 'detail');
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    const isLeft = direction === 'left';
    const i = (index + (isLeft ? -1 : 1) + fullRoles.length) % fullRoles.length;
    setIndex(i);
    setIsRoleChanging(false);
    setTimeout(() => setIsRoleChanging(true), 0);
  };

  return (
    <>
      <div
        className={cn(
          styles.container,
          isDetail ? styles[currentRole.element.toLowerCase()] : '',
          isDetail && isRoleChanging ? styles.bgAni : '',
        )}
      >
        <div className={styles.topZone}>
          {!isDetail && roles.length > 0 && (
            <>
              <span className={cn(styles.title)}>我的角色</span>
              <div className={styles.selects}>
                <Select
                  name='rarityFilter'
                  value={filters[0]}
                  onChange={(e) => {
                    setFilters([Number(e.target.value), filters[1], filters[2]]);
                    setIsRoleChanging(false);
                    setTimeout(() => {
                      setIsRoleChanging(true);
                    }, 0);
                  }}
                  options={RarityOptions}
                />
                <Select
                  name='elementFilter'
                  value={filters[1]}
                  onChange={(e) => {
                    setFilters([filters[0], e.target.value, filters[2]]);
                    setIsRoleChanging(false);
                    setTimeout(() => {
                      setIsRoleChanging(true);
                    }, 0);
                  }}
                  options={ElementOptions}
                />
                <Select
                  name='weaponFilter'
                  value={filters[2]}
                  onChange={(e) => {
                    setFilters([filters[0], filters[1], Number(e.target.value)]);
                    setIsRoleChanging(false);
                    setTimeout(() => {
                      setIsRoleChanging(true);
                    }, 0);
                  }}
                  options={WeaponOptions}
                />
              </div>
            </>
          )}
          {isDetail && (
            <Button
              className={cn(styles.allRoleBtn, styles.allRoleBtnAni)}
              text='所有角色'
              theme='light'
              onClick={toggleMode}
            />
          )}
        </div>
        {roles.length > 0 ? (
          <>
            {!isDetail && (
              <div className={cn(styles.roleTable, isRoleChanging ? styles.roleTableAni : '')}>
                {fullRoles.map((e, i) => (
                  <RoleCard
                    key={e.id}
                    style={{ margin: '4px' }}
                    role={e}
                    onClick={() => {
                      setIndex(i);
                      setMode('detail');
                    }}
                  />
                ))}
                {roles.length > 0 && fullRoles.length === 0 && (
                  <div className={styles.empty}>筛选结果为空</div>
                )}
              </div>
            )}
            {/* 渲染角色详情页 */}
            {isDetail && (
              <div className={styles.roleDetail}>
                <div className={styles.detailContent}>
                  <div className={styles.roleInfo}>
                    <div className={cn(styles.titleZone, isRoleChanging ? styles.titleAni : '')}>
                      <div className={cn(styles.name)}>{currentRole.name}</div>
                      <img src={getStarImage(currentRole.rarity)} />
                      <div className={styles.roleAttr}>
                        <span>Lv. {currentRole.level}</span>
                        <span>{ElementTypes[currentRole.element]}</span>
                        {!currentRole.name.includes('旅行者') && (
                          <>
                            {/* <span>生日：{D(currentRole.startTime).format("M月D日")}</span> */}
                            <FaHeart size={16} />
                            <span>{currentRole.fetter}</span>
                          </>
                        )}
                        {currentRole.actived_constellation_num > 0 && (
                          <span>
                            {currentRole.actived_constellation_num}命
                            {currentRole.actived_constellation_num >= 6 ? ' （满命）' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={cn(styles.tabContainer, isRoleChanging ? styles.contentAni : '')}
                    >
                      <div className={styles.tab}>
                        {tabs.map((e) => (
                          <div
                            className={e === infoTab ? styles.tabActive : ''}
                            key={e}
                            onClick={() => setInfoTab(e)}
                          >
                            {TabMap[e]}
                          </div>
                        ))}
                      </div>
                      {/* 渲染角色详情的 Tab */}
                      <div className={styles.tabContent}>
                        {/* 渲染武器 Tab */}
                        {infoTab === 'weapon' && (
                          <div className={styles.weapon}>
                            <WeaponCard weapon={currentRole.weapon} />
                            <div>
                              <span>{currentRole.weapon.name}</span>
                              <span>{currentRole.weapon.desc}</span>
                              <span>
                                Lv.{currentRole.weapon.level}
                                {currentRole.weapon.affix_level > 1
                                  && ` / 精炼${currentRole.weapon.affix_level}阶`}
                              </span>
                            </div>
                          </div>
                        )}
                        {/* 渲染圣遗物 Tab */}
                        {infoTab === 'reliquary' && (
                          <div className={styles.reliquary}>
                            <div>
                              {currentRole.reliquaries.length ? (
                                <>
                                  {currentRole.reliquaries.map((e) => (
                                    <ItemCard key={e.pos} item={e} />
                                  ))}
                                </>
                              ) : (
                                <div>未装配任何圣遗物</div>
                              )}
                            </div>
                            <div>
                              {reliquaryEffects.length
                                ? reliquaryEffects.map((e) => (
                                    <Fragment key={e.name}>
                                      <span>{e.name}</span>
                                      <div>
                                        {e.effects.map((f) => (
                                          <span key={f.num}>
                                            ·{f.num}件套：{f.effect}
                                          </span>
                                        ))}
                                      </div>
                                    </Fragment>
                                ))
                                : currentRole.reliquaries.length > 0 && (
                                    <div>当前圣遗物没有套装效果</div>
                                )}
                            </div>
                          </div>
                        )}
                        {/* 渲染命座 Tab */}
                        {infoTab === 'constellation' && (
                          <div className={styles.constellation}>
                            <div>
                              {currentRole.constellations.map((e, i) => (
                                <img
                                  className={constellIndex === i ? styles.constelllActive : ''}
                                  key={e.name + i}
                                  src={e.is_actived ? e.icon : lock}
                                  onClick={() => setConstellIndex(i)}
                                />
                              ))}
                            </div>
                            <div>
                              <span>
                                {currentRole.constellations[constellIndex].name}
                                {currentRole.constellations[constellIndex].is_actived
                                  ? ''
                                  : ' （未激活）'}
                              </span>
                              <span>命之座·第{constellIndex + 1}层</span>
                              <div>
                                {currentRole.constellations[constellIndex].effect
                                  .replace(/<(.*?)>/g, '')
                                  .split('\\n')
                                  .map((e) => (
                                    <div key={e}>{e}</div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        )}
                        {/* 渲染简介 Tab */}
                        {infoTab === 'profile' && (
                          <div className={styles.profile}>
                            <span className={styles.introduction}>{currentRole.introduction}</span>
                            <span className={styles.CV}>
                              CV：
                              {currentRole.CVs.map((e) => `${e.name}(${e.type})`).join('、')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cn(styles.mask, isRoleChanging ? styles.imgAni : '')} />
                <img
                  className={cn(styles.img, isRoleChanging ? styles.imgAni : '')}
                  src={currentRole.image}
                />
                <div className={cn(styles.extInfo, isRoleChanging ? styles.imgAni : '')}>
                  {currentRole.line && <img src={currentRole.line} />}
                </div>
              </div>
            )}
          </>
        ) : (
          <Loading className={styles.loading} />
        )}

        {!isDetail && (
          <CircleButton
            Icon={TiArrowBack}
            size='middle'
            className={styles.backBtn}
            onClick={() => navigate('/')}
          />
        )}

        {isDetail && (
          <>
            <img
              className={cn(styles.bgElement, isRoleChanging ? styles.elementAni : '')}
              src={ElementImgs[currentRole.element]}
            />
            <div className={styles.arrowLeft} onClick={handleArrowClick.bind(null, 'left')} />
            <div className={styles.arrowRight} onClick={handleArrowClick.bind(null, 'right')} />
          </>
        )}
      </div>
      {notice.holder}
    </>
  );
};

export default withAuth(Role);
