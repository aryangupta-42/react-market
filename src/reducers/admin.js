import { GET_ADMINS } from '../actions/types';

const initialState = {
    admins: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ADMINS: {
            return {
                admins: payload,
            };
        }
        default: {
            return state;
        }
    }
}
