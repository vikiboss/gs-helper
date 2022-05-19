import React, { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import withAuth from "../../auth/withAuth";
import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";

import type { Role as RoleInfo } from "../../../services/getOwnedRoles";

import styles from "./index.less";
import Loading from "../../components/Loading";

const Role: React.FC = () => {
  const navigate = useNavigate();
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
      style={{ position: "relative", flex: 1, display: "flex", width: "100vw", height: "100vh" }}
    >
      <div className={styles.desc}>
        {roles.length ? (
          <>
            <div>角色详情页</div>
            <div>
              {roles.map((e) => (
                <div key={e.id}>
                  <div>
                    <img src={e.image} alt='image' style={{ height: "20px" }} />
                    <img src={e.icon} alt='icon' style={{ height: "20px" }} />
                    <div>
                      {e.name}|Lv.{e.level}|{e.element}
                    </div>
                    <div>羁绊:{e.fetter}</div>
                    <div>命星:{e.actived_constellation_num}</div>
                    <div>
                      {e.constellations.map((e) => (
                        <div key={e.id}>
                          <div>
                            <img
                              src={e.icon}
                              alt='icon'
                              style={{ height: "12px", backgroundColor: "#999" }}
                            />
                            <div>name：{e.name}</div>
                            <div>pos：{e.pos}</div>
                            <div>已激活：{e.is_actived ? "是" : "否"}</div>
                          </div>
                          {e.effect}
                        </div>
                      ))}
                    </div>
                    <div>
                      {e.costumes.map((e) => (
                        <div key={e.id}>
                          <div>{e.name}</div>
                          <img
                            src={e.icon}
                            alt='icon'
                            style={{ height: "12px", backgroundColor: "#999" }}
                          />
                        </div>
                      ))}
                    </div>

                    <div>稀有度：{e.rarity}</div>
                    <div>武器：{JSON.stringify(e.weapon.name)}</div>
                    <div>
                      <div>圣遗物</div>
                      {e.reliquaries.map((e) => (
                        <div key={e.id}>
                          <img
                            src={e.icon}
                            alt='icon'
                            style={{ height: "12px", backgroundColor: "#999" }}
                          />
                          <div>{e.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
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
