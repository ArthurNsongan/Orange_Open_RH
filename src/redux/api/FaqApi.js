import axios from "axios";
import {Config} from "../../config/ServerConfig";
import {
    fetchGetAllFaqError,
    fetchGetAllFaqPending, fetchGetAllFaqReset, fetchGetAllFaqSuccess,
    fetchPostFaqError,
    fetchPostFaqPending,
    fetchPostFaqReset,
    fetchPostFaqSuccess
} from "../actions/FaqActions";
import {Constant} from "../../config/Constant";

export const postFaqAction = (faq) => {

    return dispatch => {
        dispatch(fetchPostFaqPending());

        axios({
            url: `${Config.postFaqUrl}`,
            method: 'POST',
            data: faq
        })
            .then(response => {
                console.log(response);
                dispatch(fetchPostFaqSuccess(response));
            })
            .catch(error => {
                console.log(error);
                if (error.response)
                    dispatch(fetchPostFaqError(error.response));
                else if (error.request)
                    dispatch(fetchPostFaqError(error.request));
                else
                    dispatch(fetchPostFaqError(error.message));
            });
    }
};

export const postFaqReset = () => {
    return dispatch => {
        dispatch(fetchPostFaqReset());
    }
};

export const getAllFaqAction = () => {

    return dispatch => {
        dispatch(fetchGetAllFaqPending());

        axios({
            url: `${Config.getAdminPublicationUrl}/${Constant.faqID}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllFaqSuccess(response));
            })
            .catch(error => {
                console.log(error);
                if (error.response)
                    dispatch(fetchGetAllFaqError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllFaqError(error.request));
                else
                    dispatch(fetchGetAllFaqError(error.message));
            });
    }
};

export const getAllFaqReset = () => {
    return dispatch => {
        dispatch(fetchGetAllFaqReset());
    }
};
