//실시간 방송 설정
//2021-11-13

import React from "react";
import CreateaStreamContainer from "../containers/streaming/CreateaStreamContainer";
import { ContextProvider } from "../SocketContext";

const LiveSettingPage = () => {
  return (
    <div>
      실시간 방송 설정
      <ContextProvider>
        <CreateaStreamContainer />
      </ContextProvider>
    </div>
  );
};

export default LiveSettingPage;
