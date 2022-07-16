import React from "react";
import D from "dayjs";

import abyssBg from "../../../../assets/abyss-bg.png";
import BounceNumber from "../../../components/BounceNumber";
import getServerNameByServer from "../../../../utils/getServerNameByServer";

import type { SpiralAbyssState } from "..";

import styles from "./index.less";

interface SpiralAbyssProp {
  data: SpiralAbyssState;
}

const formatTime = (timestamp: string) => {
  return D(Number(timestamp) * 1000).format("YYYY/MM/DD HH:mm");
};

const SpiralAbyss: React.FC<SpiralAbyssProp> = (props) => {
  const { data } = props;
  const hasData = data.start_time && data.is_unlock && data.total_battle_times !== 0;
  const period = `${formatTime(data.start_time)} ~ ${formatTime(data.end_time)}`;
  const succRate = Math.round((data.total_win_times / data.total_battle_times) * 100);
  return (
    <div className={styles.spiralAbyss}>
      {hasData ? (
        <>
          <div className={styles.row}>
            {data.role && (
              <div className={styles.user}>
                <div>{data.role.nickname}</div>
                <div>
                  Lv.{data.role.level} {getServerNameByServer(data.role.region)} {data.uid}
                </div>
              </div>
            )}
            <div className={styles.abyssBox}>
              <div>
                <div className={styles.horizontal}>
                  <BounceNumber size={24} number={Number(data.max_floor.split("-")[0])} />
                  <div>-</div>
                  <BounceNumber size={24} number={Number(data.max_floor.split("-")[1])} />
                </div>
                <span>本期最深抵达</span>
              </div>
              <div>
                <BounceNumber size={24} number={data.total_star} />
                <span>本期总获星数</span>
              </div>
              <div>
                <BounceNumber size={24} number={data.total_battle_times} />
                <span>本期战斗次数</span>
              </div>
              <div>
                <BounceNumber size={24} number={data.total_win_times} />
                <span>本期完成次数</span>
              </div>
              <div>
                <div className={styles.horizontal}>
                  <BounceNumber size={24} number={succRate} />
                  <div>%</div>
                </div>
                <span>本期完成率</span>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            {data.reveal_rank.length > 0 && (
              <div className={styles.revealRank}>
                <div>〓常用角色〓</div>
                <div>
                  {data.reveal_rank.map((e, i) => (
                    <img key={i} src={e.avatar_icon} alt={String(e.value)} />
                  ))}
                </div>
              </div>
            )}
            <div className={styles.rankBox}>
              {data.damage_rank.length > 0 && (
                <div>
                  <div>
                    <img src={data.damage_rank[0].avatar_icon} alt='' />
                    <BounceNumber size={20} number={data.damage_rank[0].value} />
                  </div>
                  <span>最强一击</span>
                </div>
              )}
              {data.defeat_rank.length > 0 && (
                <div>
                  <div>
                    <img src={data.defeat_rank[0].avatar_icon} alt='' />
                    <BounceNumber size={20} number={data.defeat_rank[0].value} />
                  </div>
                  <span>最多击破</span>
                </div>
              )}
              {data.normal_skill_rank.length > 0 && (
                <div>
                  <div>
                    <img src={data.normal_skill_rank[0].avatar_icon} alt='' />
                    <BounceNumber size={20} number={data.normal_skill_rank[0].value} />
                  </div>
                  <span>最多元素战技</span>
                </div>
              )}
              {data.energy_skill_rank.length > 0 && (
                <div>
                  <div>
                    <img src={data.energy_skill_rank[0].avatar_icon} alt='' />
                    <BounceNumber size={20} number={data.energy_skill_rank[0].value} />
                  </div>
                  <span>最多元素爆发</span>
                </div>
              )}
              {data.take_damage_rank.length > 0 && (
                <div>
                  <div>
                    <img src={data.take_damage_rank[0].avatar_icon} alt='' />
                    <BounceNumber size={20} number={data.take_damage_rank[0].value} />
                  </div>
                  <span>最多承伤</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.detail}>
            {data.floors.map((e) => (
              <div key={e.index}>
                <div>
                  <img src={abyssBg} alt='关卡logo' />
                  <span>{e.index}</span>
                </div>
                <div>深渊螺旋第 {e.index} 层</div>
                <div>
                  ⭐ {e.star}/{e.max_star}
                </div>
                {/* <div>
                  {e.levels.map((e) => (
                    <div key={e.index}>
                      第{e.index}间|本期：{e.star}|历史最高：{e.max_star}
                      <div>
                        {e.battles.map((e) => (
                          <div key={e.index}>
                            {e.index === 1 ? "上" : "下"}半场|时间：{formatTime(e.timestamp)}
                            <div>
                              {e.avatars.map((e) => (
                                <div key={e.id}>
                                  <img src={e.icon} width='32px' alt='' />
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
                </div> */}
              </div>
            ))}
          </div>
          <div className={styles.tip}>{`统计周期：${period} （总第 ${data.schedule_id} 期）`}</div>
        </>
      ) : (
        <span className={styles.none}>暂无当期数据</span>
      )}
    </div>
  );
};

export default SpiralAbyss;
