// 2021-11-21
// 로그인 상태 확인 및 로그아웃
//박진현

import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const TEMP_SET_USER ='user/TEMP_SET_USER'; //새로고침 이후 임시 로그인 처리


const [CHECK,CHECK_SUCCESS,CHECK_FAILURE] = createRequestActionTypes(
    'users/CHECK',
)

export const check = createAction(CHECK);


  export const tempSetUser = createAction(TEMP_SET_USER, token => token);


  
  




const init = {
    token:"",    
    checkError:null,
}
export default handleActions(
    {
        //새로 고침 후 임시 로그인 처리
        [TEMP_SET_USER] : (state, {payload:token}) =>{
            console.log('temp');
            
            return{
            ...state,
            token,
            }
        },  
        [CHECK_SUCCESS] : (state, {payload:token}) =>{
            console.log('temp');
            
            return{
            ...state,
            token,
            checkError:null
            }
        },      
        [CHECK_FAILURE] : (state, {payload:error}) =>{
            console.log('temp');
            
            return{
            ...state,
            token:null,
            checkError:error
            }
        },  
    },init
);