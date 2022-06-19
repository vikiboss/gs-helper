import React, { Fragment } from "react";
import D from "dayjs";

import type { SpiralAbyssData } from "../../../services/getSpiralAbyss";

interface SpiralAbyssProp {
  data: SpiralAbyssData;
}

const formatTime = (timestamp: string) => {
  return D(Number(timestamp) * 1000).format("YYYY/MM/DD HH:mm");
};

const SpiralAbyss: React.FC<SpiralAbyssProp> = (props) => {
  const { data } = props;
  return (
    <div>
      <div>
        {data.is_unlock ? "已解锁" : "未解锁"}|最深抵达：{data.max_floor}|第{data.schedule_id}
        期| 战斗次数：{data.total_battle_times}|总星数：{data.total_star}|成功次数：
        {data.total_win_times}
      </div>
      <div>
        本期统计周期：{formatTime(data.start_time)}~{formatTime(data.end_time)}
      </div>
      <div>
        {data.reveal_rank.map((e, i) => (
          <Fragment key={i}>
            <img src={e.avatar_icon} width='32px' alt='' />
            <span key={e.avatar_id}>
              {e.rarity}星|出战次数：{e.value}
            </span>
          </Fragment>
        ))}
      </div>
      <div>
        {data.damage_rank.map((e, i) => (
          <Fragment key={i}>
            最强一击：
            <img src={e.avatar_icon} width='32px' alt='' />
            <span key={e.avatar_id}>
              {e.rarity}|{e.value}
            </span>
          </Fragment>
        ))}
      </div>
      <div>
        {data.defeat_rank.map((e, i) => (
          <Fragment key={i}>
            最多击破：
            <img src={e.avatar_icon} width='32px' alt='' />
            <span key={e.avatar_id}>
              {e.rarity}|{e.value}
            </span>
          </Fragment>
        ))}
      </div>
      <div>
        {data.energy_skill_rank.map((e, i) => (
          <Fragment key={i}>
            最多元素爆发：
            <img src={e.avatar_icon} width='32px' alt='' />
            <span key={e.avatar_id}>
              {e.rarity}|{e.value}
            </span>
          </Fragment>
        ))}
      </div>
      <div>
        {data.normal_skill_rank.map((e, i) => (
          <Fragment key={i}>
            最多元素战技：
            <img src={e.avatar_icon} width='32px' alt='' />
            <span key={e.avatar_id}>
              {e.rarity}|{e.value}
            </span>
          </Fragment>
        ))}
      </div>
      <div>
        {data.take_damage_rank.map((e, i) => (
          <Fragment key={i}>
            最多承伤：
            <img src={e.avatar_icon} width='32px' alt='' />
            <span key={e.avatar_id}>
              {e.rarity}|{e.value}
            </span>
          </Fragment>
        ))}
      </div>
      <div>
        {data.floors.map((e) => (
          <Fragment key={e.index}>
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
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SpiralAbyss;
