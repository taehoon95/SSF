import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import register, { registerAuthSaga } from "./register";
import auth, { authSaga } from "./auth";
import watchpage2, { watchpage2Sage } from "./watchpage2";
import streaming, { streamingSaga } from "./streaming";
import loading from "./loading";
import users from "./users";


const rootReducer = combineReducers({
  auth,
  register,
  loading,
  users,
  streaming,
  watchpage2,
});

export function* rootSaga() {
  yield all([
    registerAuthSaga(),
    authSaga(),
    watchpage2Sage(),
    streamingSaga(),
  ]);
}

export default rootReducer;
