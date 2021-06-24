import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from "lodash";
import {Constant} from "../../config/Constant";
import * as Utils from "../../utils";

let route = require('../../utils/route');

class AdminRoute extends Component {
    render() {
        let {children, result, ...rest} = this.props;

        return (
            <Route
                {...rest}
                render={(props) =>
                    (result !== null || Utils.isConnected()) ?
                        Utils.isAdmin() ?
                            (React.cloneElement(children, {props})) : (
                                <Redirect
                                    exact
                                    to={route.home.root}
                                />
                            ) : (
                            <Redirect
                                exact
                                to={route.auth.sign_in}
                            />
                        )
                }
            />
        )
    }
}

const mapstateToProps = state => ({
    result: state.signInReducer.result
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapstateToProps, mapDispatchToProps
)(AdminRoute);
