import React from 'react';
import './style.scss';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faComment,
    faFileSignature,
    faNewspaper,
    faQuestionCircle,
    faSpellCheck,
    faTachometerAlt,
    faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash';
import {Constant} from "../../config/Constant";
import * as Utils from "../../utils"

let route = require('../../utils/route');

function Sidebar(props) {

    const {result} = props;
    const {t} = useTranslation();
    const matchWorkaround = (pathname) => (isMatch, location) => {
        let currentPathName = _.split(location.pathname, "/", 3)[2];
        let currentPathNameInArray = _.split(pathname, "/", 3)[2];
        return isMatch || location.pathname.includes(pathname)
    };

    const renderIcon = (icon) => {
        switch (icon) {
            case 'tachometer-alt':
                return faTachometerAlt;
            case 'file-signature':
                return faFileSignature;
            case 'file-alt':
                return faFileAlt;
            case 'newspaper':
                return faNewspaper;
            case 'comment':
                return faComment;
            case 'question-circle':
                return faQuestionCircle;
            case 'spell-check':
                return faSpellCheck;
            default:
                return faTachometerAlt;
        }
    }
    return (
        <>
            <nav id="sidebarMenu" role="navigation" className="col-2 d-md-block bg-light sidebar collapse">
                <div className="sidebar-sticky pt-3">
                    <ul className="nav flex-column">
                        {
                            Utils.isConnected() ?
                                route.admin_space.map((menu, index) => (
                                    <li className="nav-item" key={index}>
                                        <hr className="sidebar-divider my-0"/>
                                        <NavLink
                                            to={{
                                                pathname: menu.link
                                            }}
                                            className="nav-link"
                                            /*isActive={matchWorkaround(menu.link)}*/
                                            activeClassName=""
                                            activeStyle={{
                                                color: 'var(--orange)'
                                            }}
                                            exact>
                                            <FontAwesomeIcon icon={renderIcon(menu.icon)} className="feather"/>
                                            {t(menu.title)}
                                        </NavLink>
                                        <hr className="sidebar-divider my-0"/>
                                    </li>
                                ))
                                : null
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

const mapstateToProps = state => ({
    result: state.signInReducer.result
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapstateToProps, mapDispatchToProps)(Sidebar);

