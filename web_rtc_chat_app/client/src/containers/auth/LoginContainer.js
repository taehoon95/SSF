//LoginContainer
//버튼 핸들러 정의
//2021-11-15

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../node_modules/axios/index';
import {change} from '../../modules/auth'




const LoginContainer = () => {     
    
    const dispatch = useDispatch();

    const { id , password } = useSelector((state ) => ({
        id : state.id,
        password: state.password
    }))

    const onClick = e => {
        e.preventDefault();
        console.log(122);
        
    }

    const onChange = e =>{
        const { value, name } = e.target;
        dispatch(change({name,value}));
        console.log(e.target.value);
    }

    return (
        <div>
            <h1>로그인</h1>
            <input type="text" id="id" onChange={onChange}  placeholder="로그인"/>
            <input type="text" id="password"  onChange={onChange} placeholder="비밀번호" />    
            <button onClick={onClick}>로그인</button>
        </div>
    );
};

export default LoginContainer;