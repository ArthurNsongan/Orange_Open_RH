/**
 * Login Action
 * @returns {{type: string}}
 */
import * as AuthType from '../types/AuthType';

export const fetchLoginPending = () => ({
    type: AuthType.LOGIN_PENDING
});
export const fetchLoginReset = () => ({
    type: AuthType.LOGIN_RESET
});
export const fetchLoginSuccess = (res) => ({
    type: AuthType.LOGIN_SUCCESS,
    result: res,
});
export const fetchLoginError = (error) => ({
    type: AuthType.LOGIN_ERROR,
    result: error
});