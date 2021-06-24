import axios from 'axios';
import {Config} from "../../config/ServerConfig";
import {
    fetchPostCommentError,
    fetchPostCommentPending,
    fetchPostCommentReset,
    fetchPostCommentSuccess
} from "../actions/CommentActions";

export const postCommentAction = (comment) => {

    return dispatch => {
        dispatch(fetchPostCommentPending());

        axios({
            url: `${Config.postCommentUrl}`,
            method: 'POST',
            data: comment
        })
            .then(response => {
                console.log(response);
                dispatch(fetchPostCommentSuccess(response));
            })
            .catch(error => {
                if (error.response)
                    dispatch(fetchPostCommentError(error.response));
                else if (error.request)
                    dispatch(fetchPostCommentError(error.request));
                else
                    dispatch(fetchPostCommentError(error.message));
            });
    }
};

export const postCommentReset = () => {
    return dispatch => {
        dispatch(fetchPostCommentReset());
    }
};