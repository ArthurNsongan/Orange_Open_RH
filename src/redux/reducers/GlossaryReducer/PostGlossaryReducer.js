import * as GlossaryType from '../../types/GlossaryType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GlossaryType.POST_GLOSSARY_PENDING:
            return {
                ...state,
                loading: true
            }
        case GlossaryType.POST_GLOSSARY_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            }
        case GlossaryType.POST_GLOSSARY_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        case GlossaryType.POST_GLOSSARY_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
