import AuthTypes from "../../types/AuthTypes";

const initialState = {
    loading: false,
    result: null,
    error: null,
    isLoggedIn: false
}

export const logInReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthTypes.USER_LOGIN_PENDING: {
            console.log(AuthTypes.USER_LOGIN_PENDING)
            return {
                ...state,
                loading: true
            }
        }
        case AuthTypes.USER_LOGIN_SUCCESS:
            {
                console.log(AuthTypes.USER_LOGIN_SUCCESS)
                return {
                    ...state,
                    loading: false,
                    result: action.result.data,
                    error: null,
                    isLoggedIn: true
                }
            }
        case AuthTypes.USER_LOGIN_ERROR: {
            console.log(AuthTypes.USER_LOGIN_ERROR)
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        }
        default:
            return state;
    }
}

export const logOutReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthTypes.USER_LOGOUT_PENDING:
            {
                return {
                    ...state,
                    loading: true
                }
            }
        case AuthTypes.USER_LOGOUT_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    result: action.result.data,
                    error: null,
                    isLoggedIn: false
                }
            }
        case AuthTypes.USER_LOGOUT_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    result: null,
                    error: action.result
                }
            }
        default:
            return state;
    }
}

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthTypes.USER_REGISTER_PENDING:
            {
                return {
                    ...state,
                    loading: true
                }
            }
        case AuthTypes.USER_REGISTER_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    result: action.result.data,
                    error: null,
                    isLoggedIn: true
                }
            }
        case AuthTypes.USER_REGISTER_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    result: null,
                    error: action.result
                }
            }
        default:
            return state;
    }
}