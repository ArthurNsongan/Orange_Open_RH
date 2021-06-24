import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import Button from "../Button";
import {FakeData} from "../../fakeData";
import {bindActionCreators} from 'redux';
import {getAllDomaineAction, getAllDomaineReset, getDomaineByPostAction} from "../../redux/api/DomaineApi";
import {connect} from "react-redux";
import Loader from "../Loader";
import {useParams, withRouter, NavLink} from "react-router-dom";
import './style.css';
import {useTranslation} from "react-i18next";

let route = require('../../utils/route');

function NavigationLight(props) {

    const {t} = useTranslation();
    let {id, page, domaine, category} = useParams();
    const {
        menus,
        menuLink,
        categoryId,
        additionnalClasses,
        ...rest
    } = props;
    const matchWorkaround = (pathname) => (isMatch, location) => isMatch || location.pathname.includes(pathname);

    useEffect(() => {
        props.getDomaineByPostAction(categoryId);
    }, []);

    useEffect(() => {
        props.getDomaineByPostAction(category);
    }, [props.location.pathname]);

    console.log("Result", props.result);
    return (
        <>
            {
                props.loading ?
                    <div className={`o-nav-local navbar-light ${additionnalClasses && "light-nav"}`}>
                        <nav role="navigation" className="container" aria-label="News categories navigation">
                            <Loader/>
                        </nav>
                    </div> :

                    props.result !== null &&

                    <div className={`o-nav-local navbar-light ${additionnalClasses && "light-nav"}`}>
                        <nav role="navigation" className="container" aria-label="News categories navigation">
                            <ul className="nav">
                                <li><NavLink to={{
                                    pathname: `${menuLink}`
                                }}
                                             className="nav-link">
                                    {t('common.general')}
                                </NavLink>
                                </li>
                                {
                                    props.result.map((domaine, index) => (
                                        <li className={`nav-item`} key={`menu-${index}`}>
                                            <NavLink to={`${menuLink}/${domaine.rhContentDomaineId}`}
                                                     isActive={matchWorkaround(domaine.rhContentDomaineId)}
                                                     className="nav-link" exact>
                                                {domaine.rhContentDomaineName}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
            }
        </>


    );
}

const mapStateToProps = state => ({
    loading: state.getDomaineByPostReducer.loading,
    result: state.getDomaineByPostReducer.result,
    error: state.getDomaineByPostReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getDomaineByPostAction,

}, dispatch);

NavigationLight.propTypes = {
    menus: PropTypes.array,
    menuLink: PropTypes.string,
    categoryId: PropTypes.number,
    additionnalClasses: PropTypes.bool,
};

NavigationLight.defaultProps = {
    menus: [],
    categoryId: 1,
    additionnalClasses: false,
    menuLink: route.post.root
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationLight));
