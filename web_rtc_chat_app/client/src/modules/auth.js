//module/auth
//사가 생성
//액션 정의
//2021-11-15

import { createAction } from "redux-actions";


const CHANGE ="CHANGE"

const init = {
    id:"",
    password:""
}

// input change 값 
export const change = createAction(CHANGE,({username,password}) =>({
    username,
    password
}))