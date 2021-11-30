
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
import IdCheckPage from './pages/IdCheckPage';
import IdCheckViewrPage from './pages/IdCheckViewPage';
import PwdCheckPage from './pages/PwdCheckPage';
import StreamingListPage from './pages/StreamingListPage';
import SearchResultPage from './pages/SearchResultPage';
import PwdCheckviewPage from './pages/PwdCheckviewPage';
import ListChangePage from './pages/ListChangePage';
import PrivateRoute from "././components/common/PrivateRoute"



function App() {
 
  return (
    <>
      <Route component={MainPage} path={['/@:u_id', '/']} exact />
      <Route component={LoginPage} path='/LoginPage' />
      <PrivateRoute component={MyPage} path={["/MyPage/@:u_id", '/MyPage']}  />
      <Route component={RegisterPage} path="/RegisterPage" />
      <PrivateRoute component={UploadPage} path={["/UploadPage/@:u_id", '/UploadPage']}  />
      {/* 2021-11-18 : 내 영상 관리 페이지(MyVideoSettingPage) 추가 */}
      <PrivateRoute component={MyVideoSettingPage} path={["/MyVideoSettingPage/@:u_id", '/MyVideoSettingPage']}  />
      {/* 2021-11-22 아이디 찾기 페이지 추가*/}
      <Route component={IdCheckPage} path={["/IdCheckPage"]} /> 
      <PrivateRoute component={IdCheckViewrPage} path={["/IdCheckViewrPage"]} />
      <Route component={StreamingListPage} path={"/StreamingListPage"} />
      {/* 2021-11-23 비밀번호 찾기 페이지 추가*/}
      <Route component={PwdCheckPage} path={["/PwdCheckPage"]} />
      <Route component={SearchResultPage} path={["/SearchResultPage/:v_name", "/SearchResultPage" ]} />
      <PrivateRoute component={PwdCheckViewPage} path={["/PwdCheckViewPage"]} />
      {/*2021-11-25 영상관리 수정 페이지*/}
      <PrivateRoute component={ListChangePage} path={["/ListChangePage/:v_code", '/ListChangePage']} />
      {/* 20211115 이태훈 스트리밍 방만들기 페이지*/}      
      <PrivateRoute component={LiveSettingPage} path={'/LiveSettingPage'} />
      {/* 20211115 이태훈 스트리밍 보는 페이지*/}
      <Route component={WatchPage} path={"/WatchPage/:l_code" } />
      <Route component={WatchPage2} path={["/WatchPage2/:v_code"]} />
    </>
  );
}

export default App;
