import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
//authSaga 로그인 Saga
//import auth,{authSaga} from './auth'

  
import register, { authSaga } from './register';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  register,
  loading,

});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;