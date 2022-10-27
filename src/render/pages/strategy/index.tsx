import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import CircleButton from "../../components/CircleButton";
import nativeApi from "../../utils/nativeApi";

import abyss from "../../../assets/icon-abyss.png";
import activity from "../../../assets/icon-activity.png";
import animal from "../../../assets/icon-animal.png";
import boss from "../../../assets/icon-boss.png";
import element from "../../../assets/icon-element.png";
import food from "../../../assets/icon-food.png";
import material from "../../../assets/icon-material.png";
import mystery from "../../../assets/icon-mystery.png";
import newer from "../../../assets/icon-newer.png";
import PV from "../../../assets/icon-PV.png";
import reliquary from "../../../assets/icon-reliquary.png";
import role from "../../../assets/icon-role.png";
import strategy from "../../../assets/icon-strategy.png";
import task from "../../../assets/icon-task.png";
import team from "../../../assets/icon-team.png";
import version from "../../../assets/icon-version.png";
import weapon from "../../../assets/icon-weapon.png";
import wiki from "../../../assets/icon-wiki.png";

const LINK_BBS_ABYSS = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/46";
const LINK_BBS_ACTIVITY = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/48";
const LINK_BBS_ANIMAL = "https://bbs.mihoyo.com/ys/obc/channel/map/189/49";
const LINK_BBS_BOSS = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/43";
const LINK_BBS_ELEMENT = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/41";
const LINK_BBS_FOOD = "https://bbs.mihoyo.com/ys/obc/channel/map/189/21";
const LINK_BBS_MATERIAL = "https://bbs.mihoyo.com/ys/obc/channel/map/189/13";
const LINK_BBS_MYSTERY = "https://bbs.mihoyo.com/ys/obc/channel/map/189/54";
const LINK_BBS_NEWER = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/38";
const LINK_BBS_OBC = "https://bbs.mihoyo.com/ys/obc";
const LINK_BBS_PV = "https://bbs.mihoyo.com/ys/obc/channel/map/80";
const LINK_BBS_RELIQUARY = "https://bbs.mihoyo.com/ys/obc/channel/map/189/218";
const LINK_BBS_ROLE = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/39";
const LINK_BBS_STRATEGY = "https://bbs.mihoyo.com/ys/strategy";
const LINK_BBS_TASK = "https://bbs.mihoyo.com/ys/strategy/channel/map/45/231";
const LINK_BBS_TEAM = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/40";
const LINK_BBS_VERSION = "https://bbs.mihoyo.com/ys/strategy/channel/map/37/233";
const LINK_BBS_WEAPON = "https://bbs.mihoyo.com/ys/obc/channel/map/189/5";
const LINK_BILI_YYY = "https://space.bilibili.com/431073645/video?tid=4&keyword=&order=pubdate";
const LINK_BILI_WOJU = "https://space.bilibili.com/1773346/video?tid=4&keyword=&order=pubdate";

import styles from "./index.less";
import useNotice from "../../hooks/useNotice";

const btns = [
  {
    name: "全攻略",
    icon: strategy,
    link: LINK_BBS_STRATEGY
  },
  {
    name: "原神百科",
    icon: wiki,
    link: LINK_BBS_OBC
  },
  {
    name: "任务手册",
    icon: task,
    link: LINK_BBS_TASK
  },
  {
    name: "活动集锦",
    icon: activity,
    link: LINK_BBS_ACTIVITY
  },
  {
    name: "版本合集",
    icon: version,
    link: LINK_BBS_VERSION
  },
  {
    name: "角色攻略",
    icon: role,
    link: LINK_BBS_ROLE
  },
  {
    name: "装备解析",
    icon: weapon,
    link: LINK_BBS_WEAPON
  },
  {
    name: "圣遗物图鉴",
    icon: reliquary,
    link: LINK_BBS_RELIQUARY
  },
  {
    name: "阵容攻略",
    icon: team,
    link: LINK_BBS_TEAM
  },
  {
    name: "新手合集",
    icon: newer,
    link: LINK_BBS_NEWER
  },
  {
    name: "材料图鉴",
    icon: material,
    link: LINK_BBS_MATERIAL
  },
  {
    name: "动物图鉴",
    icon: animal,
    link: LINK_BBS_ANIMAL
  },
  {
    name: "讨伐BOSS",
    icon: boss,
    link: LINK_BBS_BOSS
  },
  {
    name: "元素攻略",
    icon: element,
    link: LINK_BBS_ELEMENT
  },
  {
    name: "料理大全",
    icon: food,
    link: LINK_BBS_FOOD
  },
  {
    name: "秘境图鉴",
    icon: mystery,
    link: LINK_BBS_MYSTERY
  },
  {
    name: "深境螺旋",
    icon: abyss,
    link: LINK_BBS_ABYSS
  },
  {
    name: "PV合辑",
    icon: PV,
    link: LINK_BBS_PV
  },
  {
    name: "影月月(B站)",
    icon: PV,
    link: LINK_BILI_YYY
  },
  {
    name: "莴苣妈妈(B站)",
    icon: PV,
    link: LINK_BILI_WOJU
  }
];

const Strategy: React.FC = () => {
  const navigate = useNavigate();
  const notice = useNotice();

  const handleWindowOpen = (link: string) => {
    notice.success({ message: "正在打开页面...", duration: 1000 });
    nativeApi.openWindow(link);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>小窗攻略</div>
        <div className={styles.btns}>
          {btns.map((e) => (
            <div className={styles.btn} key={e.name} onClick={handleWindowOpen.bind(null, e.link)}>
              <img src={e.icon} alt={e.name} />
              <span>{e.name}</span>
            </div>
          ))}
        </div>
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

export default Strategy;
