import axios from 'axios';
import {Config} from "../../config/ServerConfig";
import {
    fetchGetAllBlogError,
    fetchGetAllBlogPending,
    fetchGetAllBlogReset,
    fetchGetAllBlogSuccess, fetchPostBlogError, fetchPostBlogPending, fetchPostBlogReset, fetchPostBlogSuccess
} from "../actions/BlogActions";
import {Constant} from "../../config/Constant";

export const getAllBlogAction = () => {

    return dispatch => {
        dispatch(fetchGetAllBlogPending());

        axios({
            url: `${Config.getAdminPublicationUrl}/${Constant.blogID}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllBlogSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchGetAllBlogError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllBlogError(error.request));
                else
                    dispatch(fetchGetAllBlogError(error.message));
            });
    }
};

export const getAllBlogReset = () => {
    return dispatch => {
        dispatch(fetchGetAllBlogReset());
    }
};

export const postBlogAction = (blog) => {

    return dispatch => {
        dispatch(fetchPostBlogPending());

        axios({
            url: `${Config.postBlogUrl}`,
            method: 'POST',
            data: blog
        })
            .then(response => {
                console.log(response);
                dispatch(fetchPostBlogSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchPostBlogError(error.response));
                else if (error.request)
                    dispatch(fetchPostBlogError(error.request));
                else
                    dispatch(fetchPostBlogError(error.message));
            });
    }
};
export const updateBlogAction = (blog) => {

    return dispatch => {
        dispatch(fetchPostBlogPending());

        axios({
            url: `${Config.updatePostUrl}`,
            method: 'PUT',
            data: blog
        })
            .then(response => {
                console.log(response);
                dispatch(fetchPostBlogSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchPostBlogError(error.response));
                else if (error.request)
                    dispatch(fetchPostBlogError(error.request));
                else
                    dispatch(fetchPostBlogError(error.message));
            });
    }
};

export const postBlogReset = () => {
    return dispatch => {
        dispatch(fetchPostBlogReset());
    }
};
