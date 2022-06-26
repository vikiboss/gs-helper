import React, { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import SpiralAbyss from "./SpiralAbyss";
import StatisticCard from "./StatisticCard";
import styles from "./index.less";
import useNotice from "../../hooks/useNotice";
import withAuth from "../../auth/withAuth";

import type { GameRoleCardData } from "../../../services/getGameRoleCard";
import type { SpiralAbyssData } from "../../../services/getSpiralAbyss";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();
  const [uid, setUid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<"statistic" | "abyss">("statistic");
  const [cardData, setCardData] = useState<GameRoleCardData & { uid: string }>();
  const [spiralAbyss, setSpiralAbyss] = useState<SpiralAbyssData & { uid: string }>();

  useEffect(() => {
    (async () => await updateInfo())();
  }, []);

  const updateInfo = async (uid?: string) => {
    try {
      const user = await nativeApi.getCurrentUser();
      uid = uid || user.uid;
      const [card, abyss] = await Promise.all([
        nativeApi.getGameRoleCard(uid),
        nativeApi.getSpiralAbyss(uid)
      ]);
      if (!card?.role?.nickname || !abyss?.schedule_id) return false;
      setLoading(false);
      setCardData({ ...card, uid });
      setSpiralAbyss({ ...abyss, uid });
      console.log(card, abyss);
      return true;
    } catch (e) {
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

  return (
    <>
      <div className={styles.container}>
        {cardData && spiralAbyss ? (
          <>
            <div className={styles.top}>
              <div className={styles.title}>游戏数据</div>
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
                {type === "statistic" && <StatisticCard data={cardData} />}
                {type === "abyss" && <SpiralAbyss data={spiralAbyss} />}
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

export default withAuth(Game);
