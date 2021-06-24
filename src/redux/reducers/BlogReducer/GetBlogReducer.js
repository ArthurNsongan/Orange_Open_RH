import * as BlogType from '../../types/BlogType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BlogType.GET_BLOG_PENDING:
            return {
                ...state,
                loading: true
            };
        case BlogType.GET_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            };
        case BlogType.GET_BLOG_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            };
        case BlogType.GET_BLOG_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
