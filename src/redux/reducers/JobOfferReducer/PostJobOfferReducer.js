import * as JobOfferType from '../../types/JobOfferType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case JobOfferType.POST_JOB_OFFER_PENDING:
            return {
                ...state,
                loading: true
            };
        case JobOfferType.POST_JOB_OFFER_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            };
        case JobOfferType.POST_JOB_OFFER_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            };
        case JobOfferType.POST_JOB_OFFER_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
