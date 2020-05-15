/* eslint-disable camelcase */
/* eslint-disable no-console */
import axios from '../utility/axios';
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOG_OUT,
    USER_LOADED,
    AUTH_ERROR,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utility/setAuthToken';

// Get User Details
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios({
            url: '/api/admin',
            method: 'GET',
        });
        const { data } = res.data;
        dispatch({
            type: USER_LOADED,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: null,
        });
    }
};

// Login User
export const login = (loginDetails) => async (dispatch) => {
    try {
        const res = await axios({
            url: '/login',
            method: 'POST',
            data: loginDetails,
        });
        const { data } = res.data;
        dispatch(setAlert('Login Successful', 'success'));
        setAuthToken(data.token);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        });
        let message =
            'Whoops!! A server error occurred, please try again later';
        if (typeof err.response !== 'undefined' && err.response) {
            const error = err.response.data;
            message = error.message;
        }
        dispatch(setAlert(message, 'error'));
    }
};

// Logout
export const logout = () => (dispatch) => {
    dispatch({ type: LOG_OUT });
    window.location.href = '/';
};
