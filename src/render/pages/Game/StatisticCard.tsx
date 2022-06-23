import React, { Fragment } from "react";

import { deepClone } from "../../../utils/utils";

import type { GameRoleCardData } from "../../../services/getGameRoleCard";

import styles from "./index.less";
import getServerNameByServer from "../../../utils/getServerNameByServer";
import BounceNumber from "../../components/BounceNumber";

interface StatisticCardProp {
  data: GameRoleCardData & { uid: string };
}

const StatisticCard: React.FC<StatisticCardProp> = (props) => {
  const { data } = props;
  const we = deepClone(data.world_explorations);
  const stats = data.stats;
  return (
    <div className={styles.statisticCard}>
      <div className={styles.row}>
        <div className={styles.stats}>
          <div>
            <div>{data.role.nickname}</div>
            <div>
              Lv.{data.role.level} {getServerNameByServer(data.role.region)} {data.uid}
            </div>
          </div>
          <div className={styles.statsBox}>
            <div>
              <BounceNumber size={24} number={stats.active_day_number} />
              <span>活跃天</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.achievement_number} />
              <span>成就数</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.avatar_number} />
              <span>角色数</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.way_point_number} />
              <span>传送点</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.domain_number} />
              <span>解锁秘境</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.luxurious_chest_number} />
              <span>华丽宝箱</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.precious_chest_number} />
              <span>珍贵宝箱</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.exquisite_chest_number} />
              <span>精致宝箱</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.common_chest_number} />
              <span>普通宝箱</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.magic_chest_number} />
              <span>奇馈宝箱</span>
            </div>
            <div>
              <div className={styles.abyssNumber}>
                <BounceNumber size={24} number={Number(stats.spiral_abyss.split("-")[0])} />-
                <BounceNumber size={24} number={Number(stats.spiral_abyss.split("-")[1])} />
              </div>
              <span>深渊螺旋</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.anemoculus_number} />
              <span>风神瞳</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.geoculus_number} />
              <span>岩神瞳</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.electroculus_number} />
              <span>雷神瞳</span>
            </div>
          </div>
        </div>
        <div className={styles.avatars}>
          <div>常用角色</div>
          <div>
            {data.avatars.slice(0, 8).map((e) => (
              <div key={e.id}>
                <img src={e.card_image} key={e.name} alt={e.name} />
                <div>
                  <span>
                    {e.name} Lv.{e.level} {e.actived_constellation_num}命
                  </span>
                  <span>
                    {e.rarity}星 好感度：{e.fetter}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.homes}>
          <div>尘歌壶</div>
          <div>
            {data.homes.map((e) => (
              <div key={e.name}>
                <img src={e.icon} alt={e.name}></img>
                <span>{e.name}</span>
              </div>
            ))}
          </div>
          <div>
            <div>

            </div>
          </div>
        </div>
        <div className={styles.explorations}>
          {we.reverse().map((e) => (
            <div key={e.id}>
              {/* <img src={e.icon} /> */}
              {e.name}|{e.level}|{(e.exploration_percentage / 10).toFixed(1)}%
            </div>
          ))}
        </div>
      </div>
      {/* <div>
        {data.city_explorations.map((e, i) => (
          <div key={i}>{e?.toString()}</div>
        ))}
      </div> */}
    </div>
  );
};

export default StatisticCard;
