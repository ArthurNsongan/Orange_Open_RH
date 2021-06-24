import * as TestimonialType from '../../types/TestimonialType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TestimonialType.GET_ALL_TESTIMONIAL_PENDING:
            return {
                ...state,
                loading: true
            };
        case TestimonialType.GET_ALL_TESTIMONIAL_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            };
        case TestimonialType.GET_ALL_TESTIMONIAL_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            };
        case TestimonialType.GET_ALL_TESTIMONIAL_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
