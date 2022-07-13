import React, { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import GameStatsTab from "./GameStatsTab";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import RolesTab from "./RolesTab";
import SelectButton from "../../components/SelectButton";
import SpiralAbyssTab from "./SpiralAbyssTab";
import styles from "./index.less";
import useNotice from "../../hooks/useNotice";
import withAuth from "../../auth/withAuth";

import type { GameRoleCardData } from "../../../services/getGameRoleCard";
import type { Role as RoleInfo } from "../../../services/getOwnedRoleList";
import type { SpiralAbyssData } from "../../../services/getSpiralAbyss";
import type { GameRecordCardItem } from "../../../services/getGameRecordCard";

export type TypeState = "statistic" | "roles" | "abyss";
export type GameRoleCardState = GameRoleCardData & { uid: string; info: GameRecordCardItem };
export type SpiralAbyssState = SpiralAbyssData & { uid: string; info: GameRecordCardItem };
export type RolesState = {
  list: RoleInfo[];
  uid: string;
  info: GameRecordCardItem;
};

const Statistic: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();

  const [uid, setUid] = useState<string>("");
  const [isSelf, setIsSelf] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const [type, setType] = useState<TypeState>("statistic");
  // const [type, setType] = useState<TypeState>("roles");

  const [rolesDate, setRolesData] = useState<RolesState>();
  const [gameStatsData, setGameStatsData] = useState<GameRoleCardState>();
  const [spiralAbyssData, setSpiralAbyssData] = useState<SpiralAbyssState>();

  useEffect(() => {
    (async () => await updateInfo())();
  }, []);

  const updateInfo = async (uid?: string) => {
    try {
      const user = await nativeApi.getCurrentUser();
      uid = uid || user.uid;
      const [infos, card, roles, abyss] = await Promise.all([
        nativeApi.getGameRecordCard(uid),
        nativeApi.getGameRoleCard(uid),
        nativeApi.getOwnedRoleList(uid),
        nativeApi.getSpiralAbyss(uid)
      ]);

      console.log(infos, card, roles, abyss);

      const isOK = infos[0]?.nickname && roles[0]?.id && abyss?.schedule_id;

      if (!isOK) return false;

      setIsSelf(uid === "" || uid === user.uid);
      setLoading(false);
      setGameStatsData({ ...card, uid, info: infos[0] });
      setRolesData({ list: roles, uid, info: infos[0] });
      setSpiralAbyssData({ ...abyss, uid, info: infos[0] });

      return true;
    } catch (e) {
      console.log(e);

      const isOffline = e?.message?.includes("getaddrinfo");
      const msg = isOffline ? "网络状况不佳，请检查后重试 T_T" : "加载超时，请检查网络连接 T_T";

      notice.faild({ message: msg });
    }
  };

  const handleQuery = async () => {
    if (!uid) {
      const text = (await nativeApi.readClipboardText()).replace(/\s/g, "").trim();
      if (text) {
        if (text.match(/^[1-9][0-9]{7,9}$/)) {
          setUid(text.trim());
        } else {
          notice.warning({ message: "剪切板中的内容不是有效的 UID" });
        }
      } else {
        notice.warning({ message: "剪切板内容为空" });
      }
    } else {
      if (uid.match(/^[1-9][0-9]{7,9}$/)) {
        setLoading(true);
        notice.info({ message: "小派蒙努力查询中...", autoHide: false });
        const isOK = await updateInfo(uid);
        if (!isOK) {
          notice.faild({ message: "目标 UID 不存在或其米游社主页的游戏数据未公开" });
        } else {
          notice.success({ message: "数据获取成功" });
        }
        setLoading(false);
      } else {
        notice.warning({ message: "输入的 UID 无效，请检查" });
      }
    }
  };

  const items: { label: string; value: TypeState }[] = [
    { label: "数据概览", value: "statistic" },
    { label: "常用角色", value: "roles" },
    { label: "深渊螺旋", value: "abyss" }
  ];

  const backToMine = async () => {
    setIsSelf(true);
    setLoading(true);
    await updateInfo();
    setLoading(false);
  };

  return (
    <>
      <div className={styles.container}>
        {gameStatsData && spiralAbyssData ? (
          <>
            <div className={styles.top}>
              {!isSelf && (
                <Button className={styles.btn} text='返回我的数据' onClick={backToMine} />
              )}
              <SelectButton items={items} value={type} changeItem={setType} />
              <div className={styles.inputArea}>
                <Input
                  value={uid}
                  onChange={(e) => setUid(e.target.value.slice(0, 11))}
                  autoFocus
                  type='number'
                  min={0}
                  max={9999999999}
                  placeholder='查询 UID '
                />
                <Button text={uid === "" ? "粘贴" : "查询"} onClick={handleQuery} />
              </div>
            </div>
            {!loading && (
              <div className={styles.content}>
                {type === "statistic" && <GameStatsTab data={gameStatsData} />}
                {type === "roles" && <RolesTab data={rolesDate} />}
                {type === "abyss" && <SpiralAbyssTab data={spiralAbyssData} />}
              </div>
            )}
          </>
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
      {notice.holder}
    </>
  );
};

export default withAuth(Statistic);
