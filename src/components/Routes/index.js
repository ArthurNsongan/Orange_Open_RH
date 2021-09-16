import React from 'react';
import { Redirect, Route } from 'react-router';
import { defaultUserRoles, getConnectedUser, getRoles, hasRole, IsConnected } from '../../services/Auth'

const AuthUserRoute = ({path, exact, component, redirect}) => {
    return (
        <>
            { IsConnected() ?
                <Route exact={exact} path={path} component={component}/> : 
                <Redirect to={redirect} />
            } 
        </>
    );
}

export const AuthAdminRoute = ({path, exact, component, redirect}) => {

    // console.log(hasRole("member"))

    return (
        <>
            { IsConnected() && getRoles() !== undefined && ( hasRole(defaultUserRoles.SUPERVISOR_ROLE) || hasRole(defaultUserRoles.ADMIN_ROLE) )?
                <Route exact={exact} path={path} component={component}/> : 
                <Redirect to={redirect} />
            }
        </>
    );
}

export const AuthPrivateRoute = ({path, exact, component, redirect, roles}) => {

    // console.log(hasRole("member"))

    return (
        <>
            { IsConnected() && getRoles() !== undefined && ( hasRole(roles) )?
                <Route exact={exact} path={path} component={component}/> : 
                <Redirect to={redirect} />
            }
        </>
    );
}

export default AuthUserRoute;
