import * as AuthType from '../../types/AuthType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AuthType.LOGIN_PENDING:
            return {
                ...state,
                loading: true
            }
        case AuthType.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            }
        case AuthType.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        case AuthType.LOGIN_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
