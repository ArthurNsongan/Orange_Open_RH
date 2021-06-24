/**
 * Blog Action
 * @returns {{type: string}}
 */
import * as CommentType from '../types/CommentType';

export const fetchPostCommentPending = () => ({
    type: CommentType.POST_COMMENT_PENDING
});
export const fetchPostCommentReset = () => ({
    type: CommentType.POST_COMMENT_RESET
});
export const fetchPostCommentSuccess = (res) => ({
    type: CommentType.POST_COMMENT_SUCCESS,
    result: res,
});
export const fetchPostCommentError = (error) => ({
    type: CommentType.POST_COMMENT_ERROR,
    result: error
});
