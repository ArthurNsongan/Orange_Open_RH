import React from "react";
import {Route, Switch, withRouter} from 'react-router-dom';
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./screens/Home";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./layout/AdminLayout";
import Admin from "./screens/Admin";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Utils from "./utils/index";
import 'react-dropzone-uploader/dist/styles.css'
import "./App.scss";
import UserLayout from "./layout/UserLayout";
import UserRoute from "./components/UserRoute";
import UnderConstruction from "./screens/CommonScreen/UnderConstruction";

let route = require('./utils/route');

function App(props) {
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


