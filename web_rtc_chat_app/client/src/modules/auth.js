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
const CHANGE ="CHANGE";


const NUMBUR = "NUMBUR";


const token = localStorage.getItem('auth');
const tokenlled = !!token


const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");


const [IDCHECK,IDCHECK_SUCCESS,IDCHECK_FAILURE] =
createRequestActionTypes("auth/IDCHECK")

const [PWDCHECK,PWDCHECK_SUCCESS,PWDCHECK_FAILURE] = 
createRequestActionTypes("auth/PWDCHECK")

const [PWDUPDATECHECK,PWDUPDATECHECK_SUCCESS,PWDUPDATECHECK_FAILURE] =
createRequestActionTypes("auth/PWDUPDATECHECK")

const [PWDIDCHECK,PWDIDCHECK_SUCCESS,PWDIDCHECK_FAILURE] =
createRequestActionTypes("auth/PWDIDCHECK")



// input change 값 
export const change = createAction(CHANGE,({name, value}) =>({
    name,
    value
}))

//로그인 액션정의
export const login = createAction(LOGIN,({u_id, u_pwd}) =>
    {                 
        return {
        u_id,
        u_pwd
        

    }} 
)


export const numberAuth = createAction(NUMBUR, (number) => ({
    number,
  }));

//아이디 액션 정의
export const idcheck = createAction(IDCHECK,({u_name,u_email}) =>{
    console.log('여기 액션');
    
    return{
    u_name,
    u_email
    }
})

// 비밀번호 아이디 체크 확인
export const pwdidcheck = createAction(PWDIDCHECK,({u_id}) =>({
    u_id
}))

//비밀번호 액션 정의
export const pwdcheck = createAction(PWDCHECK,({u_id,u_email,u_name}) =>({
    u_id,
    u_email,
    u_name

}))

//비밀번호 변경 액션 정의

export const pwdupdatecheck = createAction(PWDUPDATECHECK,({ u_id,
    u_pwd}) =>({
        u_id,
        u_pwd}))

const init = 
{                    
  u_id:"",
  u_pwd:"",
  u_pwdcheck: "",  
  u_name:"",
  u_email: "",
  u_emailcheck: "",
  number:"",
  auth: null,
  authError: null,
  checkError:null,
  check:null,
  pwd:null,
  pwdError:null,
  pwdupdate:null,
  pwdupdateError:null,
  pwdidError:null,
  pwdid:null,
  tokenlled:tokenlled
}

//loginsaga 생성
export const loginSaga =  createRequestSaga(LOGIN, authAPI.login);

//idchecksaga 생성
export const idchecksaga = createRequestSaga(IDCHECK,authAPI.idfind);

//pwdchecksaga 생성
export const pwdchecksaga = createRequestSaga(PWDCHECK,authAPI.pwdfind);

//pwdupdatesaga 생성
export const pwdupdatesaga = createRequestSaga(PWDUPDATECHECK,authAPI.pwdupdate);

//pwdidchecksaga 생성
export const pwdidchecksaga = createRequestSaga(PWDIDCHECK,authAPI.pwdidcheck);


//제네레이터 함수 
export function* authSaga() {
    yield takeLatest(PWDIDCHECK, pwdidchecksaga);
    yield takeLatest(PWDUPDATECHECK, pwdupdatesaga);
    yield takeLatest(PWDCHECK, pwdchecksaga);
    yield takeLatest(IDCHECK, idchecksaga);
    yield takeLatest(LOGIN, loginSaga);
}



const auth = handleActions(    
    {                        
        [CHANGE]: (state, { payload : { name , value }}) =>                        
            produce(state,(draft)=>{
                draft[name] =value;
            }),      
            [NUMBUR]: (state, { payload: { number } }) =>
            produce(state, (draft) => {
              draft["number"] = number.a;
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
                checkError:error,                              
            };
        },
        //아이디 찾기 성공
        [IDCHECK_SUCCESS] : (state,{payload: check}) =>{
            console.log('여기는 성공' + 'auth');       
            console.log(check);          
            console.log(auth);
            
            return{
                ...state,
                checkError:null,
                check
                
            };
        },             
        //비밀번호 찾기 실패
        [PWDCHECK_FAILURE] : (state,{ payload:error }) =>{   
            console.log('여기는 pwdcheck 실패');                           
            return{                
             ...state,
             pwdError:error,                              
            };
        },
        //비밀번호 찾기 성공        
         [PWDCHECK_SUCCESS] : (state,{ payload:pwd }) =>{                  
            console.log('여기는 pwdcheck 성공');            
          return{                
                 ...state,
                pwdError:null,                              
                pwd
            };
         },
         //비밀번호 변경 실패
         [PWDUPDATECHECK_FAILURE] : (state,{ payload:error }) =>{ 
            console.log(error);                              
            console.log('여기는 pwdupdate 실패');
            return{                
             ...state,
             pwdupdateError:error,                              
            };
        },
          //비밀번호 변경 성공
          [PWDUPDATECHECK_SUCCESS] : (state,{ payload:pwdupdate }) =>{                  
            console.log('여기는 pwdupdate 성공' + pwdupdate);
            console.log(state);
            return{                
                   ...state,
                  pwdupdateError:null,                              
                  pwdupdate
              };
           }, 
               //아이디 체크 성공
          [PWDIDCHECK_SUCCESS] : (state,{ payload:pwdid }) =>{                  
            console.log('성공');
            return{                
                   ...state,
                   pwdidError:null,
                   pwdid
              };
           },  
               //아이디 체크 실패
          [PWDIDCHECK_FAILURE] : (state,{ payload:error }) =>{                  
            console.log('실패');
            return{                
                   ...state,
                  pwdidError:error,                              
                  
              };
           },                         
        },
    init     
)
export default auth;