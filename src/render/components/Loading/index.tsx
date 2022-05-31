import React from "react";

import paimon from "../../../assets/paimon.gif";
import paimon2 from "../../../assets/paimon2.gif";

type LoadingProp = {
  text?: string;
  isEmpty?: boolean;
};

const Loading: React.FC<LoadingProp> = (props) => {
  const { isEmpty = false } = props;
  const text = isEmpty ? "没有内容" : "小派蒙正在努力加载中...";
  const style: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    justifySelf: "center"
  };
  return (
    <div style={style}>
      <img
        src={isEmpty ? paimon2 : paimon}
        alt='派蒙'
        style={{ width: "120px", marginBottom: "12px" }}
      />
      <div style={{ marginBottom: "12px" }}>{props.text || text}</div>
    </div>
  );
};

export default Loading;
