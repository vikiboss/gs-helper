import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import React, { useEffect, useState } from "react";

import { ElementTypes } from "../../../constants";
import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import withAuth from "../../auth/withAuth";

import star4 from "../../../assets/star4.png";
import star5 from "../../../assets/star5.png";

import Pyro from "../../../assets/pyro.png";
import Hydro from "../../../assets/hydro.png";
import Anemo from "../../../assets/anemo.png";
import Electro from "../../../assets/electro.png";
import Geo from "../../../assets/geo.png";
import Cryo from "../../../assets/cryo.png";
import Dendro from "../../../assets/dendro.png";

import type { Role as RoleInfo } from "../../../services/getOwnedRoles";

import styles from "./index.less";
import useNotice from "../../hooks/useNotice";

const StarImgs = [star4, star5];
const ElementImgs: Record<string, string> = { Pyro, Hydro, Anemo, Electro, Geo, Cryo, Dendro };

const getStarClass = (rarity: number) => styles[`star${rarity > 5 ? 6 : rarity}`];
const getStarImage = (rarity: number) => StarImgs[(rarity > 5 ? 5 : rarity) - 4];

const Role: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [index, setIndex] = useState<number>(0);
  const [isRoleChanging, setIsRoleChanging] = useState<boolean>(true);
  const [mode, setMode] = useState<"detail" | "list">("list");
  const [roles, setRoles] = useState<RoleInfo[]>([]);

  useEffect(() => {
    (async () => await updateInfo())();
  }, []);

  const updateInfo = async () => {
    try {
      const roles = await nativeApi.getOwnedRoles();
      // 角色排序先后依据：角色等级、角色星级、角色命座数、武器星级、武器等级
      roles.sort((p, n) => {
        return (
          n.level - p.level ||
          n.rarity - p.rarity ||
          n.actived_constellation_num - p.actived_constellation_num ||
          n.weapon.rarity - p.weapon.rarity ||
          n.weapon.level - p.weapon.level
        );
      });
      if (roles.length) setRoles(roles);
      // if (roles.length) setRoles([...roles, ...roles]);
    } catch {
      notice.faild({ message: "加载超时，请检查网络链接" });
    }
  };

  const isDetail = mode === "detail" && roles.length > 0;

  const toggleMode = () => setMode(isDetail ? "list" : "detail");
  const handleArrowClick = (direction: "left" | "right") => {
    const isLeft = direction === "left";
    const i = (index + (isLeft ? -1 : 1) + roles.length) % roles.length;
    setIndex(i);
    setIsRoleChanging(false);
    setTimeout(() => setIsRoleChanging(true), 0);
  };

  return (
    <>
      <div
        className={cn(
          styles.container,
          isDetail ? styles[roles[index].element.toLowerCase()] : "",
          isDetail && isRoleChanging ? styles.bgAni : ""
        )}
      >
        <div className={styles.topZone}>
          <span className={cn(styles.title, isDetail ? styles.detailMode : "")}>
            {isDetail ? "角色详情" : "所有获得的角色"}
          </span>
          {isDetail && (
            <Button text='总览' theme='light' onClick={toggleMode} className={styles.ani} />
          )}
        </div>
        {roles.length > 0 ? (
          <>
            {!isDetail && (
              <div className={styles.roleTable}>
                {roles.map((e, i) => (
                  <div
                    key={e.name + i}
                    className={styles.roleItem}
                    onClick={() => {
                      setIndex(i);
                      setMode("detail");
                    }}
                  >
                    <div className={getStarClass(e.rarity)}>
                      <img src={e.icon} alt='icon' />
                      <img src={getStarImage(e.rarity)} alt='star' />
                      <img src={ElementImgs[e.element]} alt='element' />
                      <span>Lv.{e.level}</span>
                      {e.actived_constellation_num > 0 && <div>{e.actived_constellation_num}</div>}
                    </div>
                    <span>{e.name}</span>
                  </div>
                ))}
              </div>
            )}
            {isDetail && (
              <div className={styles.roleDetail}>
                <div className={cn(styles.detailContent, isRoleChanging ? styles.contentAni : "")}>
                  <div className={styles.roleInfo}>
                    <div className={cn(styles.name)}>{roles[index].name}</div>
                    <div>
                      {roles[index].rarity}星 | Lv.{roles[index].level} |
                      {ElementTypes[roles[index].element]} | 好感度:{roles[index].fetter} | 命座数:
                      {roles[index].actived_constellation_num}
                    </div>
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
                  {/* <div className={styles.constellationContainer}>
                    {roles[index].constellations.map((e) => (
                      <div key={e.id} className={styles.constellation}>
                      <img
                      src={e.icon}
                      alt='icon'
                      title={`命座${e.pos}：${e.name}\n${e.effect}`}
                      />
                      </div>
                      ))}
                    </div> */}
                </div>
                <img
                  className={cn(styles.img, isRoleChanging ? styles.imgAni : "")}
                  src={roles[index].image}
                  alt={roles[index].name}
                />
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}

        {!isDetail && (
          <CircleButton
            Icon={TiArrowBack}
            size='middle'
            className={styles.backBtn}
            onClick={() => navigate("/")}
          />
        )}

        {isDetail && (
          <>
            <img
              className={styles.bgElement}
              src={ElementImgs[roles[index].element]}
              alt='element'
            />
            <div className={styles.arrowLeft} onClick={handleArrowClick.bind(null, "left")} />
            <div className={styles.arrowRight} onClick={handleArrowClick.bind(null, "right")} />
          </>
        )}
      </div>
      {notice.holder}
    </>
  );
};

export default withAuth(Role);
