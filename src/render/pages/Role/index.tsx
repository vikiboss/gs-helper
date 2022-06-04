import { FiHeart } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import useNotice from "../../hooks/useNotice";
import withAuth from "../../auth/withAuth";

import star1 from "../../../assets/star1.png";
import star2 from "../../../assets/star2.png";
import star3 from "../../../assets/star3.png";
import star4 from "../../../assets/star4.png";
import star5 from "../../../assets/star5.png";

import Pyro from "../../../assets/pyro.png";
import Hydro from "../../../assets/hydro.png";
import Anemo from "../../../assets/anemo.png";
import Electro from "../../../assets/electro.png";
import Geo from "../../../assets/geo.png";
import Cryo from "../../../assets/cryo.png";
import Dendro from "../../../assets/dendro.png";

import type { PublicRole } from "../../../services/getPublicRoleList";
import type { Role as RoleInfo } from "../../../services/getOwnedRoleList";

import styles from "./index.less";

type RenderRoleInfo = RoleInfo & PublicRole;
type TabType = "weapon" | "reliquary" | "constellation" | "profile";

const StarImgs: string[] = [star1, star2, star3, star4, star5];
const ElementImgs: Record<string, string> = { Pyro, Hydro, Anemo, Electro, Geo, Cryo, Dendro };
const tabs: TabType[] = ["weapon", "reliquary", "constellation", "profile"];
const TabMap: Record<TabType, string> = {
  weapon: "武器",
  reliquary: "圣遗物",
  constellation: "命座",
  profile: "简介"
};

const getStarClass = (rarity: number) => styles[`star${rarity > 5 ? 6 : rarity}`];
const getStarImage = (rarity: number) => StarImgs[(rarity > 5 ? 5 : rarity) - 1];

const getFullRoleInfo = (roles: RoleInfo[], publickRoles: PublicRole[]): RenderRoleInfo[] => {
  const res = [];
  for (const role of roles) {
    if (role.name === "旅行者") {
      res.push({
        ...role,
        name: role.image.includes("Girl") ? "旅行者·荧" : "旅行者·空",
        introduction: "从世界之外漂流而来的旅行者，被神带走血亲，自此踏上寻找七神之路",
        startTime: "2020-09-28 00:00:00",
        line: "",
        CVs: [
          {
            name: role.image.includes("Girl") ? "宴宁" : "鹿喑",
            type: "中",
            vos: []
          },
          {
            name: role.image.includes("Girl") ? "悠木碧" : "堀江瞬",
            type: "日",
            vos: []
          }
        ]
      });
      continue;
    }
    for (const publickRole of publickRoles) {
      if (role.name === publickRole.name) {
        res.push({ ...role, ...publickRole });
      }
    }
  }
  return res;
};

const Role: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [index, setIndex] = useState<number>(0);
  const [infoTab, setInfoTab] = useState<TabType>("reliquary");
  const [isRoleChanging, setIsRoleChanging] = useState<boolean>(true);
  const [mode, setMode] = useState<"detail" | "list">("detail");
  const [publicRoles, setPublicRolos] = useState<PublicRole[]>([]);
  const [roles, setRoles] = useState<RoleInfo[]>([]);

  useEffect(() => {
    (async () => await updateInfo())();
  }, []);

  const updateInfo = async (): Promise<void> => {
    try {
      // 获取官网公开的全部角色列表，包含介绍、图片、声优、语音等数据
      const pbRoles = await nativeApi.getPublicRoleList();
      if (!pbRoles.length) return updateInfo();
      setPublicRolos(pbRoles);

      // 获取用户的角色列表
      const roles = await nativeApi.getOwnedRoleList();
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

  const _roles = getFullRoleInfo(roles, publicRoles);
  const isDetail = mode === "detail" && _roles.length > 0;
  const currentRole = _roles[index];

  const toggleMode = () => setMode(isDetail ? "list" : "detail");

  const handleArrowClick = (direction: "left" | "right") => {
    const isLeft = direction === "left";
    const i = (index + (isLeft ? -1 : 1) + _roles.length) % _roles.length;
    setIndex(i);
    setIsRoleChanging(false);
    setTimeout(() => setIsRoleChanging(true), 0);
  };

  return (
    <>
      <div
        className={cn(
          styles.container,
          isDetail ? styles[currentRole.element.toLowerCase()] : "",
          isDetail && isRoleChanging ? styles.bgAni : ""
        )}
      >
        <div className={styles.topZone}>
          <span className={cn(styles.title, isDetail ? styles.detailMode : "")}>
            {isDetail ? "角色详情" : "所有获得的角色"}
          </span>
          {isDetail && (
            <Button text='所有角色' theme='light' onClick={toggleMode} className={styles.ani} />
          )}
        </div>
        {roles.length > 0 ? (
          <>
            {!isDetail && (
              <div className={styles.roleTable}>
                {_roles.map((e, i) => (
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
                      <span>Lv. {e.level}</span>
                      {e.actived_constellation_num > 0 && <div>{e.actived_constellation_num}</div>}
                    </div>
                    <span>{e.name}</span>
                  </div>
                ))}
              </div>
            )}
            {/* 渲染角色详情页 */}
            {isDetail && (
              <div className={styles.roleDetail}>
                <div className={cn(styles.detailContent, isRoleChanging ? styles.contentAni : "")}>
                  <div className={styles.roleInfo}>
                    <div className={cn(styles.name)}>{currentRole.name}</div>
                    <img src={getStarImage(currentRole.rarity)} alt='star' />
                    <div className={styles.roleAttr}>
                      <span>Lv. {currentRole.level}</span>
                      {!currentRole.name.includes("旅行者") && (
                        <>
                          {/* <span>生日：{D(currentRole.startTime).format("M月D日")}</span> */}
                          <FiHeart size={16} />
                          <span>{currentRole.fetter}</span>
                        </>
                      )}
                    </div>
                    <div className={styles.tabContainer}>
                      <div className={styles.tab}>
                        {tabs.map((e) => (
                          <div
                            className={e === infoTab ? styles.tabActive : ""}
                            key={e}
                            onClick={() => setInfoTab(e)}
                          >
                            {TabMap[e]}
                          </div>
                        ))}
                      </div>
                      {/* 渲染角色详情的 Tab */}
                      <div className={styles.tabContent}>
                        {/* 渲染武器 Tab */}
                        {infoTab === "weapon" && (
                          <div className={styles.weapon}>
                            <div className={styles[`star-${currentRole.weapon.rarity}`]}>
                              <img src={currentRole.weapon.icon} alt='icon' />
                              <img src={getStarImage(currentRole.weapon.rarity)} alt='star' />
                              {currentRole.weapon.affix_level > 1 && (
                                <span>{currentRole.weapon.affix_level}</span>
                              )}
                              <span>{currentRole.weapon.name}</span>
                            </div>
                            <div>
                              <span>
                                {currentRole.weapon.name} / {currentRole.weapon.type_name}
                              </span>
                              <span>{currentRole.weapon.desc}</span>
                              <span>
                                Lv.{currentRole.weapon.level}
                                {currentRole.weapon.promote_level >= 1
                                  ? ` / 突破${currentRole.weapon.promote_level}阶`
                                  : ""}
                                {currentRole.weapon.affix_level > 1
                                  ? ` / 精炼${currentRole.weapon.affix_level}阶`
                                  : ""}
                              </span>
                            </div>
                          </div>
                        )}
                        {/* 渲染圣遗物 Tab */}
                        {infoTab === "reliquary" && (
                          <div className={styles.reliquary}>
                            {currentRole.reliquaries.length ? (
                              <>
                                {currentRole.reliquaries.map((e) => (
                                  <div
                                    className={cn(styles.reliquaryItem, styles[`star-${e.rarity}`])}
                                    key={e.pos}
                                  >
                                    <img src={e.icon} alt='icon' />
                                    <img src={getStarImage(e.rarity)} alt='star' />
                                    <span>{e.level}</span>
                                    <span>{e.name}</span>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div>未装配圣遗物</div>
                            )}
                          </div>
                        )}
                        {/* 渲染命座 Tab */}
                        {infoTab === "constellation" && (
                          <div className={styles.constellation}>命座</div>
                        )}
                        {/* 渲染简介 Tab */}
                        {infoTab === "profile" && (
                          <div className={styles.profile}>
                            <span className={styles.introduction}>{currentRole.introduction}</span>
                            <span className={styles.CV}>
                              CV：{currentRole.CVs.map((e) => e.name + `(${e.type})`).join("、")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cn(styles.mask, isRoleChanging ? styles.imgAni : "")} />
                <img
                  className={cn(styles.img, isRoleChanging ? styles.imgAni : "")}
                  src={currentRole.image}
                  alt={currentRole.name}
                />
                <div className={cn(styles.extInfo, isRoleChanging ? styles.imgAni : "")}>
                  {currentRole.line && <img src={currentRole.line} alt='' />}
                </div>
              </div>
            )}
          </>
        ) : (
          <Loading className={styles.loading} />
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
              className={cn(styles.bgElement, isRoleChanging ? styles.elementAni : "")}
              src={ElementImgs[currentRole.element]}
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
