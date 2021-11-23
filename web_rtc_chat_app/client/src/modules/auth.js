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

const token = localStorage.getItem('auth');
const tokenlled = !!token


const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");


const [IDCHECK,IDCHECK_SUCCESS,IDCHECK_FAILURE] =
createRequestActionTypes("Idcheck/IDCHECK")


// input change 값 
export const change = createAction(CHANGE,({name, value}) =>({
    name,
    value
}))

//사가 액션정의
export const login = createAction(LOGIN,({u_id, u_pwd}) =>
    {                 
        return {
        u_id,
        u_pwd
        

    }} 
)

//사가 액션 정의
export const idcheck = createAction(IDCHECK,({u_name,u_email}) =>{
    console.log('여기 액션');
    
    return{
    u_name,
    u_email
    }
})


const init = 
{                    
  u_id:"",
  u_pwd:"",
  auth: null,
  authError: null,
  u_name:"",
  u_email:"",
  tokenlled:tokenlled
}

//loginsaga 생성
export const loginSaga =  createRequestSaga(LOGIN, authAPI.login);


//idchecksaga 생성
export const idchecksaga = createRequestSaga(IDCHECK,authAPI.idfind);

//제네레이터 함수 
export function* authSaga() {
    yield takeLatest(IDCHECK, idchecksaga);
    yield takeLatest(LOGIN, loginSaga);
}



const auth = handleActions(    
    {                        
        [CHANGE]: (state, { payload : { name , value }}) =>                        
            produce(state,(draft)=>{
                console.log(state + "2");
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
                tokenlled: true,
            };
        },
                //아이디 찾기 실패
        [IDCHECK_FAILURE] : (state,{ payload:error }) =>{
            console.log(state);
            
            console.log('실패' + 'auth');            
            return{                
                ...state,
                authError:error,                              
            };
        },
        //아이디 찾기 성공
        [IDCHECK_SUCCESS] : (state,{payload: auth}) =>{
            console.log('여기는 성공' + 'auth');                 
            console.log(auth);
            
            return{
                ...state,
                authError:null,
                auth
                
            };
        }              
     },
    init     
)
export default auth;