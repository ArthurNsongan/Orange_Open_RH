import axios from 'axios';
import {Config} from "../../config/ServerConfig";
import {
    fetchGetAllDomaineError,
    fetchGetAllDomainePending,
    fetchGetAllDomaineReset,
    fetchGetAllDomaineSuccess,
    fetchGetDomaineByPostError,
    fetchGetDomaineByPostPending,
    fetchGetDomaineByPostReset,
    fetchGetDomaineByPostSuccess
} from "../actions/DomaineActions";
import {
    fetchCreateThematiqueError,
    fetchCreateThematiquePending,
    fetchCreateThematiqueReset,
    fetchCreateThematiqueSuccess,
    fetchModifyThematiqueError,
    fetchModifyThematiquePending,
    fetchModifyThematiqueReset,
    fetchModifyThematiqueSuccess
} from "../actions/DomaineActions";

export const getAllDomaineAction = () => {

    return dispatch => {
        dispatch(fetchGetAllDomainePending());

        axios({
            url: `${Config.getDomainesUrl}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllDomaineSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchGetAllDomaineError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllDomaineError(error.request));
                else
                    dispatch(fetchGetAllDomaineError(error.message));
            });
    }
}
export const getAllDomaineReset = () => {
    return dispatch => {
        dispatch(fetchGetAllDomaineReset());
    }
};

export const getDomaineByPostAction = (id) => {

    return dispatch => {
        dispatch(fetchGetDomaineByPostPending());

        axios({
            url: `${Config.getDomainesUrl}/${id}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetDomaineByPostSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchGetDomaineByPostError(error.response));
                else if (error.request)
                    dispatch(fetchGetDomaineByPostError(error.request));
                else
                    dispatch(fetchGetDomaineByPostError(error.message));
            });
    }
}
export const getDomaineByPostReset = () => {
    return dispatch => {
        dispatch(fetchGetDomaineByPostReset());
    }
};

export const createThematiqueAction = (data) => {

    return dispatch => {
        dispatch(fetchCreateThematiquePending());

        axios({
            url: `${Config.postDomaineUrl}`,
            method: 'POST',
            data
        })
            .then(response => {
                console.log(response);
                dispatch(fetchCreateThematiqueSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchCreateThematiqueError(error.response));
                else if (error.request)
                    dispatch(fetchCreateThematiqueError(error.request));
                else
                    dispatch(fetchCreateThematiqueError(error.message));
            });
    }
};
export const createThematiqueReset = () => {
    return dispatch => {
        dispatch(fetchCreateThematiqueReset());
    }
};

export const modifyThematiqueAction = (id, data) => {

    return dispatch => {
        dispatch(fetchModifyThematiquePending());

        axios({
            url: `${Config.updateThematiqueUrl}/${id}`,
            method: 'PUT',
            data
        })
            .then(response => {
                console.log(response);
                dispatch(fetchModifyThematiqueSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchModifyThematiqueError(error.response));
                else if (error.request)
                    dispatch(fetchModifyThematiqueError(error.request));
                else
                    dispatch(fetchModifyThematiqueError(error.message));
            });
    }
};
export const modifyThematiqueReset = () => {
    return dispatch => {
        dispatch(fetchModifyThematiqueReset());
    }
};
