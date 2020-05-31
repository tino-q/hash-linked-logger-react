import produce from 'immer';
import { LOGS_LOADED_OK, API_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  logs: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case API_ERROR:
        if (action.error === 'invalid_schema') {
          alert('Your message was invalid');
        }
        draft.loading = false;
        draft.error = action.error;
        draft.logs = null;
        break;
      case LOGS_LOADED_OK:
        draft.loading = false;
        draft.error = false;
        draft.logs = [];
        (Array.isArray(action.logs) ? action.logs : []).map(l =>
          draft.logs.push(l),
        );
        break;
    }
  });

export default appReducer;
