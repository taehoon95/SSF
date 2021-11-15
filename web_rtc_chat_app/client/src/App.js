import React from 'react';
import ListPage from './pages/ListPage';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LiveSettingPage from './pages/LiveSettingPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import RegisterPage from './pages/RegisterPage';
import UploadPage from './pages/UploadPage';
import WatchPage from './pages/WatchPage';


function App() {
  return (
    <>
      <Route component={MainPage} path={['/@:u_id', '/']} exact />
      <Route component={ListPage} path={['/ListPage/@:u_id', '/ListPage']} />
      <Route component={LiveSettingPage} path={['/LiveSettingPage/@:ID', '/LiveSettingPage']} />
      <Route component={LoginPage} path="/LoginPage" />
      <Route component={MyPage} path={["/MyPage/@:u_id", '/MyPage']}  />
      <Route component={RegisterPage} path="/RegisterPage" />
      <Route component={UploadPage} path={["/UploadPage/@:u_id", '/UploadPage']}  />
      <Route component={WatchPage} path={["/WatchPage/:v_code" , "/WatchPage"]} />
    </>
  );
}

export default App;
