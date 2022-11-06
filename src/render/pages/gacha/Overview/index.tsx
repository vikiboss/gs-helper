import cn from 'classnames';
import React, { useMemo } from 'react';

import type { PageProp } from '..';
import getAverageTimes from '../utils/getAverageTimes';
import getGachaStatictics from '../utils/getGachaStatictics';
import getLuckInfo from '../utils/getLuckInfo';
import getMostInfo from '../utils/getMostInfo';
import transformGachaDataDate from '../utils/transformGachaDataDate';

import styles from './index.less';

const LevelMap = ['虚位以待', '欧', '吉', '平', '凶', '非'];

const Overview: React.FC<PageProp> = ({ gacha }) => {
  const MostInfo = useMemo(() => getMostInfo(gacha), [gacha]);
  const statictics = useMemo(() => getGachaStatictics(gacha), [gacha]);
  const luckInfo = useMemo(() => getLuckInfo(gacha), [gacha]);
  const limitRoleTimes = useMemo(() => getAverageTimes(gacha, 'role'), [gacha]);
  const limitWeaponTimes = useMemo(() => getAverageTimes(gacha, 'weapon'), [gacha]);
  const dateInfo = transformGachaDataDate(gacha.list);
  const maxTimes = Math.max(...dateInfo.map((e) => e.value));
  const days = dateInfo.filter((e) => e.value === maxTimes);
  const maxDay = days.length && days[days.length - 1].day;

  const getLevel = (times: number) => {
    if (times === 0) return 0;
    if (times >= 72) return 5;
    if (times >= 68) return 4;
    if (times >= 60) return 3;
    if (times >= 54) return 2;
    return 1;
  };

  const updateTime = gacha.info.update_time;

  return (
    <div className={styles.content}>
      <div className={styles.tip}>上次数据更新时间：{updateTime}</div>
      <div className={styles.cards}>
        {statictics.map((e) => (
          <div key={e.name} className={cn(styles.luck, styles[`luck-${getLevel(e.times)}`])}>
            <div className={styles.name}>{e.name}</div>
            <div className={styles.sumary}>
              <div className={styles.count}>{e.times}</div>
              <div className={styles.title}>{LevelMap[getLevel(e.times)]}</div>
            </div>
            <div className={styles.tags} key={e.name}>
              {e.unluckyDays > 0 && (
                <span className={styles.tag}>{`已垫 ${e.unluckyDays} 抽`}</span>
              )}
              {e.unluckyDays_4 > 0 && (
                <span className={styles.tag}>{`已 ${e.unluckyDays_4} 抽未出紫及以上`}</span>
              )}
              <span className={styles.tag}>{e.all ? `共计 ${e.all} 抽` : '从未抽过'}</span>
              <span className={styles.tag}>{e.number ? `已出 ${e.number} 金` : '至今未出金'}</span>
              {e.times > 0 && <span className={styles.tag}>{`平均每金 ${e.times} 抽`}</span>}{' '}
              {e.times > 0 && (
                <span className={styles.tag}>{`平均每金消耗 ${e.times * 160} 原石`}</span>
              )}
              <span className={styles.tag}>{e.comment}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.desc}>
        <div>
          <div>
            {'※ 经历 '}
            <span className={styles.star3}>{luckInfo.count}</span>
            {' 次小保底，歪了 '}
            <span className={styles.star4}>{luckInfo.miss}</span>
            {' 次，歪的概率：'}
            <span className={styles.star5}>{luckInfo.rate}%</span>
          </div>
          {/* <div>
            {"※ 小保底歪的概率："}
            <span className={styles.star5}>{luckInfo.rate}%</span>
          </div> */}
          {limitRoleTimes > 0 ? (
            <div>
              {'※ 平均每个'}
              <span className={styles.star4}>{'限定五星角色'}</span>
              {'消耗 '}
              <span className={styles.star5}>{Math.round(limitRoleTimes * 160)}</span>
              {' 原石（'}
              <span className={styles.star5}>{limitRoleTimes}</span>
              {' 抽）'}
            </div>
          ) : (
            <div>
              ※ 暂未获得<span className={styles.star4}>{'限定五星角色'}</span>
            </div>
          )}

          {limitWeaponTimes > 0 ? (
            <div>
              {'※ 平均每把'}
              <span className={styles.star4}>{'限定五星武器'}</span>
              {'消耗 '}
              <span className={styles.star5}>{Math.round(limitWeaponTimes * 160)}</span>
              {' 原石（'}
              <span className={styles.star5}>{limitWeaponTimes}</span>
              {' 抽）'}
            </div>
          ) : (
            <div>
              ※ 暂未获得<span className={styles.star4}>{'限定五星武器'}</span>
            </div>
          )}

          {gacha.list.length > 0 ? (
            <div>
              {'※ 共计祈愿 '}
              <span className={styles.star4}>{gacha.list.length}</span>
              {' 次，价值 '}
              <span className={styles.star5}>{gacha.list.length * 160}</span>
              {' 原石'}
            </div>
          ) : (
            <div>※ 没有祈愿记录</div>
          )}
        </div>
        <div>
          {MostInfo.unluckest.valid && (
            <span className={styles.item} style={{ backgroundColor: '#505a6d' }}>
              最非酋的五星：{MostInfo.unluckest.name}，{MostInfo.unluckest.count} 发才出
            </span>
          )}
          {MostInfo.luckest.valid && (
            <span className={styles.item} style={{ backgroundColor: '#e4b44d' }}>
              最欧皇的五星：{MostInfo.luckest.name}，{MostInfo.luckest.count} 发就出啦
            </span>
          )}
          {MostInfo.predestined.valid && MostInfo.predestined.count >= 2 && (
            <span className={styles.item} style={{ backgroundColor: '#8ab648' }}>
              最有缘的五星：{MostInfo.predestined.name}，重复抽到 {MostInfo.predestined.count} 次
            </span>
          )}
          {maxTimes >= 10 && (
            <span className={styles.item} style={{ backgroundColor: '#9d78d2' }}>
              最疯狂的一天：{maxDay}，这天一共抽了 {maxTimes} 次!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
