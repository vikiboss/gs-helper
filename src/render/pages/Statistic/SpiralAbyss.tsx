import React from "react";
import D from "dayjs";

import type { SpiralAbyssData } from "../../../services/getSpiralAbyss";

import styles from "./index.less";
import BounceNumber from "../../components/BounceNumber";

interface SpiralAbyssProp {
  data: SpiralAbyssData & { uid: string };
}

const formatTime = (timestamp: string) => {
  return D(Number(timestamp) * 1000).format("YYYY/MM/DD HH:mm");
};

const SpiralAbyss: React.FC<SpiralAbyssProp> = (props) => {
  const { data } = props;
  const hasData = data.start_time && data.is_unlock;
  const period = `${formatTime(data.start_time)} ~ ${formatTime(data.end_time)}`;
  const succRate = Math.round((data.total_win_times / data.total_battle_times) * 100);
  return (
    <div className={styles.spiralAbyss}>
      {hasData ? (
        <>
          <div className={styles.abyssBox}>
            <div>
              <div className={styles.horizontal}>
                <BounceNumber size={24} number={Number(data.max_floor.split("-")[0])} />
                <div>-</div>
                <BounceNumber size={24} number={Number(data.max_floor.split("-")[1])} />
              </div>
              <span>最深抵达</span>
            </div>
            <div>
              <BounceNumber size={24} number={data.total_star} />
              <span>本期获星</span>
            </div>
            <div>
              <BounceNumber size={24} number={data.total_battle_times} />
              <span>战斗次数</span>
            </div>
            <div>
              <BounceNumber size={24} number={data.total_win_times} />
              <span>完成次数</span>
            </div>
            <div>
              <div className={styles.horizontal}>
                <BounceNumber size={24} number={succRate} />
                <div>%</div>
              </div>
              <span>完成率</span>
            </div>
          </div>
          <div>
            {data.reveal_rank.map((e, i) => (
              <div key={i}>
                <img src={e.avatar_icon} width='32px' alt='' />
                <span key={e.avatar_id}>
                  {e.rarity}星|出战次数：{e.value}
                </span>
              </div>
            ))}
          </div>
          <div>
            {data.damage_rank.map((e, i) => (
              <div key={i}>
                最强一击：
                <img src={e.avatar_icon} width='32px' alt='' />
                <span key={e.avatar_id}>
                  {e.rarity}|{e.value}
                </span>
              </div>
            ))}
          </div>
          <div>
            {data.defeat_rank.map((e, i) => (
              <div key={i}>
                最多击破：
                <img src={e.avatar_icon} width='32px' alt='' />
                <span key={e.avatar_id}>
                  {e.rarity}|{e.value}
                </span>
              </div>
            ))}
          </div>
          <div>
            {data.energy_skill_rank.map((e, i) => (
              <div key={i}>
                最多元素爆发：
                <img src={e.avatar_icon} width='32px' alt='' />
                <span key={e.avatar_id}>
                  {e.rarity}|{e.value}
                </span>
              </div>
            ))}
          </div>
          <div>
            {data.normal_skill_rank.map((e, i) => (
              <div key={i}>
                最多元素战技：
                <img src={e.avatar_icon} width='32px' alt='' />
                <span key={e.avatar_id}>
                  {e.rarity}|{e.value}
                </span>
              </div>
            ))}
          </div>
          <div>
            {data.take_damage_rank.map((e, i) => (
              <div key={i}>
                最多承伤：
                <img src={e.avatar_icon} width='32px' alt='' />
                <span key={e.avatar_id}>
                  {e.rarity}|{e.value}
                </span>
              </div>
            ))}
          </div>
          <div>
            {data.floors.map((e) => (
              <div key={e.index}>
                <div>
                  第{e.index}层|{e.is_unlock ? "已" : "未"}解锁|本期：{e.star}星|历史最高：
                  {e.max_star}星
                </div>
                <div>
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
                </div>
              </div>
            ))}
          </div>
          <div>{`统计周期：${period} （总第 ${data.schedule_id} 期）`}</div>
        </>
      ) : (
        <span>暂无数据</span>
      )}
    </div>
  );
};

export default SpiralAbyss;
