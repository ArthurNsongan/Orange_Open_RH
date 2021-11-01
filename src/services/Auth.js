import axios from "axios"
import { reactLocalStorage } from "reactjs-localstorage"
import { decodeToken, isExpired } from 'react-jwt';

const _ = require("lodash")

export const USER_TOKEN = "USER_TOKEN"
export const IS_LOGGED_IN = "USER_LOGGED_IN"
export const USER_OBJECT = "USER"
export const USER_ROLES = "USER_ROLES"

export const defaultUserRoles = {
    ADMIN_ROLE : "admin",
    SUPERVISOR_ROLE : "supervisor",
    MEMBER_ROLE : "member",

}

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
export const IsConnected = () => { 
    // console.log("USER_OBJECT", reactLocalStorage.getObject(USER_OBJECT))
    console.log("USER_TOKEN", reactLocalStorage.getObject(USER_TOKEN))
    return (reactLocalStorage.getObject(IS_LOGGED_IN) === true || ( !_.isNil(reactLocalStorage.get(USER_OBJECT)) && !_.isNil(reactLocalStorage.get(USER_TOKEN))) ) 
}

export const checkAuth = () => {
    if(isExpired(getToken())) {
        logOutStorage();
        window.location.reload();
    }
}
export const getRoles = () => { return (reactLocalStorage.getObject(USER_ROLES) ) }

export const hasRole = (roleName) => {
    
    var roles = getRoles()

    roles = _.isArray(roles) ? roles : []

    if( typeof(roleName) === "string") {
        return roles.filter( item => item.name === roleName).length === 1 ? true : false ;
    } else if( roleName.isArray()) {
        return roles.filter( item => roleName.includes(item.name)).length === 1 ? true : false ;
    }
}

export const isSupervisor = () => {
    return hasRole(defaultUserRoles.SUPERVISOR_ROLE) && IsConnected() && getRoles() !== undefined
}

export const getSupervisorAssociationId = () => {
    return getRoles().find(item => item.name === defaultUserRoles.SUPERVISOR_ROLE ).association_id;
}

export const isAdmin = () => {
    return hasRole(defaultUserRoles.ADMIN_ROLE) && IsConnected() && getRoles() !== undefined
}

export const getUserPhoneAccountNumber = () => {
    // const user = getConnectedUser()
    return hasRole("partner") ? getConnectedUser()?.phone : getConnectedUser()?.OmAccountNumber;
}

export const isMember = () => {
    return hasRole(defaultUserRoles.SUPERVISOR_ROLE) && IsConnected() && getRoles() !== undefined
}

export const isAssocMember = (association_id) => {
    var roles = getRoles()
    roles = _.isEqual(roles, {}) ? [] : roles
    return roles.filter( item => ( (item.name === defaultUserRoles.MEMBER_ROLE || item.name === defaultUserRoles.SUPERVISOR_ROLE) && item.pivot.association_id === association_id ) ).length === 1 ? true : false ;
}

export const compareRoles = (roleName, roles) => {
    // console.log("compareRoles", roles)
    if( typeof(roleName) === "string") {
        return roles.filter( item => item.name === roleName).length === 1 ? true : false ;
    } else if( _.isArray(roles)) {
        return roles.filter( item => roleName.includes(item.name)).length > 0 ? true : false ;
    } else {
        return false;
    }
}

export const logOutStorage = ( pushMethod = () => {} ) => {
    reactLocalStorage.clear();
    // setAuthUser(null, null, false, null);
    pushMethod();
}

export const getHeaders = () => {

    return {
        "Authorization" : `Bearer ${ getToken() }`,
        // "Accept": "application/json"
    }
}

export const getAuthHeaders = (config) => {
    var accessToken = getToken()
    config.headers["Access-Control-Allow-Origin"] = '*';
    config.headers["Access-Control-Allow-Headers"] = 'Content-Type, Authorization';
    config.headers["Access-Control-Allow-Methods"] = 'GET,POST,PUT,PATCH,DELETE,OPTIONS';
    // console.log("getAuthHeaders", accessToken)
    config.headers["Authorization"] = 'Bearer ' + getToken();
    config.headers["Accept"] = 'application/json';
  
    return config;
}

export const everyRequestConfig = () => {
    axios.interceptors.request.use(async (config) => {
        let actualConf = config
        actualConf.headers["X-Requested-With"] = "XMLHttpRequest"
        if(!IsConnected()) {
            return actualConf;
        }
        let newConfig = getAuthHeaders(actualConf)
        console.log("newConfig", newConfig)
        return newConfig
    })
}