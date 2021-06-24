import * as PostsType from '../../types/PostsType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PostsType.GET_POST_BY_ID_PENDING:
            return {
                ...state,
                loading: true
            }
        case PostsType.GET_POST_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            }
        case PostsType.GET_POST_BY_ID_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        case PostsType.GET_POST_BY_ID_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
