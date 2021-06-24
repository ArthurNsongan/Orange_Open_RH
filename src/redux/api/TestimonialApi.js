import axios from "axios";
import {Config} from "../../config/ServerConfig";
import {
    fetchPostTestimonialError,
    fetchPostTestimonialPending,
    fetchPostTestimonialReset,
    fetchPostTestimonialSuccess
} from "../actions/TestimonialActions";

export const postTestimonialAction = (faq) => {

    return dispatch => {
        dispatch(fetchPostTestimonialPending());

        axios({
            url: `${Config.postTestimonialUrl}`,
            method: 'POST',
            data: faq
        })
            .then(response => {
                console.log(response);
                dispatch(fetchPostTestimonialSuccess(response));
            })
            .catch(error => {
                console.log(error);
                if (error.response)
                    dispatch(fetchPostTestimonialError(error.response));
                else if (error.request)
                    dispatch(fetchPostTestimonialError(error.request));
                else
                    dispatch(fetchPostTestimonialError(error.message));
            });
    }
};

export const postTestimonialReset = () => {
    return dispatch => {
        dispatch(fetchPostTestimonialReset());
    }
};