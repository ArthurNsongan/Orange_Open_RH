import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import {bindActionCreators} from "redux";
import './style.css';
import {getAdminPendingValidationAction, getAdminPendingValidationReset} from "../../redux/api/ValidationApi";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import * as moment from "moment";
import * as Utils from "../../utils";
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import {Constant} from '../../config/Constant';
import {getUserNotificationAction} from "../../redux/api/NotificationAPi";
import axios from "axios";
import {Config} from "../../config/ServerConfig";

let route = require('../../utils/route');

function NotificationDropdown(props) {
    moment.locale("fr");
    const {
        resultGetPubToValidate,
        ...rest
    } = props;
    console.log(props);
    const {i18n, t} = useTranslation();
    useEffect(() => {
        if (Utils.isConnected()) {
            if (Utils.isAdmin())
                props.getAdminPendingValidationAction();
            else
                props.getUserNotificationAction(Utils.getUserConnected().userId);
        }
    }, []);

    const renderUrlToRedirect = (categoryID) => {
        if (Utils.isAdmin()) {
            switch (categoryID) {
                case Constant.faqID:
                    return route.faq.admin_faq;
            }
        } else {
            switch (categoryID) {
                case Constant.faqID:
                    return route.faq.root;
            }
        }
    };

    const updateUserNotification = (id) => {
        axios({
            url: `${Config.updateNotificationUrl}/${id}`,
            method: 'PUT'
        }).then((response) => {
            console.warn("UPDATE NOTIFICATION SUCCESS", response)
        })
            .catch((error) => {
                console.warn("UPDATE NOTIFICATION ERROR", error)
            })
    }

    return (
        <li className="nav-item dropdown notification-dropdown ml-auto" id="notification-dropdown">
            <a href="#" className="nav-link nav-icon icon-Notification-Bell" id="notification-link"
               data-toggle="dropdown" role="button"
               aria-haspopup="true" aria-expanded="false" style={{transform: 'scale(1.5)'}}>
                {
                    resultGetPubToValidate !== null &&
                    resultGetPubToValidate.length > 0 &&
                    <span className="badge badge-primary badge-counter"
                          style={{
                              right: " -.1125rem",
                              top: ".125rem"
                          }}>{resultGetPubToValidate.length}</span>
                }
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right animated--grow-in shadow-lg mb-3"
                 style={{maxWidth: '18rem'}} id="notification-container">
                <div className="o-layer-arrow">
                    <div style={{left: "143.562px"}}></div>
                </div>
                <div className="card-header">
                </div>
                <div className="card-body">
                    <h6 className="dropdown-header">
                        {t('notification.title')}
                    </h6>
                    {
                        resultGetPubToValidate !== null &&
                        resultGetPubToValidate.length === 0 &&
                        <NavLink
                            activeClassName=""
                            to={{
                                pathname: '#'
                            }}
                            role="button"
                            className="dropdown-item d-flex align-items-center">
                            <div className="mr-3">
                                <div className="icon-circle bg-primary">
                                    <i className="fas fa-file-alt text-white"></i>
                                </div>
                            </div>
                            <div>
                                <span className="font-weight-bold">{t('notification.no_notification')}</span>
                            </div>
                        </NavLink>
                    }
                    {
                        resultGetPubToValidate !== null &&
                        resultGetPubToValidate.map((notification, index) => (
                            Utils.isAdmin() ?
                                index < Constant.notificationLimit &&
                                <NavLink
                                    activeClassName=""
                                    key={index}
                                    to={{
                                        pathname: `${renderUrlToRedirect(notification.rhContentCategoryId)}`
                                    }}
                                    onClick={() => updateUserNotification(notification.notificationId)}
                                    role="button"
                                    className="dropdown-item d-flex align-items-center"
                                >
                                    <div className="mr-3">
                                        <div className="icon-circle bg-primary">
                                            <i className="fas fa-file-alt text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="small text-gray-500">{moment(notification.rhContentDateCeated).fromNow()}</div>
                                        <span
                                            className="font-weight-bold">{Utils.cutString(notification.rhContentTitle, 20)}</span>
                                    </div>
                                </NavLink> :
                                index < Constant.notificationLimit &&
                                <NavLink
                                    activeClassName=""
                                    key={index}
                                    to={{
                                        pathname: `${renderUrlToRedirect(notification.rhContentValidation.rhContent.rhContentCategoryId)}`
                                    }}
                                    onClick={() => updateUserNotification(notification.notificationId)}
                                    role="button"
                                    className="dropdown-item d-flex align-items-center"
                                    onClick={() => {
                                        console.log('Click')
                                    }}>
                                    <div className="mr-3">
                                        <div className="icon-circle bg-primary">
                                            <i className="fas fa-file-alt text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="small text-gray-500">{moment(notification.rhContentValidation.rhContent.rhContentDateCeated).fromNow()}</div>
                                        <span
                                            className="font-weight-bold">{Utils.cutString(notification.rhContentValidation.rhContent.rhContentTitle, 20)}</span>
                                    </div>
                                </NavLink>

                        ))
                    }
                    <a className="btn btn-primary text-gray-500 align-items-center" style={{display: "block"}}
                       href="#">{t('notification.show_all')}</a>
                </div>
            </div>

        </li>
    );
};

NotificationDropdown.propTypes = {};

NotificationDropdown.defaultProps = {};


const mapstateToProps = state => ({
    loadingGetPubToValidate: state.getAdminPublicationToValidateReducer.loading,
    resultGetPubToValidate: state.getAdminPublicationToValidateReducer.result,
    errorGetPubToValidate: state.getAdminPublicationToValidateReducer.error,

})

const mapDispatchToProps = dispatch => bindActionCreators({
    getAdminPendingValidationAction,
    getAdminPendingValidationReset,

    getUserNotificationAction
}, dispatch);

export default connect(mapstateToProps, mapDispatchToProps)(NotificationDropdown);
