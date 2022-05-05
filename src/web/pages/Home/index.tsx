import React from "react";

import NativeApi from "../../nativeApi";

function Home() {
  const handleClick = async () => {
    const appInfo = await NativeApi.getAppInfo();
    console.log(appInfo);
  };
  return <h1 onClick={handleClick}>Home</h1>;
}

export default Home;
