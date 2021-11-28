//실시간 방송 페이지 + 영상 클릭 후 페이지
//2021-11-13

import React from "react";
import StreamShowContainer from "../containers/streaming/StreamShowContainer";
import ChatContainer from "../containers/streaming/ChatContainer";
import { ContextProvider } from "../SocketContext";

const WatchPage = () => {
  return (
    <>
      <ContextProvider>
        <StreamShowContainer />
        <ChatContainer />
      </ContextProvider>
    </>
  );
};

export default WatchPage;
