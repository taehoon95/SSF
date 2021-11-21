import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import register, { registerAuthSaga } from './register';
import loading from './loading';

const rootReducer = combineReducers({
  register,
  loading,
});

export function* rootSaga() {
  yield all([registerAuthSaga()]);
}

export default rootReducer;