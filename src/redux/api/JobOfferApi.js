import axios from 'axios';
import {Config} from "../../config/ServerConfig";
import {
    fetchGetAllJobOfferError,
    fetchGetAllJobOfferPending,
    fetchGetAllJobOfferReset,
    fetchGetAllJobOfferSuccess, fetchPostJobOfferError, fetchPostJobOfferPending, fetchPostJobOfferReset, fetchPostJobOfferSuccess
} from "../actions/JobOfferActions";

export const getAllJobOfferAction = () => {

    return dispatch => {
        dispatch(fetchGetAllJobOfferPending());

        axios({
            url: `${Config.getBlogUrl}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllJobOfferSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchGetAllJobOfferError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllJobOfferError(error.request));
                else
                    dispatch(fetchGetAllJobOfferError(error.message));
            });
    }
};

export const getAllJobOfferReset = () => {
    return dispatch => {
        dispatch(fetchGetAllJobOfferReset());
    }
};

export const postJobOfferAction = (job) => {

    return dispatch => {
        dispatch(fetchPostJobOfferPending());

        axios({
            url: `${Config.postJobOfferUrl}`,
            method: 'POST',
            data: job
        })
            .then(response => {
                console.log(response);
                dispatch(fetchPostJobOfferSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchPostJobOfferError(error.response));
                else if (error.request)
                    dispatch(fetchPostJobOfferError(error.request));
                else
                    dispatch(fetchPostJobOfferError(error.message));
            });
    }
};

export const postJobOfferReset = () => {
    return dispatch => {
        dispatch(fetchPostJobOfferReset());
    }
};
