import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
  message: '',
  severity: '',
};

function alertReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT: {
      return {
        message: payload.message,
        severity: payload.alertType,
      };
    }
    case REMOVE_ALERT: {
      return {
        message: '',
        severity: '',
      };
    }
    default: {
      return state;
    }
  }
}

export default alertReducer;
