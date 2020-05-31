import {
  LOAD_LOGS,
  API_ERROR,
  LOGS_LOADED_OK,
  CREATE_LOG_ENTRY,
} from './constants';

export function loadLogs() {
  return {
    type: LOAD_LOGS,
  };
}

export function logsLoaded(logs) {
  return {
    type: LOGS_LOADED_OK,
    logs,
  };
}

export function apiError(error) {
  return {
    type: API_ERROR,
    error,
  };
}

export function createLogEntry(msg) {
  return {
    type: CREATE_LOG_ENTRY,
    msg,
  };
}
