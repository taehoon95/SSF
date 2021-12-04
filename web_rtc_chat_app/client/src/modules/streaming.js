import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as streamingAPI from "../lib/api/StreamingAPI";
import { takeLatest } from "redux-saga/effects";
import { nanoid } from "nanoid";
import produce from "immer";

const CHANGE = "streaming/CHANGE";

const CUT = "streaming/CUT";

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

const [
  SHOWSEARCHSTREAMING,
  SHOWSEARCHSTREAMING_SUCCESS,
  SHOWSEARCHSTREAMING_FAILURE,
] = createRequestActionTypes("showSearchStreaming");

// 2021-12-02 이태훈 검색시 무한 스크롤 비디오 




const showstreamingSaga = createRequestSaga(SHOWSTREAMING, streamingAPI.showStreaming);
const insertStreamingSaga = createRequestSaga(INSERTSTREAMING, streamingAPI.insertStreaming);
const updateStreamingSaga = createRequestSaga(UPDATESTREAMING, streamingAPI.updateStreaming);
const deleteStreamingSaga = createRequestSaga(DELETESTREAMING, streamingAPI.deleteStreaming);
const showStreamingByLnumSaga = createRequestSaga(SHOWSTREAMINGBYLNUM, streamingAPI.showStreamingByLnum);
const showSearchStreamingSaga = createRequestSaga(SHOWSEARCHSTREAMING, streamingAPI.showSearchStreaming);

export function* streamingSaga() {
  yield takeLatest(SHOWSTREAMING, showstreamingSaga);
  yield takeLatest(INSERTSTREAMING, insertStreamingSaga);
  yield takeLatest(UPDATESTREAMING, updateStreamingSaga);
  yield takeLatest(DELETESTREAMING, deleteStreamingSaga);
  yield takeLatest(SHOWSTREAMINGBYLNUM, showStreamingByLnumSaga);
  yield takeLatest(SHOWSEARCHSTREAMING, showSearchStreamingSaga );
}

// 2021-12-02 강동하 리덕스 수정
const init = {
  searchInfo:"", 
  condition:"",
  streamInfo : {},
  streamRes: [],
  showStreamRes: [],
  streamError: null,
  l_code: nanoid(),
  u_id: localStorage.getItem("u_id"),
  l_title: "",
  l_description: "",
  l_img: "",
}
// export const change = createAction(CHANGE, ({ streamInfo }) => 
// {
//   console.log(streamInfo);
// return{
//   streamInfo,
// }});

export const change = createAction(CHANGE, ({ name, value }) => ({
  name,
  value,
}));

// 2021-12-02 강동하 방송 종료 시 값 초기화
export const cut = createAction(CUT, () => 
  ({
    l_title: "",
    l_description: "",
    l_img: "",
  }));

export const showstreaming = createAction(SHOWSTREAMING, (streamInfo ) => ({
    streamInfo
}));

export const insertStreaming = createAction(INSERTSTREAMING, ( streamInfo) => ({
    streamInfo
}));

export const updateStreaming = createAction(UPDATESTREAMING, ( u_id, l_code, l_title, l_description ) => ({
  u_id, l_code, l_title, l_description
}));

export const deleteStreaming = createAction(DELETESTREAMING, ( u_id, l_code ) => ({
  u_id, l_code
}));

export const showStreamingByLnum = createAction(SHOWSTREAMINGBYLNUM, ( l_code ) => ({
  l_code,
}));

export const showSearchStreaming = createAction(SHOWSEARCHSTREAMING, ( search) => ({
  search,
}));



const streaming = handleActions(
  {
    // [CHANGE]: (state, { payload: streamInfo }) => ({
    //   ...state,
    //   streamInfo
    // }),
    [CHANGE]: (state, { payload: { name, value} }) =>
    produce(state, (draft) => {
        draft[name] = value;
      }),

    [CUT]: (state, { payload: showStreamRes }) => ({
      ...state,
      l_title: "",
      l_description: "",
      l_img: "",
    }),

    [SHOWSTREAMING_SUCCESS]: (state, { payload: showStreamRes }) => ({
      ...state,
      streamError: null,
      showStreamRes,
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
    [SHOWSEARCHSTREAMING_SUCCESS]: (state, { payload: showSearchStreamRes }) => ({
      ...state,
      streamError: null,
      showSearchStreamRes,
    }),

    [SHOWSEARCHSTREAMING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      streamError: error,
    }),
  },
  init
);

export default streaming;