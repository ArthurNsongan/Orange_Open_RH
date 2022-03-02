import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {useEffect} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import _ from 'lodash';
import { getAllPostsRHAction } from '../../redux/api/PostsApi';
import moment from 'moment';

function RecentPostAside(props) {

    let route = require('../../utils/route');

    const {
        style,
        onClick,
        children,
        posts,
        ...rest
    } = props;

    const {t} = useTranslation();

    useEffect(() => {
        if(props.resultRH == null) {
            props.getAllPostsRHAction();
        }
    }, [ props ])

    return (
        <div {...rest}>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" key={`categories-${1}`}>
                    <a className={`nav-link active`}
                        href={`#tab0`}
                        data-toggle="tab">{t('navigation.recent_posts')}</a>
                </li>
            </ul>
            <div className="tab-content">
                { props.resultRH !== null ?
                        <div className="d-flex flex-column">
                            <ul class="d-block">
                            { console.log(props.resultRH)}
                        {
                            props.resultRH
                            .filter(item => item.rhContentState )
                            .sort( (a,b) => ( moment(a.rhContentDatePublish).isBefore(b.rhContentDatePublish) ? 1 : -1 ) )
                            .slice(0, 5)
                            .map( (item, index) => (
                                <li class="nav-item">
                                    <NavLink to={`${route.post.root}/${item.rhContentDomaine.rhContentCategoryId}/${item.rhContentDomaineId}/${item.rhContentId}`}>{ item.rhContentTitle }</NavLink>
                                </li>
                            ))
                        }
                            </ul>
                        </div>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

RecentPostAside.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    posts: PropTypes.array
};

RecentPostAside.defaultProps = {
    style: {},
    onClick: () => {

    },
    posts: []
};


const mapStateToProps = state => ({

    loadingRH: state.getAllPostsRhReducer.loading,
    resultRH: state.getAllPostsRhReducer.result,
    errorRH: state.getAllPostsRhReducer.error,

});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPostsRHAction,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecentPostAside));