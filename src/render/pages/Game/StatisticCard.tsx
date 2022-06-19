import React from "react";

import type { GameRoleCardData } from "../../../services/getGameRoleCard";
import { deepClone } from "../../../utils/utils";

interface StatisticCardProp {
  data: GameRoleCardData;
}

const StatisticCard: React.FC<StatisticCardProp> = (props) => {
  const { data } = props;
  const we = deepClone(data.world_explorations);
  const stats = data.stats;
  return (
    <div>
      <div>
        {data.role.nickname}|Lv.{data.role.level}|{stats.achievement_number}|
        {stats.active_day_number}|{stats.anemoculus_number}|{stats.avatar_number}|
        {stats.common_chest_number}|{stats.domain_number}|{stats.electroculus_number}|
        {stats.exquisite_chest_number}|{stats.geoculus_number}|{stats.luxurious_chest_number}|
        {stats.magic_chest_number}|{stats.precious_chest_number}|{stats.spiral_abyss}|
        {stats.way_point_number}
      </div>
      <div>
        {data.avatars.slice(0, 8).map((e) => (
          <>
            <img src={e.card_image} width='36px' key={e.name} alt='' />
            <span>
              {e.name}|好感度：{e.fetter}|Lv.{e.level}|{e.actived_constellation_num}命|{e.rarity}星
            </span>
          </>
        ))}
      </div>
      <div>
        {data.city_explorations.map((e, i) => (
          <div key={i}>{e?.toString()}</div>
        ))}
      </div>
      <div>
        {data.homes.map((e) => (
          <div key={e.name}>
            {e.name}|Lv.{e.level}|{e.comfort_num}|{e.comfort_level_name}|{e.item_num}|{e.visit_num}
          </div>
        ))}
      </div>
      <div>
        {we.reverse().map((e) => (
          <div key={e.id}>
            {e.name}|{e.level}|{(e.exploration_percentage / 10).toFixed(1)}%
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticCard;
