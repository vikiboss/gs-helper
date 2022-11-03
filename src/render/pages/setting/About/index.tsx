import React, { useEffect, useState } from 'react';

import { LINK_GITHUB_REPO } from '../../../../constants';
import groupQRCode from '../../../../assets/group-qrcode.png';
import nativeApi from '../../../utils/nativeApi';
import wxRewardCode from '../../../../assets/wx-reward.jpg';

import type { AppInfo } from '../../../../typings';
import type { Notice } from '../../../hooks/useNotice';

import styles from './index.less';

interface AboutProp {
  notice: Notice;
}

const LINK_LICENSE = 'https://github.com/vikiboss/genshin-helper/blob/main/LICENCE';
const LINK_AUTHOR_GITHUB = 'https://github.com/vikiboss';
const LINK_GROUP_QQ = 'https://jq.qq.com/?_wv=1027&k=InHF9niP';
const LINK_ELECTRON = 'https://www.electronjs.org';
const LINK_PACKAGE_JSON = 'https://github.com/vikiboss/genshin-helper/blob/main/package.json';
const LINK_REACT = 'https://reactjs.org';
const LINK_MIHOYO = 'https://www.mihoyo.com/';

const About: React.FC<AboutProp> = ({ notice }) => {
  const [appInfo, setAppInfo] = useState<Partial<AppInfo>>({});

  useEffect(() => {
    (async () => setAppInfo(await nativeApi.getAppInfo()))();
  }, []);

  function Link(href: string, text: string, onClick?: React.MouseEventHandler<HTMLAnchorElement>) {
    return <a href={href} target='_blank' rel='noreferrer' onClick={onClick}>{` ${text} `}</a>;
  }

  const checkUpdate: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    notice.info({ message: '正在检查更新，请稍后...', autoHide: false });
  };

  const AppName = appInfo?.zhName || '原神助手';
  const Version = appInfo?.version || '未知';

  const P1 = (
    <p>
      「{Link(LINK_GITHUB_REPO, AppName)}」 由个人独立开发，基于
      {Link(LINK_ELECTRON, 'Electron')}与{Link(LINK_REACT, 'React')}，支持 Windows、macOS、Linux
      三大主流桌面平台。开发初衷是希望将原神玩家需要的多数功能进行整合，提升游戏效率与游戏体验。首页便签数据采取自动更新策略（1 次/分钟），
      <b>可能存在延迟，请以游戏内实时数据为准。</b>
    </p>
  );
  const P2 = (
    <p>
      软件界面设计参考了原神游戏本体及米游社，大部分内容与素材来源于「米游社」，仅用于学习交流使用，版权归 「{Link(LINK_MIHOYO, '米哈游')}或原作者」 所有。
      <b>如有发现任何实质性的侵权行为，请联系开发者对相关内容进行删除</b>。
    </p>
  );
  const P3 = (
    <p>
      本工具仅提供 Windows 成品版本，其他版本需自行在对应平台编译使用，不保证一致性。本工具完全免费，使用
      {Link(LINK_LICENSE, 'MIT')}协议开放源代码，仅供个人学习交流使用，
      <b>请勿用于任何商业或违法违规用途</b>。
    </p>
  );
  return (
    <div className={styles.container}>
      <div className={styles.declaration}>
        {P1}
        {P2}
        {P3}
      </div>
      <div className={styles.bottom}>
        <div className={styles.items}>
          <div className={styles.item}>
            ※ 当前版本：v{Version} Beta （{Link(undefined, '点此检查更新', checkUpdate)}）
          </div>
          <div className={styles.item}>
            ※ 开发者：{Link(LINK_AUTHOR_GITHUB, 'Viki')}
            <span>（整个项目的💩代码和 BUG 都是他写的）</span>
          </div>
          <div className={styles.item}>
            ※ 源码：{Link(LINK_GITHUB_REPO, '前往 GitHub')}
            <span>（点个 star 就是最大的支持 QAQ）</span>
          </div>
          <div className={styles.item}>※ 感谢开源社区：{Link(LINK_PACKAGE_JSON, 'package.json')}</div>
          <div className={styles.item}>※ 交流群：{Link(LINK_GROUP_QQ, '176593098')}</div>
        </div>
        <div className={styles.codeZones}>
          <div className={styles.codeZone}>
            <img className={styles.code} src={groupQRCode} />
            <div>QQ交流群（快进来玩！）</div>
          </div>
          <div className={styles.codeZone}>
            <img className={styles.code} src={wxRewardCode} />
            <div>请我喝杯咖啡ヾ(≧▽≦*)o</div>
          </div>
          <div className={styles.mask} />
        </div>
      </div>
      <div className={styles.thank}>{'※ 开发不易 ❤ 感谢支持 ※'}</div>
    </div>
  );
};

export default About;
