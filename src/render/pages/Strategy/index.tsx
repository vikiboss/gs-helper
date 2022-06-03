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

import {
  LINK_BBS_ABYSS,
  LINK_BBS_ACTIVITY,
  LINK_BBS_ANIMAL,
  LINK_BBS_BOSS,
  LINK_BBS_ELEMENT,
  LINK_BBS_FOOD,
  LINK_BBS_MATERIAL,
  LINK_BBS_MYSTERY,
  LINK_BBS_NEWER,
  LINK_BBS_OBC,
  LINK_BBS_PV,
  LINK_BBS_RELIQUARY,
  LINK_BBS_ROLE,
  LINK_BBS_STRATEGY,
  LINK_BBS_TASK,
  LINK_BBS_TEAM,
  LINK_BBS_VERSION,
  LINK_BBS_WEAPON
} from "../../../constants";

import styles from "./index.less";

const btns = [
  {
    name: "观测枢-攻略",
    icon: strategy,
    link: LINK_BBS_STRATEGY
  },
  {
    name: "观测枢-百科",
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
    name: "深渊螺旋",
    icon: abyss,
    link: LINK_BBS_ABYSS
  },
  {
    name: "PV合辑",
    icon: PV,
    link: LINK_BBS_PV
  }
];

const Setting: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.title}>原神攻略</div>
      <div className={styles.btns}>
        {btns.map((e) => (
          <div className={styles.btn} key={e.name} onClick={() => nativeApi.openWindow(e.link)}>
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
  );
};

export default Setting;
