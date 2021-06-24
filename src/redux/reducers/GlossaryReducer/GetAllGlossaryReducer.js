import * as GlossaryType from '../../types/GlossaryType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GlossaryType.GET_ALL_GLOSSARY_PENDING:
            return {
                ...state,
                loading: true
            }
        case GlossaryType.GET_ALL_GLOSSARY_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            }
        case GlossaryType.GET_ALL_GLOSSARY_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        case GlossaryType.GET_ALL_GLOSSARY_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
