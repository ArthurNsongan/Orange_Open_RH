import axios from "axios";
import {Config} from "../../config/ServerConfig";
import {
    fetchGetAdminPublicationToValidateError,
    fetchGetAdminPublicationToValidatePending,
    fetchGetAdminPublicationToValidateReset,
    fetchGetAdminPublicationToValidateSuccess,
    fetchValidatePublicationError,
    fetchValidatePublicationPending, fetchValidatePublicationReset,
    fetchValidatePublicationSuccess
} from "../actions/ValidatePublicationAction";

export const getAdminPendingValidationAction = () => {

    return dispatch => {
        dispatch(fetchGetAdminPublicationToValidatePending());

        axios({
            url: `${Config.adminPendingValidationUrl}`,
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

export const getAdminPendingValidationReset = () => {
    return dispatch => {
        dispatch(fetchGetAdminPublicationToValidateReset());
    }
};

//---------------------------------------------------------

export const validatePublicationAction = (data) => {

    return dispatch => {
        dispatch(fetchValidatePublicationPending());

        axios({
            url: `${Config.validatePostUrl}`,
            method: 'POST',
            data
        })
            .then(response => {
                console.log(response);
                dispatch(fetchValidatePublicationSuccess(response));
            })
            .catch(error => {
                console.log(error);
                if (error.response)
                    dispatch(fetchValidatePublicationError(error.response));
                else if (error.request)
                    dispatch(fetchValidatePublicationError(error.request));
                else
                    dispatch(fetchValidatePublicationError(error.message));
            });
    }
};

export const validatePublicationReset = () => {
    return dispatch => {
        dispatch(fetchValidatePublicationReset());
    }
};

