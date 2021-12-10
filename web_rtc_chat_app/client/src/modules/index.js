import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import register, { registerAuthSaga } from "./register";
import auth, { authSaga } from "./auth";
import watchpage2, { watchpage2Sage } from "./watchpage2";
import streaming, { streamingSaga } from "./streaming";
import loading from "./loading";
import users from "./users";
import videodelete, { videoSaga } from "./videodelete";


const rootReducer = combineReducers({
  auth,
  register,
  loading,
  users,
  streaming,
  watchpage2,
  videodelete,
});

export function* rootSaga() {
  yield all([
    registerAuthSaga(),
    authSaga(),
    watchpage2Sage(),
    streamingSaga(),
    videoSaga(),
  ]);
}

export default rootReducer;
