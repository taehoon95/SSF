//module/register
//액션 정의
//2021-11-18 강동하 회원가입 구현중
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as registerAPI from "../lib/api/register";
import { takeLatest } from "redux-saga/effects";

const CHANGE = "CHANGE";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes("auth/REGISTER");

const init = {
  u_id: "",
  u_pwd: "",
  u_name: "",
  u_birth: "",
  u_gender: "",
  u_email: "",
  u_tell: "",
  auth: null,
  authError: null,
};

export const change = createAction(CHANGE, ({ id, value }) => ({
  id,
  value,
}));

const register = handleActions(
  {
    [CHANGE]: (state, { payload: { id, value } }) =>
      produce(state, (draft) => {
        draft[id] = value;
      }),

    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),

    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  init
);

export const register_Action = createAction(
  REGISTER,
  ({ u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell }) => {
    console.log(u_id + "============");
    return {
      u_id,
      u_pwd,
      u_name,
      u_birth,
      u_gender,
      u_email,
      u_tell,
    };
  }
);

const registerSaga = createRequestSaga(REGISTER, registerAPI.register);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
}

export default register;
