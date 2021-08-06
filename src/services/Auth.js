import { reactLocalStorage } from "reactjs-localstorage"

const _ = require("lodash")

export const USER_TOKEN = "USER_TOKEN"
export const IS_LOGGED_IN = "USER_LOGGED_IN"
export const USER_OBJECT = "USER"
export const USER_ROLES = "USER_ROLES"

export const setAuthUser = (user, token, is_logged_in, roles) => {
    reactLocalStorage.setObject(USER_TOKEN, token)
    reactLocalStorage.setObject(IS_LOGGED_IN, is_logged_in)
    reactLocalStorage.setObject(USER_OBJECT, user)
    reactLocalStorage.setObject(USER_ROLES, roles)
}

export const setToken = (token) => { return (reactLocalStorage.setObject(USER_TOKEN, token)) }
export const setConnectedUser = (user) => { return (reactLocalStorage.setObject(USER_OBJECT, user )) }
export const SetIsConnected = (is_logged_in) => { return (reactLocalStorage.setObject(IS_LOGGED_IN, is_logged_in) ) }
export const setRoles = (roles) => { return (    reactLocalStorage.setObject(USER_ROLES, roles)) }

export const getToken = () => { return (reactLocalStorage.getObject(USER_TOKEN) ) }
export const getConnectedUser = () => { return (reactLocalStorage.getObject(USER_OBJECT) ) }
export const IsConnected = () => { return (reactLocalStorage.getObject(IS_LOGGED_IN) === true || ( !_.isNil(reactLocalStorage.getObject(USER_OBJECT)) && !_.isNil(reactLocalStorage.getObject(USER_TOKEN))) ) }
export const getRoles = () => { return (reactLocalStorage.getObject(USER_ROLES) ) }

export const logOutStorage = ( pushMethod = () => {} ) => {
    reactLocalStorage.clear();
    setAuthUser(null, null, false, null);
    pushMethod();
}

export const getHeaders = () => {
    return {
        "Authorization" : `Bearer ${ getToken() }`
    }
}