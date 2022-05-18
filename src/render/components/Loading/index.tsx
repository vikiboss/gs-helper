import React from "react";

import paimon from "../../../assets/paimon.gif";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <img src={paimon} alt='派蒙' style={{ width: "120px" }} />
      <div>小派蒙正在努力加载中...</div>
    </div>
  );
};

export default Loading;
