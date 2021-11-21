//2021-11-19
//호스트 이름 가져오기
//박진현
let backendHost;
const hostname = window && window.location && window.location.hostname;

if( hostname === 'localhost'){
    backendHost = "http://localhost:8080";
}

export const API_BASE_URL =`${backendHost}`;
