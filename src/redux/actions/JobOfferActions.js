/**
 * JobOffer Action
 * @returns {{type: string}}
 */
import * as JobOfferType from '../types/JobOfferType';

export const fetchGetAllJobOfferPending = () => ({
    type: JobOfferType.GET_JOB_OFFER_PENDING
});
export const fetchGetAllJobOfferReset = () => ({
    type: JobOfferType.GET_JOB_OFFER_RESET
});
export const fetchGetAllJobOfferSuccess = (res) => ({
    type: JobOfferType.GET_JOB_OFFER_SUCCESS,
    result: res,
});
export const fetchGetAllJobOfferError = (error) => ({
    type: JobOfferType.GET_JOB_OFFER_ERROR,
    result: error
});


export const fetchPostJobOfferPending = () => ({
    type: JobOfferType.POST_JOB_OFFER_PENDING
});
export const fetchPostJobOfferReset = () => ({
    type: JobOfferType.POST_JOB_OFFER_RESET
});
export const fetchPostJobOfferSuccess = (res) => ({
    type: JobOfferType.POST_JOB_OFFER_SUCCESS,
    result: res,
});
export const fetchPostJobOfferError = (error) => ({
    type: JobOfferType.POST_JOB_OFFER_ERROR,
    result: error
});
