import {
  REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOG_OUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOG_OUT:
    case LOGIN_FAIL: {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        user: null,
      };
    }
    case LOGIN_SUCCESS: {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        loading: true,
        user: payload.admin,
      };
    }
    default: return state;
  }
}
