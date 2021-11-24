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
  createRequestActionTypes("comment_INSERT");

const [COMMENT_UPDATE, COMMENT_UPDATE_SUCCESS, COMMENT_UPDATE_FAILURE] =
  createRequestActionTypes("comment_UPDATE");

const [COMMENT_DELETE, COMMENT_DELETE_SUCCESS, COMMENT_DELETE_FAILURE] =
  createRequestActionTypes("comment_DELETE");

const init = {
  comment: "",
  commentInsert_Ation: "",
  commentInsert_AtionError: "",
  commentUpdate_Ation: "",
  commentUpdate_AtionError: "",
  commentDelete_Ation: "",
  commentDelete_AtionError: "",
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

export const commentUpdate_Action = createAction(
  COMMENT_UPDATE,
  ({ m_num, m_text }) => ({
    m_num,
    m_text,
  })
);

export const commentDelete_Action = createAction(
  COMMENT_DELETE,
  ({ m_num }) => ({
    m_num,
  })
);

const watchpage2 = handleActions(
  {
    [CHANGE]: (state, { payload: { id, value } }) =>
      produce(state, (draft) => {
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

    [COMMENT_UPDATE_SUCCESS]: (state, { payload: commentUpdate_Ation }) => ({
      ...state,
      commentUpdate_AtionError: null,
      commentUpdate_Ation,
    }),

    [COMMENT_UPDATE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commentUpdate_AtionError: error,
    }),
    
    [COMMENT_DELETE_SUCCESS]: (state, { payload: commentDelete_Ation }) => ({
      ...state,
      commentDelete_AtionError: null,
      commentDelete_Ation,
    }),

    [COMMENT_DELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commentDelete_AtionError: error,
    }),
  },
  init
);

const commentInsertSaga = createRequestSaga(
  COMMENT_INSERT,
  commentAPI.commentInsert
);
const commentUpdateSaga = createRequestSaga(
  COMMENT_UPDATE,
  commentAPI.commentUpdate
);
const commentDeleteSaga = createRequestSaga(
  COMMENT_DELETE,
  commentAPI.commentDelete
);

export function* watchpage2Sage() {
  yield takeLatest(COMMENT_INSERT, commentInsertSaga);
  yield takeLatest(COMMENT_UPDATE, commentUpdateSaga);
  yield takeLatest(COMMENT_DELETE, commentDeleteSaga);
}

export default watchpage2;
