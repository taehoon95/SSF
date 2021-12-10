import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as videodeleteAPI from "../lib/api/videodeleteAPI";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";

// Action
const [DELETEVIDEO, DELETEVIDEO_SUCCESS, DELETEVIDEO_FAILURE] =
    createRequestActionTypes("deletevideo");


// requestSaga 
const deleteVideoSaga = createRequestSaga(
    DELETEVIDEO,
    videodeleteAPI.deleteVideo
  );


// generator
export function* videoSaga() {
  yield takeLatest(DELETEVIDEO, deleteVideoSaga);
}


// dispatch
export const deletevideo = createAction(DELETEVIDEO, (u_id, v_code) => {
    console.log(u_id, v_code);
    return{
    u_id, 
    v_code,
  }});


// Reducer
const init = {
    u_id : "",
    v_code : "",
    deleteError: null,
    deleteRes : ""
}

const videodelete = handleActions(
  {
    [DELETEVIDEO_SUCCESS]: (state, { payload: deleteRes }) => ({
      ...state,
      deleteError: null,
      deleteRes,
    }),
    [DELETEVIDEO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      deleteError: error,
    }),
  },
  init
);

export default videodelete;
