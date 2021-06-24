/**
 * Login Action
 * @returns {{type: string}}
 */
import * as ValidatePublication from '../types/ValidatePublicationType';

export const fetchGetAdminPublicationToValidatePending = () => ({
    type: ValidatePublication.GET_PUBLICATION_ADMIN_TO_VALIDATE_PENDING
});
export const fetchGetAdminPublicationToValidateReset = () => ({
    type: ValidatePublication.GET_PUBLICATION_ADMIN_TO_VALIDATE_RESET
});
export const fetchGetAdminPublicationToValidateSuccess = (res) => ({
    type: ValidatePublication.GET_PUBLICATION_ADMIN_TO_VALIDATE_SUCCESS,
    result: res,
});
export const fetchGetAdminPublicationToValidateError = (error) => ({
    type: ValidatePublication.GET_PUBLICATION_ADMIN_TO_VALIDATE_ERROR,
    result: error
});

export const fetchValidatePublicationPending = () => ({
    type: ValidatePublication.VALIDATE_PUBLICATION_PENDING
});
export const fetchValidatePublicationReset = () => ({
    type: ValidatePublication.VALIDATE_PUBLICATION_RESET
});
export const fetchValidatePublicationSuccess = (res) => ({
    type: ValidatePublication.VALIDATE_PUBLICATION_SUCCESS,
    result: res,
});
export const fetchValidatePublicationError = (error) => ({
    type: ValidatePublication.VALIDATE_PUBLICATION_ERROR,
    result: error
});

export const fetchGetUserNotificationPending = () => ({
    type: ValidatePublication.GET_USER_NOTIFICATION_PENDING
});
export const fetchGetUserNotificationReset = () => ({
    type: ValidatePublication.GET_USER_NOTIFICATION_RESET
});
export const fetchGetUserNotificationSuccess = (res) => ({
    type: ValidatePublication.GET_USER_NOTIFICATION_SUCCESS,
    result: res,
});
export const fetchGetUserNotificationError = (error) => ({
    type: ValidatePublication.GET_USER_NOTIFICATION_ERROR,
    result: error
});
