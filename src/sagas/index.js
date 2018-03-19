import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';

/**
  Simulates server response for user details (retrieving from mock user data)
*/
const requestUser = function* () {
  const json = yield call(() => fetch('/mock/user.json', { method: 'get' })
    .then(res => res.json()));
  yield put({ type: actions.USER_LOADED, payload: json });
};

/**
  On app init, immediately retrieves user information (Joe Bloggs)
*/
export default function* () {
  yield call(requestUser);
  yield takeLatest(actions.SUBMIT, function* ({ payload }) {
    yield put({ type: actions.SUBMITTED, payload: payload });
  });
}
