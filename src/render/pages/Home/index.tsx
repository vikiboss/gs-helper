import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import nativeApi from "../../utils/nativeApi";
import icon from "../../../assets/icon.png";

import styles from "./index.less";

const Home: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [buid, setBuid] = useState<string>("");
  const [sign, setSign] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(icon);
  const { success, holder } = useAlert();
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!isLogin) return;
      const user = await nativeApi.getStoreKey("user");
      setNickname(user.nickname);
      setBuid(user.buid);
      setSign(user.introduce);
      setAvatar(user.avatar);
    })();
  }, [isLogin]);

  const handleLoginClick = () => {
    if (isLogin) {
      logout();
      success({ message: "您已成功退出登录" });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.user}>
          {isLogin ? (
            <>
              <img src={avatar} alt='avatar' className={styles.avatar} />
              <div className={styles.userInfo}>
                <div>
                  昵称：<div className={styles.nickname}>{nickname || "获取中..."}</div>
                </div>
                <div>
                  签名：<div className={styles.sign}>{sign || "这个人有点懒"}</div>
                </div>
                <div>
                  BID：<div className={styles.uid}>{buid || "获取中..."}</div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.noLoginContainer}>
              <div className={styles.noLoginText}>
                欢迎你，冒险者。👋
                <br />
                登录 「米游社」 账号以使用全部功能。
              </div>
              <Button text='登录米游社' size='middle' type='confirm' onClick={handleLoginClick} />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <Button text='抽卡分析' noIcon onClick={() => navigate("/gacha")} />
          <Button text='设置' noIcon onClick={() => navigate("/setting")} />
        </div>
      </div>
      {holder}
    </>
  );
};

export default Home;
