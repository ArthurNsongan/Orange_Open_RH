import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header'
import ForgotPassword from '../../screens/Auth/ForgotPassword'
import Login from '../../screens/Auth/Login'
import SignUp from '../../screens/Auth/SignUp'

const route = require("../../utils/route.json")

function AuthLayout() {
    return (
        // <div>
        //     <h1>Authentication</h1>
        // </div>
        <>
            {/* <Header /> */}
            <Switch>
                <Route exact path={route.auth.login.link} component={Login}  />
                <Route exact path={route.auth.signup.link} component={SignUp}  />
                <Route exact path={route.auth.forgot_password.link} component={ForgotPassword}  />
                <Route path="/auth*">
                    <Redirect to={route.front.home.link} />
                </Route>
            </Switch>
        </>
    )
}

export default AuthLayout