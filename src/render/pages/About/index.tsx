import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import CircleButton from "../../components/CircleButton";
import wxRewardCode from "../../../assets/wx-reward.jpg";
import aliPayCode from "../../../assets/ali-pay.png";
import groupQRCode from "../../../assets/group-qrcode.png";
import { LINK_GITHUB_REPO } from "../../../constants";
import nativeApi from "../../utils/nativeApi";

import styles from "./index.less";

const About: React.FC = () => {
  const navigate = useNavigate();
  const [vsersion, setVersion] = useState("");

  useEffect(() => {
    (async () => setVersion((await nativeApi.getAppInfo()).version))();
  }, []);

  const licenceLink = "https://github.com/Vikiboss/genshin-helper/blob/master/LICENCE";
  const githubLink = "https://github.com/vikiboss";
  const groupLink = "https://jq.qq.com/?_wv=1027&k=InHF9niP";
  const ElectronLink = "https://www.electronjs.org";
  const packageLink = "https://github.com/Vikiboss/genshin-helper/blob/master/package.json";
  const ReactLink = "https://reactjs.org";

  return (
    <div className={styles.container}>
      <div className={styles.title}>关于</div>
      <div className={styles.declaration}>
        <p>
          「原神助手」 由个人独立开发，基于
          <a href={ElectronLink} target='_blank'>
            {" Electron "}
          </a>
          与
          <a href={ReactLink} target='_blank'>
            {" React "}
          </a>
          ，支持 Windows、macOS、Linux 三大主流桌面平台。本工具完全免费，使用
          <a href={licenceLink} target='_blank'>
            {" MIT "}
          </a>
          协议开放源代码，仅供个人学习交流使用，
          <b>请勿用于任何商业或违法违规用途</b>。
        </p>

        <p>
          开发初衷是将原神玩家所需要的多数功能整合到一起，提升游戏效率与体验。首页的便签数据采取自动更新的策略，频率为
          1 次/分钟，
          <b>可能存在延迟，请以游戏内的实时数据为准。</b>
        </p>
        <p>
          软件界面设计参考了原神游戏本体及米游社，大部分内容与素材来源于
          「米游社」，仅用于学习交流使用，版权归 「
          <a href='https://www.mihoyo.com/' target='_blank'>
            {"米哈游"}
          </a>
          或原作者」 所有。
          <b>如有发现任何实质性的侵权行为，请联系开发者对相关内容进行删除</b>。
        </p>
      </div>

      <div className={styles.bottom}>
        <div className={styles.items}>
          <div className={styles.item}>※ 当前版本：{vsersion} Beta</div>
          <div className={styles.item}>
            <div className={styles.field}>
              ※ 开发者：
              <a href={githubLink} target='_blank'>
                Viki
              </a>
            </div>
          </div>
          <div className={styles.item}>
            ※ 源码：
            <a href={LINK_GITHUB_REPO} target='_blank'>
              {" GitHub "}
            </a>
            <span>（欢迎 star）</span>
          </div>
          <div className={styles.item}>
            ※ 用到的开源库：
            <a href={packageLink} target='_blank'>
              {" package.json "}
            </a>
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
        <div className={styles.codeZones}>
          <div className={styles.codeZone}>
            <img className={styles.code} src={groupQRCode} alt='交流群' />
            <div>「原神助手」 交流 QQ 群</div>
          </div>
          <div className={styles.codeZone}>
            <img className={styles.code} src={aliPayCode} alt='支付宝收款码' />
            <div>Viki の 支付宝收款码</div>
          </div>
          <div className={styles.codeZone}>
            <img className={styles.code} src={wxRewardCode} alt='微信赞赏码' />
            <div>Viki の 微信赞赏码</div>
          </div>
          <div className={styles.mask} />
        </div>
      </div>
      <div className={styles.thank}>{"※ 开发不易 ❤ 感谢支持 ※"}</div>
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
