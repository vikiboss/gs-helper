import React, { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import withAuth from "../../auth/withAuth";
import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";

import type { Role as RoleInfo } from "../../../services/getOwnedRoles";

import styles from "./index.less";
import Loading from "../../components/Loading";
import { ElementTypes } from "../../../constants";

const Role: React.FC = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);
  const [roles, setRoles] = useState<RoleInfo[]>([]);

  const updateInfo = async () => {
    const roles = await nativeApi.getOwnedRoles();
    if (roles.length) setRoles(roles);
  };

  useEffect(() => {
    (async () => await updateInfo())();
  }, []);

  return (
    <div
      className={styles.slide}
      style={{
        alignItems: "center",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {roles.length ? (
        <div className={styles.roleListContainer}>
          <div className={styles.left}>
            {roles.map((e, i) => (
              <div key={e.id} onClick={() => setIndex(i)} className={i === index ? styles.now : ""}>
                <img src={e.icon} alt='icon' style={{ width: "64px" }} />
              </div>
            ))}
          </div>
          <div className={styles.right}>
            <div className={styles.roleInfo}>
              <div className={styles.name}>{roles[index].name}</div>
              <div>
                {roles[index].rarity}星 | Lv.{roles[index].level} |
                {ElementTypes[roles[index].element]} | 好感度:{roles[index].fetter} | 命座数:
                {roles[index].actived_constellation_num}
              </div>
              {/* <div>
                {roles[index].costumes.map((e) => (
                  <div key={e.id}>
                    <div>{e.name}</div>
                    <img
                      src={e.icon}
                      alt='icon'
                      style={{ height: "160px", backgroundColor: "#aaa" }}
                    />
                  </div>
                ))}
              </div> */}
              <div>
                <div>武器：</div>
                <img
                  src={roles[index].weapon.icon}
                  alt='icon'
                  style={{ height: "42px" }}
                  title={roles[index].weapon.desc}
                />
                <div>
                  {roles[index].weapon.name} | Lv.{roles[index].weapon.level} |
                  {roles[index].weapon.rarity}星 | 精炼
                  {roles[index].weapon.affix_level}阶 | 突破
                  {roles[index].weapon.promote_level}阶 | {roles[index].weapon.type_name}(
                  {roles[index].weapon.type})
                </div>
              </div>
              <div>
                <div>圣遗物：</div>
                {roles[index].reliquaries.length ? (
                  roles[index].reliquaries.map((e) => (
                    <div key={e.id} style={{ display: "flex" }}>
                      <div>{e.pos_name}：</div>
                      <img
                        src={e.icon}
                        alt='icon'
                        style={{ height: "24px", backgroundColor: "#aaa" }}
                        title={e.set.affixes.reduce(
                          (p, n) => p + `${n.activation_number}件套：${n.effect}\n`,
                          ""
                        )}
                      />
                      {e.rarity}星 / {e.name} | Lv.{e.level}|{e.set.name}
                    </div>
                  ))
                ) : (
                  <div>未装配圣遗物</div>
                )}
              </div>
            </div>
          </div>
          <img src={roles[index].image} alt='image' style={{ height: "462px" }} />
          <div className={styles.constellationContainer}>
            {roles[index].constellations.map((e) => (
              <div key={e.id} className={styles.constellation}>
                <img src={e.icon} alt='icon' title={`命座${e.pos}：${e.name}\n${e.effect}`} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <CircleButton
        Icon={TiArrowBack}
        size='middle'
        className={styles.backBtn}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default withAuth(Role);
