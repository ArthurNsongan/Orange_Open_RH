import * as ValidatePublication from '../../types/ValidatePublicationType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ValidatePublication.VALIDATE_PUBLICATION_PENDING:
            return {
                ...state,
                loading: true
            };
        case ValidatePublication.VALIDATE_PUBLICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            };
        case ValidatePublication.VALIDATE_PUBLICATION_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            };
        case ValidatePublication.VALIDATE_PUBLICATION_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
