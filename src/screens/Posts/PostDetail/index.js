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
import {getAllPostsByDomaineAction, getPostByIdAction, getAllPostsPopularAction,
    getPostByIdReset, addNewTransactionAction, addNewTransactionReset} from "../../../redux/api/PostsApi";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import _ from 'lodash';
import Interweave from "interweave";
import "./style.css";
import * as moment from "moment";
import "moment/locale/fr";
import {FileIcon, defaultStyles} from 'react-file-icon';
import Loader from "../../../components/Loader";
import {Helmet} from "react-helmet";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {Config} from "../../../config/ServerConfig";
import * as Utils from "../../../utils";
import ReactPlayer from "react-player";
import SecondaryNavigation from "../../../components/SecondaryNavigation";
import SocialShare from "../../../components/SocialShare";
import {Constant} from "../../../config/Constant";
import PopularPostAside from '../../../components/PopularPostAside';

let route = require('../../../utils/route');

function PostDetail(props) {
    moment.locale("fr");
    const {t} = useTranslation();
    let {id, page, category, domaine} = useParams();
    const [post, setPost] = useState({});
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    useEffect(() => {
        window.$(".img-post").initImageNotLoadPlaceHolder();
    });
    const renderPost = (post) => (
        <>
            <h2 id="newsLeaderTitle">{post.rhContentTitle}</h2>
            {
                !_.isNil(post.rhContentPrincipalLink) ?
                    Utils.isImageFileUrl(Config.imageFolder + post.rhContentPrincipalLink) ?
                        <img className="img-fluid img-responsive img-post"
                             loading="lazy"
                             src={Config.imageFolder + post.rhContentPrincipalLink}/>
                        :
                        <ReactPlayer
                            controls={true}
                            width={800}
                            height={400}
                            url={Config.imageFolder + post.rhContentPrincipalLink}
                        />
                    :
                    <img className="img-fluid img-reponsive img-post" src="https://picsum.photos/800/400" loading="lazy" />
            }
            <div className="mt-3">
                <div className="d-flex justify-content-between">
                    <div className="mb-1 text-muted mr-2 pt-2">
                        <span className="icon icon-calendar-day mr-1" aria-hidden="true"></span>
                        {moment(post.rhContentDatePublish).format("lll")}
                    </div>

                    <div className="mb-1 text-muted mr-2 pt-2">
                        <FontAwesomeIcon icon={faEye} className="mr-1"/>
                        {`${post.viewNumber} ${ post.viewNumber === 1 ? t('common.view') : t('common.views')}`}
                    </div>

                    <div>
                        <SocialShare/>
                    </div>
                </div>
                <hr/>
                <div className="mt-4">
                    <Interweave content={post.rhContentDescription}/>
                </div>

                {/* <div className="mt-3">
                    <h3>{t('common.piece_jointe')}</h3>
                    <hr/>
                    <div className="row" id="piece-jointe">

                        {
                            [{file: "file1.pdf"}, {file: "file2.xls"}, {file: "file3.docx"}].map((item, index) => (
                                <div className="col-1 d-flex justify-content-center">
                                    <div className="d-flex flex-column">
                                        <FileIcon
                                            extension={Utils.getFileExtension(item.file)} {...defaultStyles[Utils.getFileExtension(item.file)]}
                                            style={{width: "80px"}}/>
                                        <p style={{textAlign: "center"}} className="mt-1"><u>{item.file}</u></p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div> */}

            </div>

        </>
    );


    useEffect(() => {
        props.getPostByIdAction(id);
        props.addNewTransactionAction(parseInt(id));
        // props.getAllPostsPopularAction();
        props.getAllPostsByDomaineAction(Constant.publicationID, domaine);
    }, [props.match.params.id]);

    useEffect(() => {
        if (props.result !== null) {
            setPost(props.result);
            console.log(props.result);
        }
    }, [props]);

    // useEffect(() => {
    //     if(post.rhContentId != null) {
    //         props.addNewTransactionAction(post);
    //     }
    // }, [props]);

    console.log("post", post);
    console.log("postResults", props.resultPosts);
    console.log("resultPopular", props.resultPopular);

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${post.rhContentTitle}`}</title>
            </Helmet>
            <div className="post-header pt-5 bg-white">
                <div className="container">
                    <h1>{t("posts.title")}</h1>
                </div>
                <NavigationLight menuLink={`${route.post.root}/${category}`} additionnalClasses
                                 categoryId={category}/>
                { /* <SecondaryNavigation data={props.resultPosts} menuLink={route.post.root}/> */ }
                <header id="secondary_nav" className="bg-light mb-4 overflow-hidden">
                    <div className="container-main">
                        <div className="main-container align-items-center ellispsis-supported row">
                            <div className="col-xs-1" style={{padding: 0}}>
                                <ul className="menu clearfix">
                                    <li className="breadcrumb">
                                        <span>{/*t('add_post.featured')*/}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-8">
                            <nav aria-label="breadcrumb">
                              <ol class="breadcrumb bg-transparent mt-0 mb-0">
                                <li class="breadcrumb-item"><a href="/">{t(route.home.title)}</a></li>
                                {
                                    props.resultPosts !== null ? 
                                    props.resultPosts.filter( item => (item.rhContentDomaineId === post.rhContentDomaineId) )
                                        .map(item => (
                                        <li class="breadcrumb-item">
                                            <NavLink to={`${route.post.root}/${category}`}>{item.rhContentCategory.rhContentCategoryName }</NavLink>
                                        </li>)) : "Unknown"
                                }
                                <li class="breadcrumb-item"><a href={`${route.post.root}/${category}/${post.rhContentDomaineId}`}>{ post.rhContentDomaine != null ? post.rhContentDomaine.rhContentDomaineName : "" }</a></li>
                                <li class="breadcrumb-item active" aria-current="page">{ post.rhContentTitle }</li>
                              </ol>
                            </nav>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
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
                    
                        {/* { props.resultPopular !== null ?
                            <div className="d-flex flex-column">
                                <h3>Populaires</h3>
                                <ul class="d-block">
                            {
                                props.resultPopular
                                .slice(0, 5)
                                .map( (item, index) => (
                                    <li class="nav-item">
                                        <a href="#">{ item.rhContentTitle }</a>
                                    </li>
                                ))
                            }
                                </ul>
                            </div>
                            :
                            <></>
                        } */}
                        <PopularPostAside />
                        {/* <PostWidget categories={FakeData.post_widget_data}/> */}
                        <AboutOpenRHWidget/>
                        <ArchiveWidget/>
                    </aside>
                </div>
            </section>
        </>
    )
};

const mapStateToProps = state => ({
    loadingPosts: state.getAllDomainesReducer.loading,
    resultPosts: state.getAllDomainesReducer.result,
    errorPosts: state.getAllDomainesReducer.error,

    loadingTrans: state.addNewTransactionReducer.loading,
    resultTrans: state.addNewTransactionReducer.result,
    errorTrans: state.addNewTransactionReducer.result,

    // loadingPopular: state.getAllPostPopularReducer.loading,
    // resultPopular: state.getAllPostPopularReducer.result,
    // errorPopular: state.getAllPostPopularReducer.error,

    loading: state.getPostByIdReducer.loading,
    result: state.getPostByIdReducer.result,
    error: state.getPostByIdReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getPostByIdAction,
    getPostByIdReset,
    addNewTransactionAction,
    addNewTransactionReset,
    getAllPostsByDomaineAction,
    // getAllPostsPopularAction,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
