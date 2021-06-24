import * as FaqType from '../../types/FaqType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FaqType.POST_FAQ_PENDING:
            return {
                ...state,
                loading: true
            }
        case FaqType.POST_FAQ_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            }
        case FaqType.POST_FAQ_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        case FaqType.POST_FAQ_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
