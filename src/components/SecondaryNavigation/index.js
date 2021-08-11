import React, {useEffect} from 'react';
import "./style.css";
import {useTranslation} from "react-i18next";
import {NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Constant} from "../../config/Constant";

let route = require('../../utils/route');

function SecondaryNavigation(props) {
    const {menuLink, data} = props;
    const {t} = useTranslation();

    useEffect(() => {
        data !== null &&
        window.$('.marquee-vertical').marquee({delay: 5000, direction: 'vertical'});
    });

    useEffect(() => {
        data !== null &&
        window.$('.marquee-vertical').marquee({delay: 5000, direction: 'vertical'});
    }, [props.location.pathname]);

    return (
        <header id="secondary_nav" className="bg-dark mb-4 overflow-hidden">
            <div className="container-main">
                <div className="main-container ellispsis-supported row">
                    <div className="col-2" style={{padding: 0}}>
                        <ul className="menu clearfix">
                            <li className="breadcrumb">
                                <span>{t('add_post.featured')}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-8">
                        <ul className="marquee-vertical">
                            {
                                data !== null ?
                                    data.filter( item => item.rhContentPostType === Constant.publicationID).map((post, index) => (
                                        <li key={index}>
                                            <NavLink to={`${menuLink}/${post.rhContentDomaine.rhContentCategoryId}/${post.rhContentDomaineId}/${post.rhContentId}`} exact>
                                                {post.rhContentTitle}
                                            </NavLink>
                                        </li>
                                    )) : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

SecondaryNavigation.propTypes = {
    menuLink: PropTypes.string,
    data: PropTypes.array
};

SecondaryNavigation.defaultProps = {
    menuLink: route.post.root,
    data: []
};

export default withRouter(connect(null, null)(SecondaryNavigation));

