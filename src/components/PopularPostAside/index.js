import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import _ from 'lodash';
import "moment/locale/fr";
import { getAllPostsRHAction } from '../../redux/api/PostsApi';

function PopularPostAside(props) {

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
                        data-toggle="tab">Populaires</a>
                </li>
            </ul>
            <div className="tab-content">
                { props.resultRH !== null ?
                        <div className="d-flex flex-column">
                            <ul class="d-block">
                            { console.log(props.resultRH)}
                        {
                            props.resultRH
                            .sort( (a,b) => ( a.viewNumber < b.viewNumber ? 1 : -1 ) )
                            .slice(0, 5)
                            .map( (item, index) => (
                                <li class="nav-item">
                                    <a href={`${route.post.root}/${item.rhContentDomaine.rhContentCategoryId}/${item.rhContentDomaineId}/${item.rhContentId}`}>{ item.rhContentTitle }</a>
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

PopularPostAside.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    posts: PropTypes.array
};

PopularPostAside.defaultProps = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PopularPostAside));