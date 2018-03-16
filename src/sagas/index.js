import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions';

const requestUser = function* () {
  const json = yield call(() => fetch('/mock/user.json', { method: 'get' })
    .then(res => res.json()));
  yield put({ type: actions.USER_LOADED, payload: json });
};

export default function* () {
  yield call(requestUser);
  yield takeLatest(actions.SUBMIT, function* ({ payload }) {
    yield put({ type: actions.SUBMITTED, payload: payload });
  });
}
