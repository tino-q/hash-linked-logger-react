/* eslint-disable no-plusplus */
/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_LOGS, CREATE_LOG_ENTRY } from 'containers/App/constants';
import { logsLoaded, apiError, loadLogs } from 'containers/App/actions';

// import request from 'utils/request';
let ids = 0;
const logs = [];

/* id => ({
  id,
  date: 'date',
  message: 'message',
} */

export function* getLogs() {
  // Select username from store
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    console.log('getLogs');
    // Call our request helper (see 'utils/request')
    // const repos = yield call(request, requestURL);
    yield put(logsLoaded(logs));
  } catch (err) {
    yield put(apiError(err));
  }
}

export function* createLogEntry(msg) {
  try {
    // yield call(request, 'requestURL/postmessage + msg');
    // yield put(logsLoaded();
    logs.push({
      id: ++ids,
      message: msg.msg,
      date: new Date().toISOString(),
    });
    yield put(loadLogs());
  } catch (err) {
    yield put(apiError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(LOAD_LOGS, getLogs);
  yield takeLatest(CREATE_LOG_ENTRY, createLogEntry);
}
