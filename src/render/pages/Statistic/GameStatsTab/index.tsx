import React from "react";

import { deepClone } from "../../../../utils/utils";
import BounceNumber from "../../../components/BounceNumber";
import getServerNameByServer from "../../../../utils/getServerNameByServer";

import type { GameRoleCardState } from "..";

import styles from "./index.less";

export interface StatisticCardProp {
  data: GameRoleCardState;
}

const StatisticCard: React.FC<StatisticCardProp> = (props) => {
  const { data } = props;
  const we = deepClone(data.world_explorations).reverse();
  const stats = data.stats;
  return (
    <div className={styles.statisticCard}>
      <div className={styles.column}>
        <div className={styles.stats}>
          <div className={styles.user}>
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
              <span>成就</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.avatar_number} />
              <span>角色</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.way_point_number} />
              <span>传送点</span>
            </div>
            <div>
              <BounceNumber size={24} number={stats.domain_number} />
              <span>秘境</span>
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
              <div className={styles.horizontal}>
                <BounceNumber size={24} number={Number(stats.spiral_abyss.split("-")[0])} />
                <div>-</div>
                <BounceNumber size={24} number={Number(stats.spiral_abyss.split("-")[1])} />
              </div>
              <span>深渊螺旋</span>
            </div>
            <div>
              <div className={styles.horizontal}>
                <BounceNumber size={24} number={stats.anemoculus_number} />
                <span className={styles.fullNum}>/66</span>
              </div>
              <span>风神瞳</span>
            </div>
            <div>
              <div className={styles.horizontal}>
                <BounceNumber size={24} number={stats.geoculus_number} />
                <span className={styles.fullNum}>/131</span>
              </div>
              <span>岩神瞳</span>
            </div>
            <div>
              <div className={styles.horizontal}>
                <BounceNumber size={24} number={stats.electroculus_number} />
                <span className={styles.fullNum}>/181</span>
              </div>
              <span>雷神瞳</span>
            </div>
          </div>
        </div>
        <div className={styles.homes}>
          <div>
            <span>尘歌壶</span>
            {data.homes.length > 0 && (
              <div>
                <img
                  src={data.homes[0].comfort_level_icon}
                  alt={data.homes[0].comfort_level_name}
                />
                <span>{data.homes[0].comfort_level_name}</span>
              </div>
            )}
          </div>
          {data.homes.length > 0 ? (
            <>
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
                  <div>
                    <BounceNumber size={24} number={data.homes[0].level} />
                    <span>信任等阶</span>
                  </div>
                  <div>
                    <BounceNumber size={24} number={data.homes[0].comfort_num} />
                    <span>最高洞天仙力</span>
                  </div>
                  <div>
                    <BounceNumber size={24} number={data.homes[0].item_num} />
                    <span>获得摆设</span>
                  </div>
                  <div>
                    <BounceNumber size={24} number={data.homes[0].visit_num} />
                    <span>历史访客</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.off}>尘歌壶未开启</div>
          )}
        </div>
      </div>
      <div className={styles.column}>
        {/* <div className={styles.avatars}>
          <div>常用角色</div>
          <div>
            {data.avatars.slice(0, 8).map((e) => (
              <div key={e.id}>
                <img src={e.card_image} key={e.name} alt={e.name} />
                <div>
                  <span>{e.name}</span>
                  <span>
                    Lv.{e.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className={styles.explorations}>
          <div>世界探索</div>
          <div>
            {we.map((e) => {
              const isR = e.type === "Reputation";
              const name = !isR && (e.offerings[0]?.name || "").replaceAll("等级", "");
              const text = isR ? "声望" : name || "";
              const level = text ? `·${text} ${e.level} 级` : "";
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
