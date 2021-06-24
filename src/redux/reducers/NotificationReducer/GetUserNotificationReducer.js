import * as ValidatePublication from '../../types/ValidatePublicationType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ValidatePublication.GET_USER_NOTIFICATION_PENDING:
            return {
                ...state,
                loading: true
            };
        case ValidatePublication.GET_USER_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            };
        case ValidatePublication.GET_USER_NOTIFICATION_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            };
        case ValidatePublication.GET_USER_NOTIFICATION_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
