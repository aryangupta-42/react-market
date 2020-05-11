/* eslint-disable camelcase */
/* eslint-disable no-console */
import axios from '../utility/axios';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  CLEAR_PROFILE,
} from './types';
import { setAlert } from './alert';
// import setAuthToken from '../utility/setAuthToken';

// Login User
export const login = (loginDetails) => async (dispatch) => {
  try {
    const res = await axios({
      url: '/login',
      method: 'POST',
      data: loginDetails,
    });
    const { data } = res.data;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    const error = err.response.data;
    dispatch(setAlert(error.message, 'error'));
  }
};

// LogOUt

export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
  dispatch({ type: CLEAR_PROFILE });
};
