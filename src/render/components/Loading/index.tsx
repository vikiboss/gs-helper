import React from "react";

import paimon from "../../../assets/paimon.gif";

type LoadingProp = {
  text?: string;
};

const Loading: React.FC<LoadingProp> = (props) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        justifySelf: "center"
      }}
    >
      <img src={paimon} alt='派蒙' style={{ width: "120px", marginBottom: "12px" }} />
      <div style={{ marginBottom: "12px" }}>{props.text || "小派蒙正在努力加载中..."}</div>
    </div>
  );
};

export default Loading;
