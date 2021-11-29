import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as streamingAPI from "../lib/api/StreamingAPI";
import { takeLatest } from "redux-saga/effects";

const CHANGE = "streaming/CHANGE";

const [SHOWSTREAMING, SHOWSTREAMING_SUCCESS, SHOWSTREAMING_FAILURE] =
  createRequestActionTypes("showstreaming");

const [INSERTSTREAMING, INSERTSTREAMING_SUCCESS, INSERTSTREAMING_FAILURE] =
  createRequestActionTypes("insertStreaming");

const [UPDATESTREAMING, UPDATESTREAMING_SUCCESS, UPDATESTREAMING_FAILURE] =
  createRequestActionTypes("updateStreaming");

const [DELETESTREAMING, DELETESTREAMING_SUCCESS, DELETESTREAMING_FAILURE] =
  createRequestActionTypes("deleteStreaming");


const [
  SHOWSTREAMINGBYLNUM,
  SHOWSTREAMINGBYLNUM_SUCCESS,
  SHOWSTREAMINGBYLNUM_FAILURE,
] = createRequestActionTypes("showStreamingByLnum");



const showstreamingSaga = createRequestSaga(SHOWSTREAMING, streamingAPI.showStreaming);
const insertStreamingSaga = createRequestSaga(INSERTSTREAMING, streamingAPI.insertStreaming);
const updateStreamingSaga = createRequestSaga(UPDATESTREAMING, streamingAPI.updateStreaming);
const deleteStreamingSaga = createRequestSaga(DELETESTREAMING, streamingAPI.deleteStreaming);
const showStreamingByLnumSaga = createRequestSaga(SHOWSTREAMINGBYLNUM, streamingAPI.showStreamingByLnum);

export function* streamingSaga() {
  yield takeLatest(SHOWSTREAMING, showstreamingSaga);
  yield takeLatest(INSERTSTREAMING, insertStreamingSaga);
  yield takeLatest(UPDATESTREAMING, updateStreamingSaga);
  yield takeLatest(DELETESTREAMING, deleteStreamingSaga);
  yield takeLatest(SHOWSTREAMINGBYLNUM, showStreamingByLnumSaga);
}


const init = {
  searchInfo:"", 
  condition:"",
  streamInfo: null,
  streamRes: [],
  streamError: null,
};

export const change = createAction(CHANGE, ({ streamInfo }) => ({
  streamInfo,
}));

export const showstreaming = createAction(SHOWSTREAMING, (streamInfo ) => ({
    streamInfo
}));

export const insertStreaming = createAction(INSERTSTREAMING, ( streamInfo ) => ({
    streamInfo
}));

export const updateStreaming = createAction(UPDATESTREAMING, ( u_id, l_code, l_title, l_description ) => ({
  u_id, l_code, l_title, l_description
}));

export const deleteStreaming = createAction(DELETESTREAMING, ( u_id,l_code ) => ({
  u_id, l_code,
}));

export const showStreamingByLnum = createAction(SHOWSTREAMINGBYLNUM, ( l_code ) => ({
  l_code,
}));




const streaming = handleActions(
  {
    [CHANGE]: (state, { payload: streamInfo }) => ({
      ...state,
      streamInfo
    }),
    [SHOWSTREAMING_SUCCESS]: (state, { payload: streamRes }) => ({
      ...state,
      streamError: null,
      streamRes,
    }),

    [SHOWSTREAMING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
    [INSERTSTREAMING_SUCCESS]: (state, { payload: streamRes }) => ({
      ...state,
      streamError: null,
      streamRes,
    }),

    [INSERTSTREAMING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
    [UPDATESTREAMING_SUCCESS]: (state, { payload: streamRes }) => ({
      ...state,
      streamError: null,
      streamRes,
    }),

    [UPDATESTREAMING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
    [DELETESTREAMING_SUCCESS]: (state, { payload: streamRes }) => ({
      ...state,
      streamError: null,
      streamRes,
    }),

    [DELETESTREAMING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
    [SHOWSTREAMINGBYLNUM_SUCCESS]: (state, { payload: streamRes }) => ({
      ...state,
      streamError: null,
      streamRes,
    }),

    [SHOWSTREAMINGBYLNUM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
     
  },
  init
);

export default streaming;