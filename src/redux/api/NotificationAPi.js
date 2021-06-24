import {
    fetchGetAdminPublicationToValidateError,
    fetchGetAdminPublicationToValidatePending, fetchGetAdminPublicationToValidateReset,
    fetchGetAdminPublicationToValidateSuccess
} from "../actions/ValidatePublicationAction";
import axios from "axios";
import {Config} from "../../config/ServerConfig";

export const getUserNotificationAction = (userId) => {

    return dispatch => {
        dispatch(fetchGetAdminPublicationToValidatePending());

        axios({
            url: `${Config.getUserNotificationUrl}/${userId}`,
            method: 'GET'
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAdminPublicationToValidateSuccess(response));
            })
            .catch(error => {
                console.log(error);
                if (error.response)
                    dispatch(fetchGetAdminPublicationToValidateError(error.response));
                else if (error.request)
                    dispatch(fetchGetAdminPublicationToValidateError(error.request));
                else
                    dispatch(fetchGetAdminPublicationToValidateError(error.message));
            });
    }
};

export const getUserNotificationReset = () => {
    return dispatch => {
        dispatch(fetchGetAdminPublicationToValidateReset());
    }
};
