import React, {useEffect} from 'react';
import {Images} from "../../config/Images";
import {useTranslation} from "react-i18next";
import {NavLink, withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LanguageSwitcher from "../LanguageSwitcher";
import ProfileDropdown from "../ProfileDropdown";
import NotificationDropdown from "../NotificationDropdown";
import * as Utils from "../../utils";
import './style.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faComment,
    faFileAlt,
    faFileSignature,
    faNewspaper,
    faQuestionCircle, faSpellCheck,
    faTachometerAlt,
    faThLarge,
    faHome
} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";

let route = require('../../utils/route');

function HeaderAdmin(props) {
    console.log("URL", props.location);
    const {result} = props;
    const {t} = useTranslation();
    const {pathname} = props.location;
    const matchWorkaround = (pathname) => (isMatch, location) => isMatch || location.pathname.includes(pathname);
    const matchWorkForHome = (match, location) => {
        return route.menu_header_admin.map((menu, index) => {
            if (location.pathname.includes(menu.link))
                return true;
            else
                return false;
        });
    };

    useEffect(() => {
/*        window.$(".dropdown-toggle").initDropdownToggleHover();
        window.$(".dropdown-toggle").initDropdownToggleHover();*/
    });

    const matchWorkForDashboard = (match, location) => {
        return location.pathname.includes(route.admin_space[0].link);
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
            case 'th-large':
                return faThLarge;
            case 'homepage':
                return faHome;
            default:
                return faTachometerAlt;
        }
    }

    const NavAdmin = () => (
        <>
            <nav className="navbar navbar-dark navbar-expand-md" role="navigation">
                <div className="container-fluid flex-sm-wrap justify-content-start">
                    <a className="navbar-brand" href="#">
                        <img src={Images.logo} className="d-inline-block align-bottom mr-1"
                             loading="lazy"
                             alt="Back to homepage" title="Back to homepage" width="50" height="50" loading="lazy"/>
                        {/* <span className="h1 mb-0">{t('app.name')}</span> */}
                        <img src={Images.openRH1} className="w-100px d-inline-block align-bottom mr-1"
                            loading="lazy"
                            alt={t("app.name")} title={t("app.name")} loading="lazy"/>
                        
                    </a>
                    {/* <button className="navbar-toggler d-sm-block d-md-none mb-md-0 mt-md-auto ml-auto ml-md-3 collapsed"
                            type="button" data-toggle="collapse" data-target="#collapsing-navbar11"
                            aria-controls="collapsing-navbar11" aria-expanded="false" aria-label="Toggle navigation">
                        <span aria-hidden="true" className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="navbar-nav d-none d-md-flex ml-auto">
                        <li className="nav-item">
                            <a href="#" className="nav-link nav-icon svg-search">
                                <span className="sr-only">Search bar</span>
                            </a>
                        </li>
                    </ul> */}
                </div>
            </nav>

            <div className="navbar navbar-dark navbar-expand-md bg-dark flex-sm-wrap p-0">
                <hr className="w-100 m-0 d-none d-md-block border-700"/>
                <div className="container-fluid border-bottom">
                    <div className="navbar-collapse collapse" id="collapsing-navbar11">
                        <ul className="navbar-nav">
                            {
                                Utils.isConnected() ?
                                    route.admin_space.map((menu, index) => (
                                        menu.hasOwnProperty('sub_menu') ?
                                            <li className="nav-item dropdown" key={`menu-${index}`}>
                                                <a href="#"
                                                         className="nav-link dropdown-toggle" data-toggle="dropdown"
                                                   role="button" id="dropdownMenu">
                                                    <FontAwesomeIcon icon={renderIcon(menu.icon)}
                                                                     className="feather mr-1"/>
                                                    {t(menu.title)}
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                                                    {
                                                        menu.sub_menu.map((menuItem) => (
                                                            <NavLink to={menuItem.link} className="dropdown-item"
                                                                     aria-expanded
                                                                     isActive={matchWorkaround(menuItem.link)}
                                                                     activeClassName=""
                                                                     activeStyle={{
                                                                         color: 'var(--orange)'
                                                                     }}
                                                                     exact>
                                                                {t(menuItem.title)}
                                                            </NavLink>
                                                        ))
                                                    }
                                                </div>
                                            </li>
                                            :
                                            <li className="nav-item" key={index}>
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
                                                    <FontAwesomeIcon icon={renderIcon(menu.icon)}
                                                                     className="feather mr-1"/>
                                                    {t(menu.title)}
                                                </NavLink>
                                            </li>
                                    ))
                                    : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <header role="banner fixed-top" id="admin-navbar">
            <nav role="navigation" className="navbar navbar-light bg-white navbar-expand-md supra"
                 aria-label="Complementary navigation">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        {
                            (result !== null || Utils.isConnected()) &&
                            Utils.isAdmin() ?
                                route.admin_url.map((menu, index) => (
                                    <li className="nav-item" key={index}>
                                        <NavLink to={menu.link} className="nav-link"
                                                 isActive={index === 0 ? false : matchWorkForDashboard}
                                                 exact>
                                            {t(menu.title)}
                                        </NavLink>
                                    </li>
                                )) :
                                route.user_admin_url.map((menu, index) => (
                                    <li className="nav-item" key={index}>
                                        <NavLink to={menu.link} className="nav-link"
                                                 isActive={index === 0 ? false : matchWorkForDashboard}
                                                 exact>
                                            {t(menu.title)}
                                        </NavLink>
                                    </li>
                                ))
                        }
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <NotificationDropdown/>
                        <ProfileDropdown/>
                        <LanguageSwitcher/>
                    </ul>
                </div>
            </nav>
            <NavAdmin/>

        </header>
    )
}

const mapstateToProps = state => ({
    result: state.signInReducer.result,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(mapstateToProps, mapDispatchToProps)(HeaderAdmin));
