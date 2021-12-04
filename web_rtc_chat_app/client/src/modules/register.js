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

const CHANGE = "CHANGE2";

const NUMBUR = "NUMBUR";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes("auth/REGISTER");

const [ID_CHECK, ID_CHECK_SUCCESS, ID_CHECK_FAILURE] =
  createRequestActionTypes("auth/ID_CHECK");

const init = {
  u_id: "",
  u_pwd: "",
  u_pwdcheck: "",
  u_name: "",
  u_birth: "",
  u_gender: "",
  u_email: "",
  u_emailcheck: "",
  u_tell: "",
  number: "",
  auth: null,
  authError: null,
  idcheck: null,
  idcheckError:null,
};

export const change = createAction(CHANGE, ({ id, value }) => ({
  id,
  value,
}));

export const numberAuth = createAction(NUMBUR, (number) => ({
  number,
}));

export const id_check = createAction(ID_CHECK, ({ u_id }) => ({
  u_id,
}));

export const register_Action = createAction(
  REGISTER,
  ({ u_id, u_pwd, u_name, u_birth, u_gender, u_email, u_tell }) => {
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

const register = handleActions(
  {
    [CHANGE]: (state, { payload: { id, value} }) =>
      produce(state, (draft) => {
        draft[id] = value;
        if(id == "u_id"){
          draft["idcheck"] = null;
          draft["idcheckError"] = null;
         }
      }),

    [NUMBUR]: (state, { payload: { number } }) =>
      produce(state, (draft) => {
        draft["number"] = number.a;
      }),

    [ID_CHECK_SUCCESS]: (state, { payload: idcheck }) => ({
      ...state,
      idcheckError: null,
      idcheck,
    }),

    [ID_CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      idcheckError: error,
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


const registerSaga = createRequestSaga(REGISTER, registerAPI.register);

const idcheckSaga = createRequestSaga(ID_CHECK, registerAPI.idcheck);

export function* registerAuthSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(ID_CHECK, idcheckSaga);
}

export default register;
