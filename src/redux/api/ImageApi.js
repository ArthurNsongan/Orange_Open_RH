import axios from 'axios';
import {Config} from "../../config/ServerConfig";
import {
    fetchUploadImageError,
    fetchUploadImagePending,
    fetchUploadImageReset,
    fetchUploadImageSuccess
} from "../actions/ImageActions";

export const uploadImageAction = (data) => {

    return dispatch => {
        dispatch(fetchUploadImagePending());

        axios({
            url: `${Config.uploadImageUrl}`,
            method: 'POST',
            data
        })
            .then(response => {
                console.log(response);
                dispatch(fetchUploadImageSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchUploadImageError(error.response));
                else if (error.request)
                    dispatch(fetchUploadImageError(error.request));
                else
                    dispatch(fetchUploadImageError(error.message));
            });
    }
}

export const uploadImageReset = () => {
    return dispatch => {
        dispatch(fetchUploadImageReset());
    }
};