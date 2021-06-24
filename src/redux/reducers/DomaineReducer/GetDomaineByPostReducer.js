import * as DomainesType from '../../types/DomaineType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DomainesType.GET_DOMAINE_BY_POST_PENDING:
            return {
                ...state,
                loading: true
            }
        case DomainesType.GET_DOMAINE_BY_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            }
        case DomainesType.GET_DOMAINE_BY_POST_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        case DomainesType.GET_DOMAINE_BY_POST_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
