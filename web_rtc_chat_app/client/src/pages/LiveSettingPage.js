//실시간 방송 설정
//2021-11-13

import React from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import CreateaStreamContainer from "../containers/streaming/CreateaStreamContainer";
import { ContextProvider } from "../SocketContext";

const LiveSettingPage = () => {
  return (
    <div>
      <Header />
      실시간 방송 설정
      <ContextProvider>
        <CreateaStreamContainer />
      </ContextProvider>
      <Footer />
    </div>
  );
};

export default LiveSettingPage;
