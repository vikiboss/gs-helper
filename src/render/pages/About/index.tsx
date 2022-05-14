import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import CircleButton from "../../components/CircleButton";

import styles from "./index.less";
import rewardCode from "../../../assets/reward.jpg";
import { LINK_GITHUB_REPO } from "../../../constants";
import nativeApi from "../../utils/nativeApi";

const About: React.FC = () => {
  const navigate = useNavigate();
  const [vsersion, setVersion] = useState("");

  useEffect(() => {
    (async () => setVersion((await nativeApi.getAppInfo()).version))();
  }, []);

  return (
    <div className={styles.desc}>
      <div className={styles.title}>关于 「原神助手」</div>
      <div className={styles.declaration}>
        本软件属于开源性质的免费软件，二次修改请遵守 MIT 协议相关规定。软件内的部分内容来源于
        「米游社」 或互联网，版权归 「米哈游公司」 或作品 「原创作者」
        所有。本软件开发的初衷是整合原神玩家需要的绝大多数功能，方便玩家更好的进行游戏。软件仅供个人学习交流使用，请勿用于任何商业或违法违规用途。软件的游戏数据可能存在延迟，请以游戏内数据为准。
      </div>
      <div className={styles.bottom}>
        <div className={styles.items}>
          <div className={styles.item}>
            主要开发者：
            <a
              href='https://qm.qq.com/cgi-bin/qm/qr?k=6fzl49rPe5ryf1AJg9FMf9qV4iCPijXk&noverify=0'
              target='_blank'
            >
              Viki
            </a>
          </div>
          <div className={styles.item}>当前版本：{vsersion}</div>
          <div className={styles.item}>
            开源仓库：
            <a href={LINK_GITHUB_REPO} target='_blank'>
              GitHub
            </a>
          </div>
          <div className={styles.item}>
            交流群：
            <a
              href='https://qm.qq.com/cgi-bin/qm/qr?k=Zw82oFjncJqUFIbuuPZDZgnyLEB5WXdI&authKey=028KIPK1l0Ehc1fycWUqvMqfRG/jSP8d7S0jTyyX6GkvPgLM9Xb0BMNBvxWNtgwQ&noverify=0\'
              target='_blank'
            >
              176593098
            </a>
          </div>
          <div className={styles.item}>= 开发不易 感谢支持 =</div>
        </div>
        <div className={styles.reward}>
          <img className={styles.rewardCode} src={rewardCode} alt='微信赞赏码' />
          <div>Viki の 微信赞赏码</div>
        </div>
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

export default About;
