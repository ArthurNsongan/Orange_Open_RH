import * as CommentType from '../../types/CommentType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CommentType.POST_COMMENT_PENDING:
            return {
                ...state,
                loading: true
            };
        case CommentType.POST_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            };
        case CommentType.POST_COMMENT_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            };
        case CommentType.POST_COMMENT_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
