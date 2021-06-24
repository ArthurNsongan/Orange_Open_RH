import * as FaqType from '../../types/FaqType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FaqType.GET_ALL_FAQ_PENDING:
            return {
                ...state,
                loading: true
            }
        case FaqType.GET_ALL_FAQ_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            }
        case FaqType.GET_ALL_FAQ_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        case FaqType.GET_ALL_FAQ_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
