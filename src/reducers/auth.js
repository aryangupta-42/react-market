import {
  LOGIN_FAIL, LOGIN_SUCCESS, LOG_OUT, USER_LOADED, AUTH_ERROR,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED: {
      return {
        ...state,
        loading: false,
        user: payload,
      };
    }
    case AUTH_ERROR:
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
        token: payload.token,
        loading: false,
        user: payload.admin,
      };
    }
    default: return state;
  }
}
