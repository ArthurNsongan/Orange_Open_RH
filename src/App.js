import React, {useEffect} from "react";
import {Route, Switch, withRouter, useLocation, useHistory } from 'react-router-dom';
// import $ from "jquery";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
// import Home from "./screens/Home";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./layout/AdminLayout";
// import Admin from "./screens/Admin";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Utils from "./utils/index";
import 'react-dropzone-uploader/dist/styles.css'
import {useDispatch} from "react-redux";
import moment from "moment"
import "./App.scss";
// import UserLayout from "./layout/UserLayout";
// import UserRoute from "./components/UserRoute";
// import UnderConstruction from "./screens/CommonScreen/UnderConstruction";

import {fetchLoginReset} from "./redux/actions/AuthActions";

let route = require('./utils/route');

function App(props) {

    window.$(document).ready(function() {
        window.$("body").tooltip({ selector: '[data-toggle=tooltip]' });
    });

    let location = useLocation();
    const dispatch = useDispatch();
    let history = useHistory();

    const disconnect = () => {
        localStorage.clear();
        dispatch(fetchLoginReset());
        //history.go("/");
        window.location.href = "/";
    };

    useEffect(() => {
        let connect_try = localStorage.getItem("USER_CONNECT_TRY");
        if(connect_try != undefined) {
            let number = parseInt(connect_try)
            let last_try_date = localStorage.getItem("USER_CONNECTED_TRY_DATE")
            if(last_try_date != undefined) {
                let now = moment(new Date().toISOString());
                let date = moment(last_try_date)
                var daysLeft = now.diff(date,"days")
                if( daysLeft > 1) {
                    localStorage.removeItem("USER_CONNECT_TRY");
                    localStorage.removeItem("USER_CONNECTED_TRY_DATE");
                }
            }
        } else {
            localStorage.setItem("USER_CONNECT_TRY", '0');
        }
        let date_con = moment(localStorage.getItem("DATE_CONNECTED"));
        let now = moment(new Date().toISOString());
        let user = localStorage.getItem("USER");
        var checkTime;
        if(user != undefined) {
            var secondsLeft = now.diff(date_con,"seconds")
            if( secondsLeft >= 600 ) {
                disconnect();
            } else {
                localStorage.setItem("DATE_CONNECTED", new Date().toISOString());
                checkTime = setInterval(() => {
                    let date_con = moment(localStorage.getItem("DATE_CONNECTED"));
                    let now = moment(new Date().toISOString());
                    let user = localStorage.getItem("USER");
                    var secondsLeft = now.diff(date_con,"seconds")
                    // console.log("secondsLeft : " + secondsLeft)
                    if( now.diff(date_con,"seconds") >= 600 ) {
                        disconnect();
                    }
                }, 1000)
            }
        }
        else if( now.diff(date_con,"seconds") >= 600 ) {
            disconnect()
        }

        return () => {
            clearInterval(checkTime);
        }
    }, [location])

    return (
        <div className="App">
            <Switch>
                <Route path="/auth/:page" component={AuthLayout}/>
                {/* <Route path="/under-construction" component={UnderConstruction} /> */}
{/* 
                {
                    (props.result !== null || Utils.isConnected()) &&
                    props.location.pathname.includes(route.user_admin_url[1].link) ?
                        <UserRoute path="/my-space/:page">
                            <UserLayout/>
                        </UserRoute> :
                        <PrivateRoute path="/:page">
                            <MainLayout/>
                        </PrivateRoute>
                }

                {
                    (props.result !== null || Utils.isConnected()) &&
                    props.location.pathname.includes(route.user_admin_url[1].link) ?
                        <UserRoute path="/my-space">
                            <UserLayout/>
                        </UserRoute> :
                        <PrivateRoute path="/">
                            <MainLayout/>
                        </PrivateRoute>
                } */}
                {
                    (props.result !== null || Utils.isConnected()) &&
                    props.location.pathname.includes(route.admin_url[1].link) ?
                        <AdminRoute path="/admin/:page">
                            <AdminLayout/>
                        </AdminRoute> :
                        <PrivateRoute path="/:page">
                            <MainLayout/>
                        </PrivateRoute>
                }

                {
                    (props.result !== null || Utils.isConnected()) &&
                    props.location.pathname.includes(route.admin_url[1].link) ?
                        <AdminRoute path="/admin">
                            <AdminLayout/>
                        </AdminRoute> :
                        <PrivateRoute path="/">
                            <MainLayout/>
                        </PrivateRoute>
                }

            </Switch>
            <ToastContainer/>
        </div>
    );
}

const mapstateToProps = state => ({
    result: state.signInReducer.result
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(mapstateToProps, mapDispatchToProps)(App));


