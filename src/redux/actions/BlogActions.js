/**
 * Blog Action
 * @returns {{type: string}}
 */
import * as BlogType from '../types/BlogType';

export const fetchGetAllBlogPending = () => ({
    type: BlogType.GET_ALL_BLOG_PENDING
});
export const fetchGetAllBlogReset = () => ({
    type: BlogType.GET_ALL_BLOG_RESET
});
export const fetchGetAllBlogSuccess = (res) => ({
    type: BlogType.GET_ALL_BLOG_SUCCESS,
    result: res,
});
export const fetchGetAllBlogError = (error) => ({
    type: BlogType.GET_ALL_BLOG_ERROR,
    result: error
});


export const fetchPostBlogPending = () => ({
    type: BlogType.POST_BLOG_PENDING
});
export const fetchPostBlogReset = () => ({
    type: BlogType.POST_BLOG_RESET
});
export const fetchPostBlogSuccess = (res) => ({
    type: BlogType.POST_BLOG_SUCCESS,
    result: res,
});
export const fetchPostBlogError = (error) => ({
    type: BlogType.POST_BLOG_ERROR,
    result: error
});
