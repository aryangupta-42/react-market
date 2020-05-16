import axios from '../utility/axios';
import { setAlert } from './alert';

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

export const remove = (userDetails) => async (dispatch) => {
    try {
        console.log(userDetails);
    } catch (err) {
        const { data } = err.response;
        const { message } = data;
        dispatch(setAlert(message, 'error'));
    }
};

export const getAllAdmin = () => async (dispatch) => {
    try {
        // all user retriveal
    } catch (err) {
        const { data } = err.response;
        const { message } = data;
        dispatch(setAlert(message, 'error'));
    }
};
