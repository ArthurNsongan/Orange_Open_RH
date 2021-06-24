import React, {useEffect, useState, useCallback} from 'react';
import {withRouter, useParams} from 'react-router-dom';
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
import _ from 'lodash';
import Interweave from "interweave";
import "./style.css";
import * as moment from "moment";
import "moment/locale/fr";
import Loader from "../../../components/Loader";
import {Helmet} from "react-helmet";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons';
import {faFileContract} from '@fortawesome/free-solid-svg-icons';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {faSitemap} from '@fortawesome/free-solid-svg-icons';
import {faCalendarTimes} from '@fortawesome/free-solid-svg-icons';
import {Config} from "../../../config/ServerConfig";

let route = require('../../../utils/route');

function JobOfferDetail(props) {
    moment.locale("fr");
    const {t} = useTranslation();
    let {id, page, domaine} = useParams();
    const [post, setPost] = useState({});
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const renderPost = (post) => (
        <>
            <h2 id="newsLeaderTitle">{post.rhContentTitle}</h2>
            <img className="img-fluid"
                 src={!_.isNil(post.rhContentPrincipalLink) ? (Config.imageFolder + post.rhContentPrincipalLink) : "https://picsum.photos/800/400"}/>

            <div className="mt-3">
                <div className="d-flex flex-row">
                    <div className="mb-1 text-muted mr-2">
                        <span className="icon icon-calendar-day mr-1" aria-hidden="true"></span>
                        {moment(post.rhContentDateCeated).format("lll")}
                    </div>

                    <div className="mb-1 text-muted mr-2">
                        <FontAwesomeIcon icon={faEye} className="mr-1"/>
                        2 vues
                    </div>
                </div>
                <hr/>

                <div className="d-flex flex-row justify-content-between">

                    <div className="d-flex col-4 flex-column elt-border-left">

                        <div className="d-flex flex-column w-100">
                            <div className="mb-1 mr-2">
                                <FontAwesomeIcon icon={faGraduationCap} className="mr-1"/>
                                <span className="h5">{t('add_new_job.job_post')}</span>
                            </div>
                            <span className="text-muted">{post.rhContentJobPost}</span>
                        </div>

                        <div className="d-flex flex-column w-100 mt-3">
                            <div className="mb-1 mr-2">
                                <FontAwesomeIcon icon={faFileContract} className="mr-1"/>
                                <span className="h5">{t('add_new_job.job_contract_type')}</span>
                            </div>
                            <span className="text-muted">{post.rhContentJobContractType}</span>
                        </div>

                    </div>

                    <div className="d-flex col-4 flex-column elt-border-left">

                        <div className="d-flex flex-column w-100">
                            <div className="mb-1 mr-2">
                                <FontAwesomeIcon icon={faUsers} className="mr-1"/>
                                <span className="h5">{t('add_new_job.job_count')}</span>
                            </div>
                            <span className="text-muted">{post.rhContentJobPostNumber}</span>
                        </div>

                        <div className="d-flex flex-column w-100 mt-3">
                            <div className="mb-1 mr-2">
                                <FontAwesomeIcon icon={faSitemap} className="mr-1"/>
                                <span className="h5">{t('add_new_job.job_direction')}</span>
                            </div>
                            <span className="text-muted">{post.rhContentJobDirection}</span>
                        </div>

                    </div>

                    <div className="d-flex col-4 flex-column elt-border-left">

                        <div className="d-flex flex-column w-100">
                            <div className="mb-1 mr-2">
                                <FontAwesomeIcon icon={faCalendarTimes} className="mr-1"/>
                                <span className="h5">{t('add_new_job.job_date_echeance')}</span>
                            </div>
                            <span className="text-muted">
                                {moment(post.rhContentJobDeadLineReceiveCandidate).format("lll")}
                            </span>
                        </div>

                    </div>

                </div>

                <div className="mt-4">
                    <Interweave content={post.rhContentDescription}/>
                </div>
            </div>

        </>
    );
    useEffect(() => {
        props.getPostByIdAction(id);

        /*        if (props.location.post === undefined)
                    props.getPostByIdAction(id);
                else
                    setPost(props.location.post);*/
    }, []);

    useEffect(() => {
        if (props.result !== null) {
            setPost(props.result);
        }
    }, [props]);

    console.log("post", post);

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${post.rhContentTitle}`}</title>
            </Helmet>
            <div className="my-5">
                <NavigationLight menus={FakeData.posts_menu} menuLink={route.post.root}/>

                <section className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8" id="post">
                            {
                                props.location.post === undefined ?
                                    props.loading ?
                                        <Loader/>
                                        : props.result !== null ?
                                        renderPost(post) :
                                        null :
                                    renderPost(post)
                            }

                            {/*                            <div id="comments">
                                <h3 className="h2 mt-5">{t('comment.commentaires')}</h3>
                                {
                                    !_.isNil(post) &&
                                    (post.comments !== null && post.comments !== undefined) ?
                                        <Comments comments={post.comments}/> :
                                        <p className="lead">{t('comment.no_comment')}</p>
                                }
                                <CommentField postID={props.match.params.id}/>
                            </div>*/}

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
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getPostByIdAction,
    getPostByIdReset
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobOfferDetail));
