import React, { useEffect } from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import MainLayout from './MainLayout';
import AdminLayout from './AdminLayout';
import AuthLayout from './AuthLayout';
import { AuthAdminRoute } from '../components/Routes';
import { everyRequestConfig, getToken, IsConnected, setToken } from '../services/Auth';
import { decodeToken, isExpired } from 'react-jwt';
import { refreshToken, userLogout } from '../services/API';
import moment from "moment";

let route = require("../utils/route.json");

function Layouts() {

    const location = useLocation();
    const history = useHistory();

    const checkRefreshToken = () => { refreshToken(
        (response) => {
            console.log("Response : ", response)
            setToken(response.data.access_token)
        }, (error) => { console.log("Response Error : ", error?.response) }
    )}

    everyRequestConfig();

    useEffect(() => {
        console.log("On App Route Change")
        if( IsConnected() ) {
            const token = getToken()
            const decodedToken = decodeToken(token)
            console.log(decodeToken(token))
            // checkRefreshToken();
            if(isExpired(token)) {
                userLogout();
                history.push(route.auth.login.link)
            }
            else {
                console.log(decodeToken(token))
                let delay = ( (decodedToken.exp * 1000) - new Date().getTime() ) / 1000;
                console.log( new Date(decodedToken.exp * 1000) );
                console.log("delay for refresh : " , delay  +  " seconds before refresh !!!");
                delay = ( moment(new Date(decodedToken.exp * 1000)).diff( moment() ) ) / 1000;
                console.log("delay for refresh 2 : " , delay +  " seconds before refresh !!!");
                if(delay < 225) {
                    checkRefreshToken();
                }
            }
        }

        return () => {
            clearTimeout(checkRefreshToken);
        }

    }, [location]);
    
    return (
        <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            {/* <AuthAdminRoute exact path="/admin*" component={AdminLayout} /> */}
            <Route exact path="/admin*" component={AdminLayout} />
            <Route exact path="/auth*" component={AuthLayout} />
            <Route exact path="/*" component={MainLayout} />
        </Switch>
    )
}

export default Layouts
