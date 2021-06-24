import * as ValidatePublication from '../../types/ValidatePublicationType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ValidatePublication.GET_PUBLICATION_ADMIN_TO_VALIDATE_PENDING:
            return {
                ...state,
                loading: true
            };
        case ValidatePublication.GET_PUBLICATION_ADMIN_TO_VALIDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            };
        case ValidatePublication.GET_PUBLICATION_ADMIN_TO_VALIDATE_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            };
        case ValidatePublication.GET_PUBLICATION_ADMIN_TO_VALIDATE_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
