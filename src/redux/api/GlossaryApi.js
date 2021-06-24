import axios from "axios";
import {Config} from "../../config/ServerConfig";
import {
    fetchGetAllGlossaryError,
    fetchGetAllGlossaryPending,
    fetchGetAllGlossaryReset,
    fetchGetAllGlossarySuccess,
    fetchPostGlossaryError,
    fetchPostGlossaryPending,
    fetchPostGlossaryReset,
    fetchPostGlossarySuccess
} from "../actions/GlossaryActions";
import {Constant} from "../../config/Constant";

export const postGlossaryAction = (glossary) => {

    return dispatch => {
        dispatch(fetchPostGlossaryPending());

        axios({
            url: `${Config.postGlossaryUrl}`,
            method: 'POST',
            data: glossary
        })
            .then(response => {
                console.log(response);
                dispatch(fetchPostGlossarySuccess(response));
            })
            .catch(error => {
                console.log(error);
                if (error.response)
                    dispatch(fetchPostGlossaryError(error.response));
                else if (error.request)
                    dispatch(fetchPostGlossaryError(error.request));
                else
                    dispatch(fetchPostGlossaryError(error.message));
            });
    }
};

export const postGlossaryReset = () => {
    return dispatch => {
        dispatch(fetchPostGlossaryReset());
    }
};

export const getAllGlossaryAction = () => {

    return dispatch => {
        dispatch(fetchGetAllGlossaryPending());

        axios({
            url: `${Config.getAdminPublicationUrl}/${Constant.glossaireID}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllGlossarySuccess(response));
            })
            .catch(error => {
                console.log(error);
                if (error.response)
                    dispatch(fetchGetAllGlossaryError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllGlossaryError(error.request));
                else
                    dispatch(fetchGetAllGlossaryError(error.message));
            });
    }
};

export const getAllGlossaryReset = () => {
    return dispatch => {
        dispatch(fetchGetAllGlossaryReset());
    }
};
