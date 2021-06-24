import * as DomaineType from '../../types/DomaineType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DomaineType.MODIFY_THEMATIQUE_PENDING:
            return {
                ...state,
                loading: true
            };
        case DomaineType.MODIFY_THEMATIQUE_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            };
        case DomaineType.MODIFY_THEMATIQUE_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            };
        case DomaineType.MODIFY_THEMATIQUE_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
