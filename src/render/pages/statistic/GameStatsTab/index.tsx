import React from 'react';

import { deepClone } from '../../../../utils/utils';
import BounceNumber from '../../../components/BounceNumber';

import type { GameRoleCardData } from '../../../../services/getGameRoleCard';

import styles from './index.less';
import AbyssNumber from '../../../components/AbyssNumber';
import NumberDescription from '../../../components/NumberDescription';

export interface StatisticCardProp {
  data: GameRoleCardData;
}

const StatisticCard: React.FC<StatisticCardProp> = (props) => {
  const { data } = props;

  const we = deepClone(data.world_explorations).reverse();

  const {
    stats: {
      active_day_number,
      achievement_number,
      avatar_number,
      way_point_number,
      domain_number,
      luxurious_chest_number,
      precious_chest_number,
      exquisite_chest_number,
      common_chest_number,
      magic_chest_number,
      spiral_abyss,
      anemoculus_number,
      geoculus_number,
      electroculus_number,
      dendroculus_number,
    },
    homes,
  } = data;

  const [floor, zone] = spiral_abyss.split('-').map(Number);

  return (
    <div className={styles.statisticCard}>
      <div className={styles.column}>
        <div className={styles.stats}>
          <div className={styles.statsBox}>
            <NumberDescription value={active_day_number} description='活跃天' />
            <NumberDescription value={achievement_number} description='成就' />
            <NumberDescription value={avatar_number} description='角色' />
            <NumberDescription value={way_point_number} description='传送点' />
            <NumberDescription value={domain_number} description='秘境' />
            <NumberDescription
              value={luxurious_chest_number}
              description='华丽宝箱'
            />
            <NumberDescription
              value={precious_chest_number}
              description='珍贵宝箱'
            />
            <NumberDescription
              value={exquisite_chest_number}
              description='精致宝箱'
            />
            <NumberDescription
              value={common_chest_number}
              description='普通宝箱'
            />
            <NumberDescription
              value={magic_chest_number}
              description='奇馈宝箱'
            />
            <AbyssNumber values={[floor, zone]} />
            <NumberDescription
              value={anemoculus_number}
              description='风神瞳'
              sub='/66'
            />
            <NumberDescription
              value={geoculus_number}
              description='岩神瞳'
              sub='/131'
            />
            <NumberDescription
              value={electroculus_number}
              description='雷神瞳'
              sub='/181'
            />
            <NumberDescription
              value={dendroculus_number}
              description='草神瞳'
              sub='/271'
            />
          </div>
        </div>
        <div className={styles.homes}>
          <div>
            <span>〓尘歌壶〓</span>
            {data.homes.length > 0 && 
              <div>
                <img
                  src={homes[0].comfort_level_icon}
                  alt={homes[0].comfort_level_name}
                />
                <span>{homes[0].comfort_level_name}</span>
              </div>
            }
          </div>
          {data.homes.length > 0 ? 
            <>
              <div>
                {data.homes.map((e) => 
                  <div key={e.name}>
                    <img src={e.icon} alt={e.name}></img>
                    <span>{e.name}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <div>
                    <BounceNumber size={24} number={homes[0].level} />
                    <span>信任等阶</span>
                  </div>
                  <div>
                    <BounceNumber size={24} number={homes[0].comfort_num} />
                    <span>最高洞天仙力</span>
                  </div>
                  <div>
                    <BounceNumber size={24} number={homes[0].item_num} />
                    <span>获得摆设</span>
                  </div>
                  <div>
                    <BounceNumber size={24} number={homes[0].visit_num} />
                    <span>历史访客</span>
                  </div>
                </div>
              </div>
            </>
           : 
            <div className={styles.off}>尘歌壶未开启</div>
          }
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.explorations}>
          <div>〓世界探索〓</div>
          <div>
            {we.map((e) => {
              const isR = e.type === 'Reputation';
              const name =
                !isR && (e.offerings[0]?.name || '').replaceAll('等级', '');
              const text = isR ? '声望' : name || '';
              const level = text ? `·${text} ${e.level} 级` : '';
              return (
                <div key={e.id}>
                  <img src={e.background_image} alt={e.name} />
                  <div>
                    <img src={e.icon} />
                    <div>
                      <span>{e.name}</span>
                      <span>
                        {e.exploration_percentage / 10}%{level}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
