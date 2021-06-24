import React, {useEffect, useState, useCallback} from 'react';
import {withRouter, useParams, NavLink} from 'react-router-dom';
import NavigationLight from "../../../components/NavigationLight";
import {FakeData} from "../../../fakeData";
import {useTranslation} from "react-i18next";
import PostWidget from "../../../components/PostWidget";
import Comments from "../../../components/Comments";
import CommentField from "../../../components/CommentField";
import AboutOpenRHWidget from "../../../components/AboutOpenRHWidget";
import ArchiveWidget from "../../../components/ArchiveWidget";
import {getPostByIdAction, getPostByIdReset} from "../../../redux/api/PostsApi";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import Interweave from "interweave";
import "./style.css";
import * as moment from "moment";
import "moment/locale/fr";
import Loader from "../../../components/Loader";
import {Helmet} from "react-helmet";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-solid-svg-icons';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faFolder} from '@fortawesome/free-solid-svg-icons';
import {getAllDomaineAction} from "../../../redux/api/DomaineApi";
import _ from 'lodash';
import {postFaqAction} from "../../../redux/api/FaqApi";
import {Config} from "../../../config/ServerConfig";
import SocialShare from "../../../components/SocialShare";

let route = require('../../../utils/route');

function BlogDetail(props) {
    moment.locale("fr");
    const {t} = useTranslation();
    let {id, page, domaine} = useParams();
    const [post, setPost] = useState({});
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        props.getAllDomaineAction();
        props.getPostByIdAction(id);
        /*        if (props.location.post === undefined) {
                    props.getAllDomaineAction();
                    props.getPostByIdAction(id);
                } else
                    setPost(props.location.post);*/

    }, []);
    useEffect(()=> {
        window.$(".img-post").initImageNotLoadPlaceHolder();
    });

    const renderPost = (post) => (
        <>
            <div className="mt-3">
                <div className="d-flex justify-content-between p-2">
                    <div className="mb-1 text-muted mr-2 pt-2">
                        <FontAwesomeIcon icon={faComment} className="mr-1"/>
                       
                       {post.comments.length} commentaires
                    </div>

                    <div className="mb-1 text-muted mr-2 pt-2">
                        <FontAwesomeIcon icon={faEye} className="mr-1"/>
                        2 vues
                    </div>

                    <div>
                        <SocialShare/>
                    </div>
                </div>
                <hr/>
                <div className="mt-4">
                    <Interweave content={post.rhContentDescription}/>
                </div>
            </div>

        </>
    );

    const renderHeader = (post) => {
        const domaine = props.resultGetDomaine.filter(domaine => domaine.rhContentDomaineId === post.rhContentDomaineId)[0];
        console.log("POST", post.user);
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 post-title-block">

                <h1 className="text-center text-white">{post.rhContentTitle}</h1>
                <ul className="list-inline d-flex justify-content-center text-center text-white">
                    <li>
                        <FontAwesomeIcon icon={faFolder} className="mr-1"/>
                        <NavLink
                            to={{
                                pathname: `${route.blog.root}/${post.rhContentDomaineId}/`,
                                post
                            }}
                            role="button"
                            className="text-white font-weight-bold">
                            {!_.isNil(domaine) && domaine.rhContentDomaineName}
                        </NavLink> |&nbsp;&nbsp;&nbsp;
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faUser} className="mr-1"/>
                        {post.user.userName} |&nbsp;&nbsp;</li>
                    <li className="mb-1 mr-2">
                        <span className="icon icon-calendar-day mr-1" aria-hidden="true"></span>
                        {moment(post.rhContentDatePublish).format("lll")}
                    </li>
                </ul>
            </div>
        );
    };

    useEffect(() => {
        if (props.result !== null) {
            setPost(props.result);
        }
    }, [props]);

    console.log("rh content domaine", props.resultGetDomaine);

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${post.rhContentTitle}`}</title>
            </Helmet>

            <section className="banner-section"
                     style={{backgroundImage: `url(${!_.isNil(post.rhContentPrincipalLink) ? (Config.imageFolder + post.rhContentPrincipalLink) : "https://picsum.photos/1920/400"})`}}>
            </section>
            <div className="container">
                <div className="row">
                    {
                        props.location.post === undefined ?
                            props.loading ?
                                <Loader/>
                                : (props.result !== null && props.resultGetDomaine) ?
                                renderHeader(props.result) :
                                null :
                            null
                    }
                </div>
            </div>

            <div className="mb-5" style={{marginTop: "120px"}}>
                {/*
                <NavigationLight menus={FakeData.posts_menu} menuLink={route.post.root}/>
*/}

                <section className="container">
                    <div className="row">
                        {
                    console.log("data",post)

                        }

                        <div className="col-12 col-lg-8" id="post">
                            {
                                props.location.post === undefined ?
                                    props.loading ?
                                        <Loader/>
                                        : props.result !== null ?
                                        renderPost(props.result) :
                                        null :
                                    renderPost(props.result)
                            }

                            <div id="comments">
                                {
                                    !_.isEmpty(post) &&
                                    <>
                                        <h3 className="h2 mt-5">{t('comment.commentaires')}</h3>
                                        {
                                            (post.comments !== null && post.comments !== undefined) ?
                                                <Comments comments={post.comments}/> :
                                                <p className="lead">{t('comment.no_comment')}</p>
                                        }
                                        <CommentField postID={props.match.params.id}/>
                                    </>
                                }
                            </div>

                        </div>

                        <aside className="col-12 col-lg-3">
                            <PostWidget categories={FakeData.post_widget_data}/>
                            <AboutOpenRHWidget/>
                            <ArchiveWidget/>
                        </aside>
                    </div>
                </section>
            </div>

        </>
    )
};

const mapStateToProps = state => ({
    loading: state.getPostByIdReducer.loading,
    result: state.getPostByIdReducer.result,
    error: state.getPostByIdReducer.error,

    loadingGetDomaine: state.getAllDomainesReducer.loading,
    resultGetDomaine: state.getAllDomainesReducer.result,
    errorGetDomaine: state.getAllDomainesReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getPostByIdAction,
    getPostByIdReset,
    getAllDomaineAction,

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogDetail));
