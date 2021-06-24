/**
 * Login Action
 * @returns {{type: string}}
 */
import * as TestimonialType from '../types/TestimonialType';

export const fetchPostTestimonialPending = () => ({
    type: TestimonialType.POST_TESTIMONIAL_PENDING
});
export const fetchPostTestimonialReset = () => ({
    type: TestimonialType.POST_TESTIMONIAL_RESET
});
export const fetchPostTestimonialSuccess = (res) => ({
    type: TestimonialType.POST_TESTIMONIAL_SUCCESS,
    result: res,
});
export const fetchPostTestimonialError = (error) => ({
    type: TestimonialType.POST_TESTIMONIAL_ERROR,
    result: error
});


export const fetchGetAllTestimonialPending = () => ({
    type: TestimonialType.GET_ALL_TESTIMONIAL_PENDING
});
export const fetchGetAllTestimonialReset = () => ({
    type: TestimonialType.GET_ALL_TESTIMONIAL_RESET
});
export const fetchGetAllTestimonialSuccess = (res) => ({
    type: TestimonialType.GET_ALL_TESTIMONIAL_SUCCESS,
    result: res,
});
export const fetchGetAllTestimonialError = (error) => ({
    type: TestimonialType.GET_ALL_TESTIMONIAL_ERROR,
    result: error
});
