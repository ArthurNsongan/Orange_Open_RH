import * as PostsType from '../../types/PostsType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PostsType.GET_ALL_POST_PENDING:
            return {
                ...state,
                loading: true
            }
        case PostsType.GET_ALL_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data.reverse(),
                error: null
            }
        case PostsType.GET_ALL_POST_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        case PostsType.GET_ALL_POST_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
