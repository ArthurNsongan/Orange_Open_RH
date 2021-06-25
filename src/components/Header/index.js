import React, {useEffect} from 'react';
import {Images} from "../../config/Images";
import {useTranslation} from "react-i18next";
import {NavLink, withRouter, useParams} from "react-router-dom";
import {Link} from "react-router-dom";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LanguageSwitcher from "../LanguageSwitcher";
import ProfileDropdown from "../ProfileDropdown";
import NotificationDropdown from "../NotificationDropdown";
import * as Utils from '../../utils';
import {getAllDomaineAction, getDomaineByPostAction} from "../../redux/api/DomaineApi";
import {getAllCategoryAction, getAllCategoryReset} from "../../redux/api/CategoryApi";
import {Constant} from "../../config/Constant";
import {getAllPostsFrontEndAction, getAllPostsByCategoryAction, getAllPostsRHAction } from "../../redux/api/PostsApi";
import './style.css'


let route = require('../../utils/route');
function openTab(data) {
   // window.open(data);
    //window.location.href = "http://www.w3schools.com";
    <a href="">salut</a>
  }
  
function HeaderAdmin(props) {
    const mystyle = {
        color: "DodgerBlue",
        backgroundColor: "#ccc",
        padding: "10px",
        fontFamily: "Arial"
      };
      const mystyle2 = {
        color: "#000"       
      };

    const {result} = props;
    const {t} = useTranslation();
    const {pathname} = props.location;
    const matchWorkaround = (pathname) => (isMatch, location) => isMatch || location.pathname.includes(pathname);
    const matchWorkForDashboard = (match, location) => {
        return false;
    };

    useEffect(() => {
        props.getAllDomaineAction();
        props.getAllCategoryAction();
        // props.getAllPostsFrontEndAction();
        // props.getAllPostsRHAction();
        props.getAllPostsByCategoryAction();
        console.log("getAllPosts - Start", props.resultGetCategory);
        // if (props.resultGetAllPostsRH === null)
        props.getAllPostsRHAction();
    }, []);

    const NavUser = () => (
        <nav role="navigation" className="navbar navbar-dark navbar-expand-md" aria-label="Main navigation">
            {console.log(result !== null || Utils.isConnected())}
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={Images.logo} className="d-inline-block align-bottom ml-0 mr-1"
                         alt="Back to homepage" title="Back to homepage" width="50" height="50" loading="lazy"/>
                    {/* <span className="ml-2 align-self-end">
                            <span className="sr-only">Orange </span>
                            {t('app.name')} <br/>
                            <small>{t('app.slogan')}</small>
                        </span>*/}

                    <img src={Images.openRH1} className="w-100px d-inline-block align-bottom ml-1 mr-1"
                        alt={t("app.name")} title={t("app.name")} loading="lazy"/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#collapsing-navbar2" aria-controls="collapsing-navbar2" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse justify-content-between collapse" id="mega-menu">
                    {
                        (result !== null || Utils.isConnected()) &&
                        <>
                            <ul className="navbar-nav mt-0">
                                <li className="nav-item">
                                    <NavLink
                                        to={`${route.home.root}`}
                                        className="nav-link align-self-start"
                                        activeClassName=""
                                        activeStyle={{
                                            color: 'var(--orange)'
                                        }}
                                        exact>
                                        {t(route.home.title)}
                                    </NavLink>
                                </li>
                                {
                                    props.resultGetCategory !== null &&
                                    props.resultGetCategory.filter(category => category.rhContentCategoryState)
                                        .map((menu, index) => (
                                            <li className="nav-item" key={`menu-${index}`}>
                                                <a className="nav-link" href={`#mega-level-${index}-collapse`}
                                                   data-toggle="collapse">{t(menu.rhContentCategoryName)}</a>
                                                <div className="mega-menu-panel collapse" style={mystyle}
                                                     id={`mega-level-${index}-collapse`}>
                                                    <div className="container-lg">
                                                       {/*  <NavLink to={{
                                                            pathname: `${route.post.root}/${menu.rhContentCategoryId}`
                                                        }} className="nav-link all"
                                                                 exact>
                                                            {t("common.see_all_post")}
                                                        </NavLink> */}
                                                        <a className="nav-link close ml-auto"
                                                           data-toggle="collapse"
                                                           href={`#mega-level-${index}-collapse`}
                                                           aria-expanded={false}
                                                           aria-controls={`mega-level-${index}-collapse`}
                                                           title={t("common.close_menu")}>
                                                                    <span
                                                                        className="sr-only">{t("common.close_menu")}</span>
                                                        </a>
                                                    </div>
                                                    <div className="container-lg">
                                                        <ul className="navbar-nav">
                                                            {
                                                                // props.resultGetDomaine !== null &&
                                                                // props.resultGetDomaine.filter(domaine => (domaine.rhContentCategoryId === menu.rhContentCategoryId) && (domaine.rhContentDomaineState))
                                                                    props.resultGetAllPostsRH !== null &&
                                                                    props.resultGetAllPostsRH
                                                                    .filter(onePost => (onePost.rhContentDomaine.rhContentCategoryId === menu.rhContentCategoryId) && onePost.rhContentDomaine.rhContentDomaineState)
                                                                    .map((post) => (
                                                                        <li className="nav-item col">
                                                                            {
                                                                            console.log("Mes test menu",post)
                                                                            }
                                                                            { post.rhContentDomaine.rhContentCategoryId !== null ?
                                                                        /*<NavLink
                                                                        to={`${domaineByPost.domaineLink}`}
                                                                        className="nav-link"
                                                                        style={mystyle2}
                                                                        exact>
                                                                        {domaineByPost.rhContentDomaineName} </NavLink>*/
                                                                        //<a className="Mylink" href={post.domaineLink}>{post.rhContentDomaineName}</a>
                                                                        <NavLink
                                                                            to={{
                                                                                pathname: `${route.post.root}/${post.rhContentDomaine.rhContentCategoryId}/${post.rhContentDomaineId}/${post.rhContentId}`,
                                                                                post
                                                                            }}
                                                                            className="Mylink">
                                                                            { post.rhContentTitle }
                                                                        </NavLink>
                                                                         :
                                                                           <NavLink
                                                                            to={`${route.post.root}/${menu.rhContentCategoryId}/${post.rhContentDomaineId}`}
                                                                            className="Mylink"
                                                                          //  style={mystyle2}
                                                                          //  onclick={openTab(domaineByPost.domaineLink)}
                                                                            exact>
                                                                            {post.rhContentDomaineName}
                                                                            </NavLink>
                                                                            
                                                                         //   openTab(domaineByPost.domaineLink)
                                                                        }

                                                                           {/*  <NavLink
                                                                                to={`${route.post.root}/${menu.rhContentCategoryId}/${domaineByPost.rhContentDomaineId}`}
                                                                                className="nav-link"
                                                                                exact>
                                                                                {domaineByPost.rhContentDomaineName}
                                                                            </NavLink> */}
                                                                            <ul className="navbar-nav">
                                                                                <li className="nav-item"><a
                                                                                    className="nav-link back"
                                                                                    href="#">{t('common.previous')}</a>
                                                                                </li>
                                                                                <li className="nav-item"><span
                                                                                    className="nav-heading text-primary">{post.rhContentDomaineName}</span>
                                                                                </li>
                                                                                {/*
                                                                                    props.resultGetAllPosts !== null &&
                                                                                    props.resultGetAllPosts.filter((post) => post.rhContentState && post.rhContentDomaineId === domaineByPost.rhContentDomaineId)
                                                                                        .slice(0, 2)
                                                                                        .map((post) => (
                                                                                            <li className="nav-item">
                                                                                                <NavLink
                                                                                                    to={`${route.post.root}/${menu.rhContentCategoryId}/${domaineByPost.rhContentDomaineId}/${post.rhContentId}`}
                                                                                                    className="nav-link"
                                                                                                    style={mystyle2}
                                                                                                    exact>
                                                                                                    {post.rhContentTitle}
                                                                                                </NavLink>
                                                                                            </li>
                                                                                        ))
                                                                                        */}
                                                                            </ul>
                                                                        </li>
                                                                    ))
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                }
                                {props.resultGetCategory !== null &&
                                props.resultGetCategory.filter(category => category.rhContentCategoryState).length <= 4 ?
                                    route.menu_header_user.map((menu, index) => (
                                        <li className="nav-item" key={`menu-${index}`}>
                                            <NavLink to={menu.link} className="nav-link"
                                                     isActive={matchWorkaround(menu.link)}
                                                     activeClassName=""
                                                     activeStyle={{
                                                         color: 'var(--orange)'
                                                     }}
                                                     exact>
                                                {t(menu.title)}
                                            </NavLink>
                                        </li>
                                    )) :
                                    <li className="nav-item dropdown align-self-start">
                                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"
                                           role="button" id="dropdownMenu">{t("navigation.other")}</a>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                                            {
                                                route.menu_header_user.map((menuItem) => (
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
                                }
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a href="#" className="nav-link nav-icon svg-search">
                                        <span className="sr-only">open search bar</span>
                                    </a>
                                </li>
                            </ul>
                        </>
                    }
                </div>
            </div>
        </nav>
    );


    return (
        <header role="banner" id="demo-navbar">
            <nav role="navigation" className="navbar navbar-light bg-white navbar-expand-md supra"
                 aria-label="Complementary navigation">
                <div className="container">
                    <ul className="navbar-nav">
                        {(result !== null || Utils.isConnected()) &&
                        Utils.isAdmin() ?
                            route.admin_url.map((menu, index) => (
                                <li className="nav-item" key={index}>
                                    <NavLink to={menu.link} className="nav-link"
                                             isActive={matchWorkForDashboard}
                                             exact>
                                        {t(menu.title)}
                                    </NavLink>
                                </li>
                            )) :
                            route.user_admin_url.map((menu, index) => (
                                <li className="nav-item" key={index}>
                                    <NavLink to={menu.link} className="nav-link"
                                             isActive={matchWorkForDashboard}
                                             exact>
                                        {t(menu.title)}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {
                            (result !== null || Utils.isConnected()) &&
                            <>
                                <NotificationDropdown/>
                                <ProfileDropdown/>
                            </>
                        }

                        <LanguageSwitcher/>
                    </ul>
                </div>
            </nav>
            <NavUser/>

        </header>
    )
}

const mapstateToProps = state => ({
    result: state.signInReducer.result,

    loadingGetAllPosts: state.getAllPostsReducer.loading,
    resultGetAllPosts: state.getAllPostsReducer.result,
    errorGetAllPosts: state.getAllPostsReducer.error,

    loadingGetAllPostsRH: state.getAllPostsRhReducer.loading,
    resultGetAllPostsRH: state.getAllPostsRhReducer.result,
    errorGetAllPostsRH: state.getAllPostsRhReducer.error,

    loadingGetAllCategoryPosts: state.getAllPostsByCategoryReducer.loading,
    resultGetAllCategoryPosts: state.getAllPostsByCategoryReducer.result,
    errorGetAllCategoryPosts: state.getAllPostsByCategoryReducer.error,

    loadingGetDomaine: state.getAllDomainesReducer.loading,
    resultGetDomaine: state.getAllDomainesReducer.result,
    errorGetDomaine: state.getAllDomainesReducer.error,

    loadingGetCategory: state.getAllCategoryReducer.loading,
    resultGetCategory: state.getAllCategoryReducer.result,
    errorGetCategory: state.getAllCategoryReducer.error,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllDomaineAction,
    getAllPostsByCategoryAction,    
    getAllPostsFrontEndAction,
    getAllCategoryAction,
    getAllPostsRHAction,
    getAllCategoryReset
}, dispatch);

export default withRouter(connect(mapstateToProps, mapDispatchToProps)(HeaderAdmin));
