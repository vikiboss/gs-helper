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

  const licenceLink = "https://github.com/Vikiboss/genshin-helper/blob/master/LICENCE";
  const githubLink = "https://github.com/vikiboss";
  const groupLink = "https://jq.qq.com/?_wv=1027&k=InHF9niP";

  return (
    <div className={styles.desc}>
      <div className={styles.title}>关于 / About</div>
      <div className={styles.declaration}>
        <p>
          「原神助手」 完全免费，使用
          <a href={licenceLink} target='_blank'>
            {" MIT "}
          </a>
          协议开源，仅供个人学习交流使用，
          <b>请勿用于任何商业或违法违规用途</b>
          ，二次修改请自觉遵守该协议的相关约定。
        </p>

        <p>
          软件开发的初衷是将原神玩家所需要的绝大多数功能整合到一起，方便玩家更好的进行游戏，提升玩家的游戏效率和体验。数据可能存在延迟，请以游戏内数据为准。
        </p>

        <p>
          软件内的部分内容来源于 「米游社」 和互联网，版权归
          <a href='https://www.mihoyo.com/' target='_blank'>
            {" 「米哈游」 "}
          </a>
          或 「原作者」 所有。如有发现任何侵权行为，并持有相关证据，请联系开发者删除。
        </p>
      </div>
      <div className={styles.thank}>{"= 开发不易 感谢支持 ="}</div>
      <div className={styles.bottom}>
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.field}>
            ※ 开发者：
              <a href={githubLink} target='_blank'>
                Viki
              </a>
            </div>
            <div className={styles.field}>※ 当前版本：{vsersion}</div>
          </div>
          <div className={styles.item}>
          ※ 源码：
            <a href={LINK_GITHUB_REPO} target='_blank'>
              {" GitHub "}
            </a>
            <span>（欢迎 star）</span>
          </div>
          <div className={styles.item}>
            <div className={styles.field}>
            ※ 交流群：
              <a href={groupLink} target='_blank'>
                176593098
              </a>
            </div>
          </div>
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
