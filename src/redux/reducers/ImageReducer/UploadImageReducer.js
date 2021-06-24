import * as ImageType from '../../types/ImageType';

const initialState = {
    loading: false,
    result: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ImageType.UPLOAD_IMAGE_PENDING:
            return {
                ...state,
                loading: true
            }
        case ImageType.UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.result.data,
                error: null
            }
        case ImageType.UPLOAD_IMAGE_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        case ImageType.UPLOAD_IMAGE_RESET:
            return initialState;

        default: {
            return state;
        }
    }
};
