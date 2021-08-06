import AuthTypes from "../types/AuthTypes";

export const userLoginPending = () => ({
    type: AuthTypes.USER_LOGIN_PENDING
})
export const userLoginSuccess = (response) => ({
    type: AuthTypes.USER_LOGIN_SUCCESS,
    result: response
})
export const userLoginError = (error) => ({
    type: AuthTypes.USER_LOGIN_ERROR,
    result: error
})

export const userLogoutPending = () => ({
    type: AuthTypes.USER_LOGOUT_PENDING
})
export const userLogoutSuccess = () => ({
    type: AuthTypes.USER_LOGOUT_SUCCESS
})
export const userLogouError = () => ({
    type: AuthTypes.USER_LOGOUT_ERROR
})