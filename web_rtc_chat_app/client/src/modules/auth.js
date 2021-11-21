//module/auth
//사가 생성
//액션 정의
//2021-11-15

import { createAction,handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';
import produce from "immer";



//사가 액션 타입 
const CHANGE ="CHANGE"



const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");


  const init = {
        
    u_id:"",
    u_pwd:"",
    auth: "",
    authError: ""
}

// input change 값 
export const change = createAction(CHANGE,({name, value}) =>({
    name,
    value
}))

//사가 액션정의
export const login = createAction(LOGIN,({u_id, u_pwd}) =>
    {                 
        console.log('여기는 로그인');
        return {
        u_id,
        u_pwd
        

    }} 
)


//loginsaga 생성
export const loginSaga =  createRequestSaga(LOGIN, authAPI.login);

//제네레이터 함수 
export function* authSaga() {
    
    yield takeLatest(LOGIN, loginSaga);
}



const auth = handleActions(    
    {                        
        [CHANGE]: (state, { payload : { name , value }}) =>                
            produce(state,(draft)=>{
                console.log('여기는 필드');
                draft[name] =value;
            }),      
            //로그인 실패
        [LOGIN_FAILURE] : (state,{ payload:error }) =>{
            alert("로그인 실패");
            return{
                
                ...state,
                authError:error,
                
              
            };
        },
        //로그인 성공
        [LOGIN_SUCCESS] : (state,{payload: auth}) =>{
            console.log('여기는 성공');            
            return{
                ...state,
                authError:null,
                auth,
            };
        }        
     },
    init     
)
export default auth;