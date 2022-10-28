import React from 'react';
import D from 'dayjs';

import AbyssNumber from '../../../components/AbyssNumber';
import NumberDescription from '../../../components/NumberDescription';
import RoleNumber from '../../../components/RoleNumber';
// import abyssBg from '../../../../assets/abyss-bg.png';
import star1 from '../../../../assets/star1.png';

import type { SpiralAbyssData } from '../../../../services/getSpiralAbyss';

import styles from './index.less';

interface SpiralAbyssProp {
  data: SpiralAbyssData;
}

const formatTime = (timestamp: string) => {
  return D(Number(timestamp) * 1000).format('YYYY/MM/DD HH:mm');
};

const SpiralAbyss: React.FC<SpiralAbyssProp> = props => {
  const {
    data: {
      schedule_id,
      is_unlock,
      floors,
      max_floor,
      total_star,
      start_time,
      end_time,
      total_win_times,
      total_battle_times,
      // reveal_rank,
      damage_rank,
      defeat_rank,
      normal_skill_rank,
      energy_skill_rank,
      take_damage_rank,
    },
  } = props;

  const hasData = start_time && is_unlock && total_battle_times !== 0;
  const period = `${formatTime(start_time)} ~ ${formatTime(end_time)}`;
  const succRate = Math.round((total_win_times / total_battle_times) * 100);
  const [floor, zone] = max_floor.split('-').map(Number);

  const map = [
    '最强一击',
    '最多击败',
    '最多元素战技',
    '最多元素爆发',
    '最多承伤',
  ];

  const ranks = [
    damage_rank,
    defeat_rank,
    normal_skill_rank,
    energy_skill_rank,
    take_damage_rank,
  ];

  const roleNums = ranks.map((e, i) => ({
    avatar: e.length > 0 ? e[0].avatar_icon : '',
    value: e.length > 0 ? e[0].value : 0,
    description: map[i],
  }));

  return (
    <div className={styles.spiralAbyss}>
      {hasData ? (
        <>
          <div className={styles.row}>
            <AbyssNumber values={[floor, zone]} description="本期最深抵达" />
            <NumberDescription
              value={total_star}
              description="本期获星"
              sub="/36"
            />
            <NumberDescription
              value={total_battle_times}
              description="本期战斗次数"
            />
            <NumberDescription
              value={total_win_times}
              description="本期完成次数"
            />
            <NumberDescription
              value={succRate}
              description="本期完成率"
              sub="%"
            />
            {roleNums.map(e => (
              <RoleNumber key={e.value} {...e} />
            ))}
          </div>

          <div className={styles.detail}>
            {floors.map(e => (
              <div key={e.index}>
                <div>
                  {/* <img src={abyssBg} alt="关卡logo" /> */}
                  <span>{e.index}</span>
                </div>
                <div>
                  <img src={star1} alt="星星" className={styles.star} />
                  <span>
                    {e.star}/{e.max_star}
                  </span>
                </div>
                <div>
                  {e.levels.map(e => (
                    <div key={e.index}>
                      第{e.index}间|本期：{e.star}|历史最高：{e.max_star}
                      <div>
                        {e.battles.map(e => (
                          <div key={e.index}>
                            {e.index === 1 ? '上' : '下'}半场|时间：
                            {formatTime(e.timestamp)}
                            <div>
                              {e.avatars.map(e => (
                                <div key={e.id}>
                                  <img src={e.icon} width="16px" alt="" />
                                  <span>
                                    Lv. {e.level}|{e.rarity}星
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.tip}>
            {`统计周期：${period} （总第 ${schedule_id} 期）`}
          </div>
        </>
      ) : (
        <span className={styles.none}>暂无当期数据</span>
      )}
    </div>
  );
};

export default SpiralAbyss;
