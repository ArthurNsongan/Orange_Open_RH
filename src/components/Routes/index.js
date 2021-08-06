import React from 'react';
import { Redirect, Route } from 'react-router';
import { IsConnected } from '../../services/Auth'

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

export default AuthUserRoute;
