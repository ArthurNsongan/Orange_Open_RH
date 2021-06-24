import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

let route = require('../../utils/route');

class PrivateRoute extends Component {
    render() {
        let {children, result, path, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={(props) =>
                    (result !== null || localStorage.getItem('USER')) ? (
                        React.cloneElement(children, {props})
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
)(PrivateRoute);
