/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOGS_LOADED_OK, API_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  logs: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log(`handling: ${action.type}`);
    switch (action.type) {
      case API_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.logs = null;
        break;
      case LOGS_LOADED_OK:
        draft.loading = false;
        draft.error = false;
        draft.logs = [];
        action.logs.map(l => draft.logs.push(l));
        break;
    }
  });

export default appReducer;
