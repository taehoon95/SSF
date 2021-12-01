//마이페이지
//회원 정보 변경
//2021-11-13

import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import MyContainer from '../containers/auth/MyContainer';

const MyPage = () => {
    return (
        <div>
            <Header />
            마이페이지
            <MyContainer />
        </div>
    );
};

export default MyPage;