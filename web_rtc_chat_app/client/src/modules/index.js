import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import register, { registerAuthSaga } from './register';
import auth,{ authSaga } from './auth'
import watchpage2, { watchpage2Sage } from './watchpage2'
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  register,
  loading,
  watchpage2,
});

export function* rootSaga() {
  yield all([registerAuthSaga(), authSaga(), watchpage2Sage()]);
}

export default rootReducer;