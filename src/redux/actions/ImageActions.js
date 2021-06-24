/**
 * Login Action
 * @returns {{type: string}}
 */
import * as ImageType from '../types/ImageType';

export const fetchUploadImagePending = () => ({
    type: ImageType.UPLOAD_IMAGE_PENDING
});
export const fetchUploadImageReset = () => ({
    type: ImageType.UPLOAD_IMAGE_RESET
});
export const fetchUploadImageSuccess = (res) => ({
    type: ImageType.UPLOAD_IMAGE_SUCCESS,
    result: res,
});
export const fetchUploadImageError = (error) => ({
    type: ImageType.UPLOAD_IMAGE_ERROR,
    result: error
});