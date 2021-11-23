import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import register, { registerAuthSaga } from './register';
import auth,{authSaga} from './auth'
import loading from './loading';
import users from './users';

const rootReducer = combineReducers({
  auth,
  register,
  loading,
  users

});

export function* rootSaga() {
  yield all([registerAuthSaga(),authSaga()]);
}

export default rootReducer;