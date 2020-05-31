/* eslint-disable no-plusplus */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LOGS, CREATE_LOG_ENTRY } from 'containers/App/constants';
import { logsLoaded, apiError, loadLogs } from 'containers/App/actions';
import { get, post } from 'utils/request';
import env from '../../environment';

let ids = 0;

export function* getLogs() {
  try {
    const { data } = yield call(get, `${env.HASH_LINKED_LOGGER_URL}/logs`);
    const mappedLogs = data.logs.map(([date, message]) => ({
      id: ++ids,
      message,
      date,
    }));
    yield put(logsLoaded(mappedLogs));
  } catch (err) {
    yield put(apiError(err));
  }
}

export function* createLogEntry(action) {
  try {
    const { msg: message } = action;
    yield call(post, `${env.HASH_LINKED_LOGGER_URL}/logs/entry`, { message });
    yield put(loadLogs());
  } catch (err) {
    yield put(apiError(err));
  }
}

export default function* logData() {
  yield takeLatest(LOAD_LOGS, getLogs);
  yield takeLatest(CREATE_LOG_ENTRY, createLogEntry);
}
