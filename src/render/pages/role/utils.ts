import { StarImgs } from './constants';

import type { Reliquarie, Role as RoleInfo } from '../../../services/getOwnedRoleList';
import type { PublicRole } from '../../../services/getPublicRoleList';

type RenderRoleInfo = RoleInfo & PublicRole;

export interface ReliquaryEffect {
  name: string;
  effects: { num: number; effect: string }[];
}

export const getStarImage = (rarity: number) =>
  StarImgs[(rarity > 5 ? 5 : rarity) - 1];

// 将获取的个人角色信息和公开的角色的信息合并
export const getFullRoleInfo = (
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
export const getReliquaryEffects = (reliquaries: Reliquarie[]): ReliquaryEffect[] => {
  const effects: ReliquaryEffect[] = [];
  // 对每一个圣遗物进行遍历
  for (const e of reliquaries) {
    const isExist = effects.map((e) => e.name).includes(e.set.name);
    // 如果该系列已经处理过，则跳过
    if (isExist) continue;
    // 没处理则往下处理，先获取圣遗物套装名称
    const effectName = e.set.name;
    // 获取需要触发套装效果的数目列表，一般是 2、4
    const effectNums = e.set.affixes.map((e) => e.activation_number);
    // 获取已装配的该系列套装的数目
    const setNum = reliquaries.filter((e) => e.set.name === effectName).length;
    // 声明一个套装系列效果的列表 { num: number, effect: string }
    const _effects = [];
    // 遍历触发套装效果的数目列表，依次判断是否达到数目要求
    for (const num of effectNums) {
      // 达到数目要求则视为有效效果，加入到套装系列效果的列表
      if (setNum >= num) {
        const affiex = e.set.affixes.find((e) => e.activation_number === num);
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