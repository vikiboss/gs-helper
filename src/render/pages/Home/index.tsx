import React from "react";

import nativeApi from "../../nativeApi";

function Home() {
  const handleClick = async () => {
    const appInfo = await nativeApi.getAppInfo();
    console.log(appInfo);
  };
  return <h1 onClick={handleClick}>Home</h1>;
}

export default Home;
