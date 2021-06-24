/**
 * Login Action
 * @returns {{type: string}}
 */
import * as FaqType from '../types/FaqType';

export const fetchPostFaqPending = () => ({
    type: FaqType.POST_FAQ_PENDING
});
export const fetchPostFaqReset = () => ({
    type: FaqType.POST_FAQ_RESET
});
export const fetchPostFaqSuccess = (res) => ({
    type: FaqType.POST_FAQ_SUCCESS,
    result: res,
});
export const fetchPostFaqError = (error) => ({
    type: FaqType.POST_FAQ_ERROR,
    result: error
});


export const fetchGetAllFaqPending = () => ({
    type: FaqType.GET_ALL_FAQ_PENDING
});
export const fetchGetAllFaqReset = () => ({
    type: FaqType.GET_ALL_FAQ_RESET
});
export const fetchGetAllFaqSuccess = (res) => ({
    type: FaqType.GET_ALL_FAQ_SUCCESS,
    result: res,
});
export const fetchGetAllFaqError = (error) => ({
    type: FaqType.GET_ALL_FAQ_ERROR,
    result: error
});
