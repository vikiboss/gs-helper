import { FaHeart } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import React, { Fragment, useEffect, useState } from 'react';

import { ElementTypes } from '../../../constants';
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

import star1 from '../../../assets/star1.png';
import star2 from '../../../assets/star2.png';
import star3 from '../../../assets/star3.png';
import star4 from '../../../assets/star4.png';
import star5 from '../../../assets/star5.png';

import Pyro from '../../../assets/pyro.png';
import Hydro from '../../../assets/hydro.png';
import Anemo from '../../../assets/anemo.png';
import Electro from '../../../assets/electro.png';
import Geo from '../../../assets/geo.png';
import Cryo from '../../../assets/cryo.png';
import Dendro from '../../../assets/dendro.png';

import type { PublicRole } from '../../../services/getPublicRoleList';
import type {
  Reliquarie,
  Role as RoleInfo,
} from '../../../services/getOwnedRoleList';

import styles from './index.less';

type RenderRoleInfo = RoleInfo & PublicRole;
type TabType = 'weapon' | 'reliquary' | 'constellation' | 'profile';

interface ReliquaryEffect {
  name: string;
  effects: { num: number; effect: string }[];
}

const StarImgs: string[] = [star1, star2, star3, star4, star5];

const ElementImgs: Record<string, string> = {
  Pyro,
  Hydro,
  Anemo,
  Electro,
  Geo,
  Cryo,
  Dendro,
};

const tabs: TabType[] = ['weapon', 'reliquary', 'constellation', 'profile'];

const TabMap: Record<TabType, string> = {
  weapon: '武器',
  reliquary: '圣遗物',
  constellation: '命座',
  profile: '简介',
};

const getStarImage = (rarity: number) =>
  StarImgs[(rarity > 5 ? 5 : rarity) - 1];

// 将获取的个人角色信息和公开的角色的信息合并
const getFullRoleInfo = (
  roles: RoleInfo[],
  publickRoles: PublicRole[]
): RenderRoleInfo[] => {
  const res = [];
  for (const role of roles) {
    if (role.name === '旅行者') {
      res.push({
        ...role,
        name: role.image.includes('Girl') ? '旅行者·荧' : '旅行者·空',
        introduction:
          '从世界之外漂流而来的旅行者，被神带走血亲，自此踏上寻找七神之路',
        startTime: '2020-09-28 00:00:00',
        line: '',
        CVs: [
          {
            name: role.image.includes('Girl') ? '宴宁' : '鹿喑',
            type: '中',
            vos: [],
          },
          {
            name: role.image.includes('Girl') ? '悠木碧' : '堀江瞬',
            type: '日',
            vos: [],
          },
        ],
      });
      continue;
    }
    for (const publickRole of publickRoles) {
      if (role.name === publickRole.name) {
        res.push({ ...role, ...publickRole });
      }
    }
  }
  return res;
};

// 圣遗物套装效果转换算法
const getReliquaryEffects = (reliquaries: Reliquarie[]): ReliquaryEffect[] => {
  const effects: ReliquaryEffect[] = [];
  // 对每一个圣遗物进行遍历
  for (const e of reliquaries) {
    const isExist = effects.map(e => e.name).includes(e.set.name);
    // 如果该系列已经处理过，则跳过
    if (isExist) continue;
    // 没处理则往下处理，先获取圣遗物套装名称
    const effectName = e.set.name;
    // 获取需要触发套装效果的数目列表，一般是 2、4
    const effectNums = e.set.affixes.map(e => e.activation_number);
    // 获取已装配的该系列套装的数目
    const setNum = reliquaries.filter(e => e.set.name === effectName).length;
    // 声明一个套装系列效果的列表 { num: number, effect: string }
    const _effects = [];
    // 遍历触发套装效果的数目列表，依次判断是否达到数目要求
    for (const num of effectNums) {
      // 达到数目要求则视为有效效果，加入到套装系列效果的列表
      if (setNum >= num) {
        const affiex = e.set.affixes.find(e => e.activation_number === num);
        _effects.push({ num: affiex.activation_number, effect: affiex.effect });
      }
    }
    // 如果该系列存在有效的效果，则将该系列的圣遗物效果加入到总效果列表中
    if (_effects.length > 0) {
      effects.push({ name: e.set.name, effects: _effects });
    }
  }
  // 返回套装总效果
  return effects;
};

const ElementOptions = [
  {
    value: 'all',
    label: '所有元素',
  },
  {
    value: 'Pyro',
    label: '火元素',
  },
  {
    value: 'Electro',
    label: '雷元素',
  },
  {
    value: 'Geo',
    label: '岩元素',
  },
  {
    value: 'Cryo',
    label: '冰元素',
  },
  {
    value: 'Anemo',
    label: '风元素',
  },
  {
    value: 'Hydro',
    label: '水元素',
  },
  {
    value: 'Dendro',
    label: '草元素',
  },
];

const WeaponOptions = [
  {
    value: 0,
    label: '所有武器',
  },
  {
    value: 1,
    label: '单手剑',
  },
  {
    value: 11,
    label: '双手剑',
  },
  {
    value: 12,
    label: '弓',
  },
  {
    value: 13,
    label: '长柄武器',
  },
  {
    value: 10,
    label: '法器',
  },
];

const RarityOptions = [
  {
    value: 0,
    label: '所有星级',
  },
  {
    value: 5,
    label: '5星角色',
  },
  {
    value: 4,
    label: '4星角色',
  },
];

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

  useEffect(() => {
    (async () => await updateInfo())();
  }, []);

  const updateInfo = async (): Promise<void> => {
    try {
      // 获取官网公开的全部角色列表，包含介绍、图片、声优、语音等数据
      const pbRoles = await nativeApi.getPublicRoleList();
      if (!pbRoles.length) return updateInfo();
      setPublicRolos(pbRoles);

      // 获取用户的角色列表
      const roles = await nativeApi.getOwnedRoleList();
      // 角色排序先后依据：角色等级、角色星级、角色命座数、武器星级、武器等级
      roles.sort((p, n) => {
        return (
          n.level - p.level ||
          n.rarity - p.rarity ||
          n.actived_constellation_num - p.actived_constellation_num ||
          n.weapon.rarity - p.weapon.rarity ||
          n.weapon.level - p.weapon.level
        );
      });
      if (roles.length) setRoles(roles);
      // if (roles.length) setRoles([...roles, ...roles]);
    } catch (e) {
      const isOffline = e?.message?.includes('getaddrinfo');
      const msg = isOffline
        ? '网络状况不佳，请检查后重试 T_T'
        : '加载超时，请检查网络连接 T_T';
      notice.faild({ message: msg });
    }
  };

  const _roles = getFullRoleInfo(roles, publicRoles).filter(e => {
    const isRarityOK = filters[0] === 0 || e.rarity === filters[0];
    const isElementOK = filters[1] === 'all' || e.element === filters[1];
    const isWeaponOK = filters[2] === 0 || e.weapon.type === filters[2];
    return isElementOK && isWeaponOK && isRarityOK;
  });
  const isDetail = mode === 'detail' && _roles.length > 0;
  const currentRole = _roles[index];
  const reliquaryEffects = isDetail
    ? getReliquaryEffects(_roles[index].reliquaries)
    : [];

  const toggleMode = () => {
    setInfoTab('weapon');
    setMode(isDetail ? 'list' : 'detail');
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    const isLeft = direction === 'left';
    const i = (index + (isLeft ? -1 : 1) + _roles.length) % _roles.length;
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
          isDetail && isRoleChanging ? styles.bgAni : ''
        )}
      >
        <div className={styles.topZone}>
          {!isDetail && roles.length > 0 && (
            <>
              <span className={cn(styles.title)}>我的角色</span>
              <div className={styles.selects}>
                <Select
                  name="rarityFilter"
                  value={filters[0]}
                  onChange={e => {
                    setFilters([
                      Number(e.target.value),
                      filters[1],
                      filters[2],
                    ]);
                    setIsRoleChanging(false);
                    setTimeout(() => {
                      setIsRoleChanging(true);
                    }, 0);
                  }}
                  options={RarityOptions}
                />
                <Select
                  name="elementFilter"
                  value={filters[1]}
                  onChange={e => {
                    setFilters([filters[0], e.target.value, filters[2]]);
                    setIsRoleChanging(false);
                    setTimeout(() => {
                      setIsRoleChanging(true);
                    }, 0);
                  }}
                  options={ElementOptions}
                />
                <Select
                  name="weaponFilter"
                  value={filters[2]}
                  onChange={e => {
                    setFilters([
                      filters[0],
                      filters[1],
                      Number(e.target.value),
                    ]);
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
              text="所有角色"
              theme="light"
              onClick={toggleMode}
            />
          )}
        </div>
        {roles.length > 0 ? (
          <>
            {!isDetail && (
              <div
                className={cn(
                  styles.roleTable,
                  isRoleChanging ? styles.roleTableAni : ''
                )}
              >
                {_roles.map((e, i) => (
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
                {roles.length > 0 && _roles.length === 0 && (
                  <div className={styles.empty}>筛选结果为空</div>
                )}
              </div>
            )}
            {/* 渲染角色详情页 */}
            {isDetail && (
              <div className={styles.roleDetail}>
                <div className={styles.detailContent}>
                  <div className={styles.roleInfo}>
                    <div
                      className={cn(
                        styles.titleZone,
                        isRoleChanging ? styles.titleAni : ''
                      )}
                    >
                      <div className={cn(styles.name)}>{currentRole.name}</div>
                      <img src={getStarImage(currentRole.rarity)} alt="star" />
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
                            {currentRole.actived_constellation_num >= 6
                              ? ' （满命）'
                              : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={cn(
                        styles.tabContainer,
                        isRoleChanging ? styles.contentAni : ''
                      )}
                    >
                      <div className={styles.tab}>
                        {tabs.map(e => (
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
                                {currentRole.weapon.affix_level > 1 &&
                                  ` / 精炼${currentRole.weapon.affix_level}阶`}
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
                                  {currentRole.reliquaries.map(e => (
                                    <ItemCard key={e.pos} item={e} />
                                  ))}
                                </>
                              ) : (
                                <div>未装配任何圣遗物</div>
                              )}
                            </div>
                            <div>
                              {reliquaryEffects.length
                                ? reliquaryEffects.map(e => (
                                    <Fragment key={e.name}>
                                      <span>{e.name}</span>
                                      <div>
                                        {e.effects.map(e => (
                                          <span key={e.num}>
                                            ·{e.num}件套：{e.effect}
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
                              {currentRole.constellations.map((e, i) => {
                                return (
                                  <img
                                    className={
                                      constellIndex === i
                                        ? styles.constelllActive
                                        : ''
                                    }
                                    key={e.name + i}
                                    src={e.is_actived ? e.icon : lock}
                                    alt={'命座' + e.pos}
                                    onClick={() => setConstellIndex(i)}
                                  />
                                );
                              })}
                            </div>
                            <div>
                              <span>
                                {currentRole.constellations[constellIndex].name}
                                {currentRole.constellations[constellIndex]
                                  .is_actived
                                  ? ''
                                  : ' （未激活）'}
                              </span>
                              <span>命之座·第{constellIndex + 1}层</span>
                              <div>
                                {currentRole.constellations[
                                  constellIndex
                                ].effect
                                  .replace(/<(.*?)>/g, '')
                                  .split('\\n')
                                  .map(e => (
                                    <div key={e}>{e}</div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        )}
                        {/* 渲染简介 Tab */}
                        {infoTab === 'profile' && (
                          <div className={styles.profile}>
                            <span className={styles.introduction}>
                              {currentRole.introduction}
                            </span>
                            <span className={styles.CV}>
                              CV：
                              {currentRole.CVs.map(
                                e => e.name + `(${e.type})`
                              ).join('、')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    styles.mask,
                    isRoleChanging ? styles.imgAni : ''
                  )}
                />
                <img
                  className={cn(
                    styles.img,
                    isRoleChanging ? styles.imgAni : ''
                  )}
                  src={currentRole.image}
                  alt={currentRole.name}
                />
                <div
                  className={cn(
                    styles.extInfo,
                    isRoleChanging ? styles.imgAni : ''
                  )}
                >
                  {currentRole.line && <img src={currentRole.line} alt="" />}
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
            size="middle"
            className={styles.backBtn}
            onClick={() => navigate('/')}
          />
        )}

        {isDetail && (
          <>
            <img
              className={cn(
                styles.bgElement,
                isRoleChanging ? styles.elementAni : ''
              )}
              src={ElementImgs[currentRole.element]}
              alt="element"
            />
            <div
              className={styles.arrowLeft}
              onClick={handleArrowClick.bind(null, 'left')}
            />
            <div
              className={styles.arrowRight}
              onClick={handleArrowClick.bind(null, 'right')}
            />
          </>
        )}
      </div>
      {notice.holder}
    </>
  );
};

export default withAuth(Role);
