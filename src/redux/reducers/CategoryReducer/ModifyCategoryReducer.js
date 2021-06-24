import * as CategoryType from '../../types/CategoryType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CategoryType.MODIFY_CATEGORY_PENDING:
            return {
                ...state,
                loading: true
            };
        case CategoryType.MODIFY_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            };
        case CategoryType.MODIFY_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            };
        case CategoryType.MODIFY_CATEGORY_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
