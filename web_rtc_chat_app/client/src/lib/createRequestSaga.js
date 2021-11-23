import { call, put } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  console.log(SUCCESS);
  console.log(FAILURE);
  return [type, SUCCESS, FAILURE];  
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  console.log(SUCCESS);
  console.log(FAILURE);
  return function*(action) {
    console.log(type);
    
    yield put(startLoading(type)); // 로딩 시작
    console.log(request);
    try {
      const response = yield call(request, action.payload);
      console.log(action.payload);

      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,        
                
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}