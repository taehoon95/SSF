//실시간 방송 페이지 + 영상 클릭 후 페이지
//2021-11-13

import React from "react";
import StreamShowContainer from "../containers/streaming/StreamShowContainer";
import { ContextProvider } from "../SocketContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const WatchPage = () => {
  return (
    <>
    <Header />
      <ContextProvider>
        <StreamShowContainer />
      </ContextProvider>
      <Footer />
    </>
  );
};

export default WatchPage;
