import React, { useState } from 'react';
import SelectButton from '../../../components/SelectButton';

import type { Notice } from '../../../hooks/useNotice';

import styles from './index.less';

interface WeekMaterialProp {
  notice: Notice;
  roles: RepoRole[];
}

interface WeekBoss extends WeekItem {
  materials: WeekMaterial[];
}

interface WeekMaterial extends WeekItem {
  roles: WeekBaseRole[];
}

const WeekMaterial: React.FC<WeekMaterialProp> = ({ roles }) => {
  const [idx, setIdx] = useState(0);

  // 所有材料对应的周本 Boss（包含重复项）
  const allBosses = roles.map((e) => e.material.talent.advance.domain);
  // Boss 去重
  const bosses = allBosses.filter((e, i) => allBosses.findIndex((f) => f.name === e.name) === i);

  // 所有材料（包含重复项）
  const allMaterials = roles.map((e) => e.material.talent.advance);
  // 材料去重
  const materials = allMaterials.filter((e, i) => allMaterials.findIndex((f) => f.name === e.name) === i);

  const list: WeekBoss[] = bosses.map((e) => {
    const matchMaterials: WeekMaterial[] = materials
      .filter((f) => f.domain.name === e.name)
      .map((e) => {
        const matchRoles = roles.filter((f) => f.material.talent.advance.name === e.name);

        return { ...e, roles: matchRoles };
      });

    return { ...e, materials: matchMaterials };
  });

  return (
    <div className={styles.weekMaterial}>
      <div className={styles.top}>
        <SelectButton style={{ height: '28px' }} value={idx} changeItem={setIdx} items={list.map((e, i) => ({ label: e.name, value: i }))} />
      </div>

      <div className={styles.bossItem}>
        <div>
          <img src={list[idx].icon} />
          {/* <span>{list[idx].name}</span> */}
        </div>
        <div>
          {list[idx].materials.map((e) => (
            <div key={e.name} className={styles.materialItem}>
              <div>
                <img src={e.icon} />
                <span>{e.name}</span>
              </div>
              <div>
                {e.roles.map((e) => (
                  <div key={e.name} className={styles.role}>
                    <img src={e.avatar.full} title={e.name} />
                    <span>{e.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className={styles.tip}>※ 秘境在每天的凌晨四点刷新，若当前时间超过零点但未过凌晨四点，请以前一日数据为准。</span>
    </div>
  );
};

export default WeekMaterial;

interface WeekBaseRole {
  name: string;
  enname: string;
  element: string;
  rarity: number;
  avatar: Avatar;
  poster: Poster;
}

export interface RepoRole extends WeekBaseRole {
  material: Material;
}

interface Avatar {
  basic: string;
  side: string;
  full: string;
}

interface Poster {
  mobile: string;
}

interface Material {
  talent: Talent;
}

interface WeekItem {
  icon: string;
  name: string;
}

interface Talent {
  advance: Advance;
  nomal: Nomal;
}

interface Advance extends WeekItem {
  domain: WeekItem;
}

interface Nomal extends WeekItem {
  drop: number[];
  domain: WeekItem;
}
