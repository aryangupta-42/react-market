import axios from '../utility/axios';
import { setAlert } from './alert';
import { GET_ADMINS } from './types';

// register new user
export const register = (userDetails) => async (dispatch) => {
    try {
        const res = await axios({
            url: '/api/admin/addAdmin',
            method: 'POST',
            data: userDetails,
        });
        const { status } = res.data;
        if (status) {
            dispatch(setAlert('Admin created successfully', 'success'));
        } else {
            dispatch(setAlert('An error occurred', 'error'));
        }
    } catch (err) {
        const { data } = err.response;
        const { message } = data;
        dispatch(setAlert(message, 'error'));
    }
};

export const deleteAdmin = (id) => async (dispatch) => {
    try {
        const res = await axios({
            url: `/api/admin/delete/${id}`,
            method: 'POST',
        });
        const { status } = res.data;
        if (status) {
            dispatch(setAlert('User deleted', 'success'));
        }
    } catch (err) {
        const { data } = err.response;
        const { message } = data;
        dispatch(setAlert(message, 'error'));
    }
};

export const getAllAdmin = () => async (dispatch) => {
    try {
        // all user retriveal
        const res = await axios({
            url: '/api/admin/all',
            method: 'GET',
        });
        const { status, data } = res.data;
        if (status) {
            dispatch({
                type: GET_ADMINS,
                payload: data,
            });
        }
    } catch (err) {
        const { data } = err.response;
        const { message } = data;
        dispatch(setAlert(message, 'error'));
    }
};
