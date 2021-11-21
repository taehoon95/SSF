// 2021-11-19
// 접근 거부시 메인 페이지로 이동
// 박진현

import { API_BASE_URL } from "./api-config";

export function call(api, method, request){
    let options ={
        headers: new Headers({
            "Content-Type": "application/type",
        }),
        url:API_BASE_URL + api,
        method: method
    };
    if (request){
        // Get method
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
    .then((response) =>
        response.json().then((json)=>{
            if(!response.ok){
                alert('여기는 정상이다')
                //response.ok가 true이면 정상적인 응답을 받은 것이고 에러 응답을 받은 것임
                return Promise.reject(json);
            }
            return json;
        })
    )
    .catch((error)=>{
        console.log(error.status);
        if(error.status === 403){
            window.location.href="/api/login";
            console.log('여기는 login으로 가는 곳이다');            
        }
    });
}