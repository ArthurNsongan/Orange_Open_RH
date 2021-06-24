import {fetchLoginError, fetchLoginPending, fetchLoginSuccess} from "../actions/AuthActions";
import axios from "axios";
import {Config} from "../../config/ServerConfig";
import {
    fetchAddNewPostError,
    fetchAddNewPostPending,
    fetchAddNewPostReset,
    fetchAddNewPostSuccess,
    fetchDeletePostError,
    fetchDeletePostPending,
    fetchDeletePostReset,
    fetchDeletePostSuccess,
    fetchEditPostError,
    fetchEditPostPending,
    fetchEditPostReset,
    fetchEditPostSuccess,
    fetchGetAllPostByCategoryError,
    fetchGetAllPostByCategoryPending,
    fetchGetAllPostByCategorySuccess,
    fetchGetAllPostByDomainError,
    fetchGetAllPostByDomainPending,
    fetchGetAllPostByDomainReset,
    fetchGetAllPostByDomainSuccess,
    fetchGetAllPostError,
    fetchGetAllPostFeaturedError,
    fetchGetAllPostFeaturedPending,
    fetchGetAllPostFeaturedReset,
    fetchGetAllPostFeaturedSuccess,
    fetchGetAllPostPending,
    fetchGetAllPostReset,
    fetchGetAllPostSuccess,
    fetchGetPostByIdError,
    fetchGetPostByIdPending,
    fetchGetPostByIdReset,
    fetchGetPostByIdSuccess
} from "../actions/PostsActions";
import {Constant} from "../../config/Constant";
import {
    fetchGetAllTestimonialError,
    fetchGetAllTestimonialPending, fetchGetAllTestimonialReset,
    fetchGetAllTestimonialSuccess
} from "../actions/TestimonialActions";

export const getAllPostsByDomaineAction = (categoryID, domaineID) => {

    return dispatch => {
        dispatch(fetchGetAllPostByDomainPending());

        axios({
            url: `${Config.getPublicationUrl}/${categoryID}/${domaineID}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllPostByDomainSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchGetAllPostByDomainError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllPostByDomainError(error.request));
                else
                    dispatch(fetchGetAllPostByDomainError(error.message));
            });
    }
};
export const getAllPostsByDomaineReset = () => {
    return dispatch => {
        dispatch(fetchGetAllPostByDomainReset());
    }
};

export const getAllPostsFrontEndAction = () => {
    return dispatch => {
        dispatch(fetchGetAllPostPending());

        axios({
            url: `${Config.getRhContentPostBlogUrl}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllPostSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchGetAllPostError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllPostError(error.request));
                else
                    dispatch(fetchGetAllPostError(error.message));
            });
    }
}
export const getAllPostsAction = (categoryID) => {

    return dispatch => {
        dispatch(fetchGetAllPostPending());

        axios({
            url: `${Config.getAdminPublicationUrl}/${categoryID}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllPostSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchGetAllPostError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllPostError(error.request));
                else
                    dispatch(fetchGetAllPostError(error.message));
            });
    }
};

export const getAllPostsByCategoryAction = (categoryID) => {

    return dispatch => {
        dispatch(fetchGetAllPostByCategoryPending());

        axios({
            url: `${Config.getAdminPublicationUrl}/${categoryID}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllPostByCategorySuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchGetAllPostByCategoryError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllPostByCategoryError(error.request));
                else
                    dispatch(fetchGetAllPostByCategoryError(error.message));
            });
    }
};

export const getAllPostBackendAction = () => {

    return dispatch => {
        dispatch(fetchGetAllPostPending());

        axios({
            url: `${Config.getRhContentAllPostAdminUrl}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllPostSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchGetAllPostError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllPostError(error.request));
                else
                    dispatch(fetchGetAllPostError(error.message));
            });
    }
};
export const getAllPostsReset = () => {
    return dispatch => {
        dispatch(fetchGetAllPostReset());
    }
};

export const getPostFeaturedAction = () => {

    return dispatch => {
        dispatch(fetchGetAllPostFeaturedPending());

        axios({
            url: `${Config.getPostFeaturedUrl}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllPostFeaturedSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchGetAllPostFeaturedError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllPostFeaturedError(error.request));
                else
                    dispatch(fetchGetAllPostFeaturedError(error.message));
            });
    }
};
export const getPostFeaturedReset = () => {
    return dispatch => {
        dispatch(fetchGetAllPostFeaturedReset());
    }
};


export const addNewPostAction = (post) => {

    return dispatch => {
        dispatch(fetchAddNewPostPending());

        axios({
            url: `${Config.addPostUrl}`,
            method: 'post',
            data: post
        })
            .then(response => {
                console.log(response);
                dispatch(fetchAddNewPostSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchAddNewPostError(error.response));
                else if (error.request)
                    dispatch(fetchAddNewPostError(error.request));
                else
                    dispatch(fetchAddNewPostError(error.message));
            });
    }
};
export const addNewPostReset = () => {
    return dispatch => {
        dispatch(fetchAddNewPostReset());
    }
};

export const editPostAction = (post, id) => {

    return dispatch => {
        dispatch(fetchEditPostPending());

        axios({
            url: `${Config.updatePostUrl}/${id}`,
            method: 'PUT',
            data: post
        })
            .then(response => {
                console.log(response);
                dispatch(fetchEditPostSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchEditPostError(error.response));
                else if (error.request)
                    dispatch(fetchEditPostError(error.request));
                else
                    dispatch(fetchEditPostError(error.message));
            });
    }
};
export const editPostReset = () => {
    return dispatch => {
        dispatch(fetchEditPostReset());
    }
};

export const getPostByIdAction = (id) => {

    return dispatch => {
        dispatch(fetchGetPostByIdPending());

        axios({
            url: `${Config.getPostByIdUrl}/${id}`,
            method: 'GET'
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetPostByIdSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchGetPostByIdError(error.response));
                else if (error.request)
                    dispatch(fetchGetPostByIdError(error.request));
                else
                    dispatch(fetchGetPostByIdError(error.message));
            });
    }
};
export const getPostByIdReset = () => {
    return dispatch => {
        dispatch(fetchGetPostByIdReset());
    }
};


export const deletePostByIdAction = (id) => {

    return dispatch => {
        dispatch(fetchDeletePostPending());

        axios({
            url: `${Config.getPostByIdUrl}/${id}`,
            method: 'DELETE'
        })
            .then(response => {
                console.log(response);
                dispatch(fetchDeletePostSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchDeletePostError(error.response));
                else if (error.request)
                    dispatch(fetchDeletePostError(error.request));
                else
                    dispatch(fetchDeletePostError(error.message));
            });
    }
};
export const deletePostByIdReset = () => {
    return dispatch => {
        dispatch(fetchDeletePostReset());
    }
};


export const getAllPostsFeaturedAction = () => {

    return dispatch => {
        dispatch(fetchGetAllPostFeaturedPending());

        axios({
            url: `${Config.getPostFeaturedUrl}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllPostFeaturedSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchGetAllPostFeaturedError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllPostFeaturedError(error.request));
                else
                    dispatch(fetchGetAllPostFeaturedError(error.message));
            });
    }
};
export const getAllPostsFeaturedReset = () => {
    return dispatch => {
        dispatch(fetchGetAllPostFeaturedReset());
    }
};

export const getAllTestTimonialAction = () => {

    return dispatch => {
        dispatch(fetchGetAllTestimonialPending());

        axios({
            url: `${Config.getAdminPublicationUrl}/${Constant.testimonialID}`,
            method: 'GET',
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGetAllTestimonialSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchGetAllTestimonialError(error.response));
                else if (error.request)
                    dispatch(fetchGetAllTestimonialError(error.request));
                else
                    dispatch(fetchGetAllTestimonialError(error.message));
            });
    }
};
export const getAllTestTimonialReset = () => {
    return dispatch => {
        dispatch(fetchGetAllTestimonialReset());
    }
};
