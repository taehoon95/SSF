
import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import LiveSettingPage from './pages/LiveSettingPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import RegisterPage from './pages/RegisterPage';
import UploadPage from './pages/UploadPage';
import WatchPage from './pages/WatchPage';
import WatchPage2 from './pages/WatchPage2';
import MyVideoSettingPage from './pages/MyVideoSettingPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import IdCheckPage from './pages/IdCheckPage';
import IdCheckViewrPage from './pages/IdCheckViewPage';
import PwdCheckPage from './pages/PwdCheckPage';
import SearchResultPage from './pages/SearchResultPage';
import streamingListPage from './pages/streamingListPage';
import PwdCheckviewPage from './pages/PwdCheckviewPage';
import ListChangePage from './pages/ListChangePage';
import PrivateRoute from "././components/common/PrivateRoute"


function App() {
 
  return (
    <>
    <Header />
    <div>
      <Route component={MainPage} path={['/@:u_id', '/']} exact />
      <PrivateRoute component={LiveSettingPage} path={['/LiveSettingPage/@:ID', '/LiveSettingPage']} />
      <Route component={LoginPage} path='/LoginPage' />
      <PrivateRoute component={MyPage} path={["/MyPage/@:u_id", '/MyPage']}  />
      <Route component={RegisterPage} path="/RegisterPage" />
      <PrivateRoute component={UploadPage} path={["/UploadPage/@:u_id", '/UploadPage']}  />
      {/* 2021-11-18 : 내 영상 관리 페이지(MyVideoSettingPage) 추가 */}
      <PrivateRoute component={MyVideoSettingPage} path={["/MyVideoSettingPage/@:u_id", '/MyVideoSettingPage']}  />
      {/* 20211115 이태훈 비디오 보는 페이지 테스트중*/}
      <Route component={LiveSettingPage} path={['/LiveSettingPage/@:ID', '/LiveSettingPage']} />
      <Route component={WatchPage} path={["/WatchPage/:l_code" , "/WatchPage"]} />
      <Route component={WatchPage2} path={["/WatchPage2/:v_code"]} />
      {/* 2021-11-22 아이디 찾기 페이지 추가*/}
      <Route component={IdCheckPage} path={["/IdCheckPage"]} /> 
      <PrivateRoute component={IdCheckViewrPage} path={["/IdCheckViewrPage"]} />
      <Route component={streamingListPage} path={"/streamingListPage"} />
      {/* 2021-11-23 비밀번호 찾기 페이지 추가*/}
      <Route component={PwdCheckPage} path={["/PwdCheckPage"]} />
      <PrivateRoute component={SearchResultPage} path={["/SearchResultPage/:v_name", "/SearchResultPage" ]} />
      <PrivateRoute component={PwdCheckviewPage} path={["/PwdCheckviewPage"]} />
      {/*2021-11-25 영상관리 수정 페이지*/}
      <PrivateRoute component={ListChangePage} path={["/ListChangePage/:v_code", '/ListChangePage']} />
    </div>
    <Footer />
    </>
  );
}

export default App;
