import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from '../src/modules/users';


// 사가 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();

// 스토어 생성
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
console.log(store.getState()); // 스토어의 상태를 확인해봅시다.


function loadUser()
{
  try{
    const token = localStorage.getItem('auth');
    if(!token) return; //로그인 상태가 아니면 아무것도 안함
    store.dispatch(tempSetUser(JSON.parse(token)));
    store.dispatch(check());
  }catch(e){
    console.log('localStorage is not working');
  }
}
sagaMiddleware.run(rootSaga);
loadUser();



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
