import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Route, Switch} from "react-router-dom";
import Index from "../../screens/SignIn";

let route = require('../../utils/route');


export default function AuthLayout(props) {

    return (
        <>
            <Header/>
            <main role="main" id="content" className="container-fluid my-5">
                <Switch>
                    <Route path={route.auth.sign_in} component={Index}/>
                </Switch>
            </main>
            <Footer/>

        </>
    )
}
