//2021-11-22 강동하 댓글 구현 commentInsert
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as commentAPI from "../lib/api/comment";
import { takeLatest } from "redux-saga/effects";

const CHANGE = "CHANGE3";

const [COMMENT_INSERT, COMMENT_INSERT_SUCCESS, COMMENT_INSERT_FAILURE] =
  createRequestActionTypes("comment/INSERT");

const init = {
  comment: "",
  commentInsert_Ation: "",
  commentInsert_AtionError: "",
};

export const change = createAction(CHANGE, ({ id, value }) => ({
  id,
  value,
}));

export const commentInsert_Action = createAction(
  COMMENT_INSERT,
  ({ v_code, m_text, u_id }) => ({
    v_code,
    m_text,
    u_id,
  })
);

const watchpage2 = handleActions(
  {
    [CHANGE]: (state, { payload: { id, value } }) =>
      produce(state, (draft) => {
        //console.log(draft);
        draft[id] = value;
      }),
    [COMMENT_INSERT_SUCCESS]: (state, { payload: commentInsert_Ation }) => ({
      ...state,
      commentInsert_AtionError: null,
      commentInsert_Ation,
    }),

    [COMMENT_INSERT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commentInsert_AtionError: error,
    }),
  },
  init
);

const commentInsertSaga = createRequestSaga(COMMENT_INSERT, commentAPI.commentInsert);

export function* watchpage2Sage() {
    yield takeLatest(COMMENT_INSERT, commentInsertSaga);
  }

export default watchpage2;
