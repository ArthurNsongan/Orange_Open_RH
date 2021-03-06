/**
 * Login Action
 * @returns {{type: string}}
 */
import * as PostsType from '../types/PostsType';

export const fetchGetAllPostPending = () => ({
    type: PostsType.GET_ALL_POST_PENDING
});
export const fetchGetAllPostReset = () => ({
    type: PostsType.GET_ALL_POST_RESET
});
export const fetchGetAllPostSuccess = (res) => ({
    type: PostsType.GET_ALL_POST_SUCCESS,
    result: res,
});
export const fetchGetAllPostError = (error) => ({
    type: PostsType.GET_ALL_POST_ERROR,
    result: error
});

export const fetchGetAllPostByDomainPending = () => ({
    type: PostsType.GET_ALL_POST_BY_DOMAIN_PENDING
});
export const fetchGetAllPostByDomainReset = () => ({
    type: PostsType.GET_ALL_POST_BY_DOMAIN_RESET
});
export const fetchGetAllPostByDomainSuccess = (res) => ({
    type: PostsType.GET_ALL_POST_BY_DOMAIN_SUCCESS,
    result: res,
});
export const fetchGetAllPostByDomainError = (error) => ({
    type: PostsType.GET_ALL_POST_BY_DOMAIN_ERROR,
    result: error
});

export const fetchGetAllPostByCategoryPending = () => ({
    type: PostsType.GET_ALL_POST_BY_CATEGORY_PENDING
});
export const fetchGetAllPostByCategoryReset = () => ({
    type: PostsType.GET_ALL_POST_BY_CATEGORY_RESET
});
export const fetchGetAllPostByCategorySuccess = (res) => ({
    type: PostsType.GET_ALL_POST_BY_CATEGORY_SUCCESS,
    result: res,
});
export const fetchGetAllPostByCategoryError = (error) => ({
    type: PostsType.GET_ALL_POST_BY_CATEGORY_ERROR,
    result: error
});

export const fetchAddNewPostPending = () => ({
    type: PostsType.ADD_NEW_POST_PENDING
});
export const fetchAddNewPostReset = () => ({
    type: PostsType.ADD_NEW_POST_RESET
});
export const fetchAddNewPostSuccess = (res) => ({
    type: PostsType.ADD_NEW_POST_SUCCESS,
    result: res,
});
export const fetchAddNewPostError = (error) => ({
    type: PostsType.ADD_NEW_POST_ERROR,
    result: error
});

export const fetchAddNewTransactionPending = () => ({
    type: PostsType.ADD_NEW_TRANSACTION_PENDING 
})

export const fetchAddNewTransactionReset = () => ({
    type: PostsType.ADD_NEW_TRANSACTION_RESET 
})

export const fetchAddNewTransactionSuccess = (res) => ({
    type: PostsType.ADD_NEW_TRANSACTION_SUCCESS,
    result: res,
})

export const fetchAddNewTransactionError = () => ({
    type: PostsType.ADD_NEW_TRANSACTION_ERROR 
})


export const fetchGetPostByIdPending = () => ({
    type: PostsType.GET_POST_BY_ID_PENDING
});
export const fetchGetPostByIdReset = () => ({
    type: PostsType.GET_POST_BY_ID_RESET
});
export const fetchGetPostByIdSuccess = (res) => ({
    type: PostsType.GET_POST_BY_ID_SUCCESS,
    result: res,
});
export const fetchGetPostByIdError = (error) => ({
    type: PostsType.GET_ALL_POST_ERROR,
    result: error
});


export const fetchGetAllPostFeaturedPending = () => ({
    type: PostsType.GET_ALL_POST_FEATURED_PENDING
});
export const fetchGetAllPostFeaturedReset = () => ({
    type: PostsType.GET_ALL_POST_FEATURED_RESET
});
export const fetchGetAllPostFeaturedSuccess = (res) => ({
    type: PostsType.GET_ALL_POST_FEATURED_SUCCESS,
    result: res,
});
export const fetchGetAllPostFeaturedError = (error) => ({
    type: PostsType.GET_ALL_POST_FEATURED_ERROR,
    result: error
});

export const fetchGetAllPostsRHPending = () => ({
    type: PostsType.GET_ALL_POST_RH_PENDING
});
export const fetchGetAllPostsRHReset = () => ({
    type: PostsType.GET_ALL_POST_RH_RESET
});
export const fetchGetAllPostsRHSuccess = (res) => ({
    type: PostsType.GET_ALL_POST_RH_SUCCESS,
    result: res,
});
export const fetchGetAllPostsRHError = (error) => ({
    type: PostsType.GET_ALL_POST_RH_ERROR,
    result: error
});

export const fetchGetAllPostsPopularPending = () => ({
    type: PostsType.GET_ALL_POST_POPULAR_PENDING
});
export const fetchGetAllPostsPopularReset = () => ({
    type: PostsType.GET_ALL_POST_POPULAR_RESET
});
export const fetchGetAllPostsPopularSuccess = (res) => ({
    type: PostsType.GET_ALL_POST_POPULAR_SUCCESS,
    result: res,
});
export const fetchGetAllPostsPopularError = (error) => ({
    type: PostsType.GET_ALL_POST_POPULAR_ERROR,
    result: error
});


export const fetchEditPostPending = () => ({
    type: PostsType.MODIFY_POST_PENDING
});
export const fetchEditPostReset = () => ({
    type: PostsType.MODIFY_POST_RESET
});
export const fetchEditPostSuccess = (res) => ({
    type: PostsType.MODIFY_POST_SUCCESS,
    result: res,
});
export const fetchEditPostError = (error) => ({
    type: PostsType.MODIFY_POST_ERROR,
    result: error
});


export const fetchDeletePostPending = () => ({
    type: PostsType.DELETE_POST_PENDING
});
export const fetchDeletePostReset = () => ({
    type: PostsType.DELETE_POST_RESET
});
export const fetchDeletePostSuccess = (res) => ({
    type: PostsType.DELETE_POST_SUCCESS,
    result: res,
});
export const fetchDeletePostError = (error) => ({
    type: PostsType.DELETE_POST_ERROR,
    result: error
});
