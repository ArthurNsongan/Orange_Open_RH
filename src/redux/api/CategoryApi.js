import axios from 'axios';
import {Config} from "../../config/ServerConfig";
import {
    fetchCreateCategoryError,
    fetchCreateCategoryPending,
    fetchCreateCategoryReset,
    fetchCreateCategorySuccess,
    fetchGetAllCategoryError,
    fetchGetAllCategoryPending,
    fetchGetAllCategoryReset,
    fetchGetAllCategorySuccess,
    fetchModifyCategoryError,
    fetchModifyCategoryPending,
    fetchModifyCategoryReset,
    fetchModifyCategorySuccess
} from "../actions/CategoryActions";

export const getAllCategoryAction = () => {

    return dispatch => {
        dispatch(fetchGetAllCategoryPending());

        axios({
            url: `${Config.getCategoriesUrl}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllCategorySuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchGetAllCategoryError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllCategoryError(error.request));
                else
                    dispatch(fetchGetAllCategoryError(error.message));
            });
    }
};
export const getAllCategoryReset = () => {
    return dispatch => {
        dispatch(fetchGetAllCategoryReset());
    }
};


export const createCategoryAction = (data) => {

    return dispatch => {
        dispatch(fetchCreateCategoryPending());

        axios({
            url: `${Config.postCategoryUrl}`,
            method: 'POST',
            data
        })
            .then(response => {
                console.log(response);
                dispatch(fetchCreateCategorySuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchCreateCategoryError(error.response));
                else if (error.request)
                    dispatch(fetchCreateCategoryError(error.request));
                else
                    dispatch(fetchCreateCategoryError(error.message));
            });
    }
};
export const createCategoryReset = () => {
    return dispatch => {
        dispatch(fetchCreateCategoryReset());
    }
};

export const modifyCategoryAction = (id, data) => {

    return dispatch => {
        dispatch(fetchModifyCategoryPending());

        axios({
            url: `${Config.updateCategoryUrl}/${id}`,
            method: 'PUT',
            data
        })
            .then(response => {
                console.log(response);
                dispatch(fetchModifyCategorySuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchModifyCategoryError(error.response));
                else if (error.request)
                    dispatch(fetchModifyCategoryError(error.request));
                else
                    dispatch(fetchModifyCategoryError(error.message));
            });
    }
};
export const modifyCategoryReset = () => {
    return dispatch => {
        dispatch(fetchModifyCategoryReset());
    }
};
