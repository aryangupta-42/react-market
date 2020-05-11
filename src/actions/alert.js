import { SET_ALERT } from './types';

// eslint-disable-next-line import/prefer-default-export
export const setAlert = (message, alertType) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { message, alertType },
  });
};
