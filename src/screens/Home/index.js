import React, { useEffect, useState } from 'react';
import './style.css';
import { useTranslation } from "react-i18next";
import { NavLink, withRouter } from "react-router-dom";
import Slider from "../../components/Slider";
import { FakeData } from "../../fakeData";
import PostWidgetList from "../../components/PostWidgetList";
import { Helmet } from "react-helmet";
import TitleUnderlined from "../../components/TitleUnderlined";
import _ from "lodash";
import * as Utils from "../../utils";

import {
    getAllPostsAction,
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset, getAllPostsFeaturedAction, getAllPostsFeaturedReset,
    getAllPostsReset, getPostFeaturedAction, getPostFeaturedReset
} from "../../redux/api/PostsApi";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import ContentLoader from "react-content-loader"
import { Constant } from "../../config/Constant";
import { Config } from "../../config/ServerConfig";
import Interweave from "interweave";
import { getAllBlogReset, getAllBlogAction } from "../../redux/api/BlogApi";
import { getAllPostsFrontEndAction } from "../../redux/api/PostsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faUser, faFemale, faMale, faPlus  } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import * as moment from "moment";
import Loader from "../../components/Loader";

let route = require('../../utils/route');

function Home(props) {

    const { t } = useTranslation();
    const [postsFeatured, setPostsFeatured] = useState([]);
    const [blogsWithoutImage, setBlogsWithoutImage] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const [hasLoadedPost, setHasLoadedPost] = useState(false);
    const [hasLoadedBlog, setHasLoadedBlog] = useState(false);

    const LoaderLeft = () => (
        <ContentLoader
            speed={2}
            width="auto"
            height={300}
            viewBox="0 0 400 300"
            backgroundColor="#292929"
            foregroundColor="#8f8f8f"
            {...props}
        >
            <rect x="4" y="4" rx="2" ry="2" width="400" height="14" />
            <rect x="3" y="133" rx="0" ry="0" width="400" height="8" />
            <rect x="3" y="147" rx="0" ry="0" width="400" height="8" />
            <rect x="3" y="162" rx="0" ry="0" width="204" height="8" />
            <rect x="2" y="240" rx="2" ry="2" width="132" height="30" />
            <rect x="4" y="27" rx="2" ry="2" width="300" height="14" />
        </ContentLoader>
    );

    const LoaderRight = () => (
        <ContentLoader
            speed={2}
            width="auto"
            height={300}
            viewBox="0 0 400 300"
            backgroundColor="#292929"
            foregroundColor="#8f8f8f"
            {...props}
        >
            <rect x="0" y="0" rx="2" ry="2" width="400" height="270" />
        </ContentLoader>
    );

    const LoaderSlider = () => (
        <div className="col-12 col-lg-9">
            <div className="row">
                <div className="col-6">
                    <LoaderLeft />
                </div>
                <div className="col-6">
                    <LoaderRight />
                </div>
            </div>
        </div>
    );

    const ShortcutLink = (props) => (
        <div className={`${props.className}`} style={props.style}>
            <div className={`${props.childClass == null ? "rounded-xl" : props.childClass } item p-2 bg-gray1 w-100 d-flex-column align-items-baseline`}>
                <NavLink to={{
                    pathname: props.link
                }}
                    className="align-items-baseline d-block flex-grow-1"
                    exact>
                    <div className="d-flex mb-1 align-items-baseline">
                        <span className="text-white flex-grow-1 fs-14 text-nowrap font-weight-bold">
                            {props.subTitle}
                        </span>
                        <FontAwesomeIcon icon={props.icon} />
                    </div>
                    <div className="d-flex mb-1 align-items-baseline">
                        <div className="d-flex flex-grow-1">
                            <h3 className="text-white lead font-weight-bold py-0 my-0">
                                {props.title}
                            </h3>
                        </div>
                        <div className="text-white fs-26">
                            {props.count}
                        </div>
                    </div>
                    { props.children }
                </NavLink>
            </div>
        </div>
    );

    const eLearners = "Fotsing Bernard,Tanga Benjamin,Egbenchong Laura,Ewambil Edanmoua Claude Gaelle,Tchoupou Alain,Bonga Christelle,Ndjaka Deborah,Ngono Romeo,Melingui Herve,Mmira Abdoulahi,Mvondo Belinda"
    .split(",");


    const loadData = () => {
        if (props.resultGetAllPostsFeatured !== null) {
            setPostsFeatured(props.resultGetAllPostsFeatured);
        }
        if (props.result !== null && !hasLoadedPost) {
            let tempPost = props.result.filter((post) => post.rhContentPriorityLevel === 1 && Utils.isImageFileUrl(post.rhContentPrincipalLink));
            tempPost.map(post => post.postType = "post");
            setPostsFeatured(_.slice(tempPost, 0, 3));
            setHasLoadedPost(true);
            props.getAllPostsFrontEndAction();
            props.getAllBlogAction();
        }
        if (props.resultBlog !== null && !hasLoadedBlog) {
            let postsLoaded = postsFeatured;
            let currentPosts = props.resultBlog.filter((post) => post.rhContentPriorityLevel === 1 && Utils.isImageFileUrl(post.rhContentPrincipalLink));
            currentPosts.map(post => post.postType = "blog");
            console.log("mon blog", props.resultBlog);
            setPostsFeatured(_.slice(_.concat(postsLoaded, currentPosts), 0, 6));
            //console
            // let data= props.result.filter((value)=>value.rhContentPrincipalLink!==null);
            let tempBlogWithoutImage = props.resultBlog.filter((blog) => Utils.isImageFileUrl(blog.rhContentPrincipalLink))[0];


            console.log("Blog without video", tempBlogWithoutImage);

            if (typeof myVar !== 'undefined') {
                console.log("dataFinal", props.resultBlog);
                console.log("data2", tempBlogWithoutImage);
                console.log("Blogs with image", props.resultBlog.filter((blog) => blog.rhContentId !== tempBlogWithoutImage.rhContentId));
                setBlogsWithoutImage(tempBlogWithoutImage);
                setBlogs(props.resultBlog.filter((blog) => blog.rhContentId !== tempBlogWithoutImage.rhContentId));
                setHasLoadedBlog(true);
            }


        }
    }

    useEffect(() => {
        loadData();
        console.log("eLearners", eLearners);
    }, [props]);
    useEffect(() => {
        if (props.result === null && props.resultBlog === null)
            props.getAllPostsFrontEndAction();

        if (props.resultGetAllPostsFeatured === null)
            props.getAllPostsFeaturedAction();

        if (props.resultBlog === null)
            props.getAllBlogAction();

    });

    const checkAppLink = (e) => ( e !== "" ? e : "/under-construction" );

    /*        useEffect(() => {
                loadData();
            }, [props, props.location.pathname]);*/


    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t('home.title')}`}</title>
            </Helmet>
            <section className="home bg-white ">
                {/* BEGIN SLIDER*/}
                <div className="container-fluid">
                    <div className="row home-slider-container pt-5 pb-5">
                        <div className="col-12 col-lg-3" style={{ paddingRight: 0 }}>
                                <div className="col">
                                    <h4>{t("common.application_Rh")}</h4>
                                    <div className="row">
                                        <div className="col-12" style={{ paddingRight: 0 }}>
                                            {/* taleo*/}
                                            <a href={Constant.applicationRh.taleo.url} className="btn">
                                                <h5>  {Constant.applicationRh.taleo.title}</h5>
                                            </a>
                                        </div>
                                        <div className="col-12" style={{ paddingRight: 0 }}>
                                            {/* my infos*/}
                                            <a href={Constant.applicationRh.myInfos.url} className="btn">
                                                <h5> {Constant.applicationRh.myInfos.title}</h5>
                                            </a>
                                        </div>
                                        <div className="col-12" style={{ paddingRight: 0 }}>
                                            {/* app 2*/}
                                            <a href={ checkAppLink(Constant.applicationRh.e_learning.url) } className="btn">
                                                <h5> {Constant.applicationRh.e_learning.title}</h5>
                                            </a>
                                        </div>
                                        <div className="col-12" style={{ paddingRight: 0 }}>
                                            {/* app 3*/}

                                            <a href={ checkAppLink(Constant.applicationRh.livretAcueil.url) } className="btn">
                                                <h5>{Constant.applicationRh.livretAcueil.title}</h5>
                                            </a>
                                        </div>
                                        <div className="col-12" style={{ paddingRight: 0 }}>
                                            {/* app3*/}

                                            <a href={ checkAppLink(Constant.applicationRh.fusion.url) } className="btn">
                                                <h5>{Constant.applicationRh.fusion.title}</h5>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        {
                            (props.loadingGetAllPostsFeatured) ?
                                <LoaderSlider /> :
                                (props.resultGetAllPostsFeatured !== null) ?
                                    <div className="col-12 col-lg-6">
                                        {/* <Slider pagination
                                            className={"home-slider"}
                                            slides={props.resultGetAllPostsFeatured}
                                            renderItem={(item) => (
                                                <div className="row">
                                                    <div className="col-7" style={{ paddingRight: 0 }}>
                                                        <h3 className="display-4">{Utils.cutString(item.rhContentTitle, 100)}</h3>
                                                        <p className="lead text-primary">
                                                            <Interweave
                                                                content={Utils.removeTag(Utils.cutString(item.rhContentDescription, 100))} />
                                                        </p>
                                                        <NavLink
                                                            to={{
                                                                pathname: item.rhContentPostType === Constant.publicationID ?
                                                                    `${route.post.root}/${item.rhContentDomaine.rhContentCategoryId}/${item.rhContentDomaineId}/${item.rhContentId}` :
                                                                    `${route.blog.root}/${item.rhContentDomaine.rhContentCategoryId}/${item.rhContentDomaineId}/${item.rhContentId}`,
                                                                item
                                                            }}
                                                            className="btn btn-primary">
                                                            {t('common.read_more')}
                                                        </NavLink>
                                                    </div>
                                                    <div className="col-5" style={{ paddingLeft: 0 }}>
                                                        <div class="row">
                                                            <div class="col-10">
                                                                <img
                                                                    src={Config.imageFolder + item.rhContentPrincipalLink}
                                                                    alt="" className="img-fluid"
                                                                    loading="lazy" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            } /> */}
                                            {/* <div className={"home-slider"}>
                                                {props.resultGetAllPostsFeatured.map((item) => ( 
                                                <div className="row pb-5">
                                                    <div className="col-7" style={{ paddingRight: 0 }}>
                                                        <h3 className="display-4">{Utils.cutString(item.rhContentTitle, 100)}</h3>
                                                        <p className="lead text-primary">
                                                            <Interweave
                                                                content={Utils.removeTag(Utils.cutString(item.rhContentDescription, 100))} />
                                                        </p>
                                                        <NavLink
                                                            to={{
                                                                pathname: item.rhContentPostType === Constant.publicationID ?
                                                                    `${route.post.root}/${item.rhContentDomaine.rhContentCategoryId}/${item.rhContentDomaineId}/${item.rhContentId}` :
                                                                    `${route.blog.root}/${item.rhContentDomaine.rhContentCategoryId}/${item.rhContentDomaineId}/${item.rhContentId}`,
                                                                item
                                                            }}
                                                            className="btn btn-primary">
                                                            {t('common.read_more')}
                                                        </NavLink>
                                                    </div>
                                                    <div className="col-5" style={{ paddingLeft: 0 }}>
                                                        <div class="row">
                                                            <div class="col-10">
                                                                <img
                                                                    src={Config.imageFolder + item.rhContentPrincipalLink}
                                                                    alt="" className="img-fluid"
                                                                    loading="lazy" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )} */}
                                        <ReactPlayer
                                                className="img-fluid img-reponsive video-preview"
                                                width="400px"
                                                height="200px"
                                                url={Config.imageFolder + "bf8315e4-4b3c-4faa-b8c7-2599bd768dad.mp4"}
                                            />                                        
                                    </div> : <LoaderSlider />
                        }
                        <div className="col-12 col-lg-3 pl-0">
                            <div className="row justify-content-center">
                                <div className="col-12" style={{ paddingRight: ".1em"}}>
                                <div className="item p-2 bg-gray1 w-100 rounded-xl d-flex-column align-items-baseline">
                                    <NavLink to={{
                                        pathname: props.link
                                    }}
                                        className="align-items-baseline d-block flex-grow-1"
                                        exact>
                                        <div className="d-flex mb-1 align-items-baseline">
                                            <span className="text-white flex-grow-1 fs-14 text-nowrap font-weight-bold">
                                                {t('common.nombre_homme')}
                                            </span>                                      
                                        </div>
                                        <div className="d-flex mb-1 align-items-baseline">
                                            <div className="d-flex flex-grow-1">
                                                <div className={"fa-2x pr-2 text-primary"}>
                                                    <FontAwesomeIcon icon={faMale} />
                                                </div>  
                                                <h3 className="text-white lead font-weight-bold py-0 my-0">
                                                    463
                                                </h3>
                                            </div>
                                        </div>
                                    </NavLink>
                                    <NavLink to={{
                                        pathname: props.link
                                    }}
                                        className="align-items-baseline d-block flex-grow-1"
                                        exact>
                                        <div className="d-flex mb-1 align-items-baseline">
                                            <span className="text-white flex-grow-1 fs-14 text-nowrap font-weight-bold">
                                                {t('common.nombre_femme')}
                                            </span>
                                        </div>
                                        <div className="d-flex mb-1 align-items-baseline">
                                            <div className="d-flex flex-grow-1">
                                                <div className={"fa-2x pr-2 color-primary text-primary"}>
                                                    <FontAwesomeIcon icon={faFemale} />
                                                </div>
                                                <h3 className="text-white lead font-weight-bold py-0 my-0">
                                                    435
                                                </h3>
                                            </div>
                                        </div>
                                    </NavLink>
                                    <NavLink to={{
                                        pathname: props.link
                                    }}
                                        className="align-items-baseline d-block flex-grow-1"
                                        exact>
                                        <div className="d-flex mb-1 align-items-baseline">
                                            <span className="text-white flex-grow-1 fs-14 text-nowrap font-weight-bold">
                                                {"Force de travail"}
                                            </span>
                                        </div>
                                        <div className="d-flex mb-1 align-items-baseline">
                                            <div className="d-flex flex-grow-1">
                                                <div className={"fa-2x color-primary text-primary pr-2"}>
                                                    <FontAwesomeIcon icon={faFemale} />   
                                                    +
                                                    <FontAwesomeIcon icon={faMale} />
                                                </div>
                                                <h3 className="text-white lead font-weight-bold py-0 my-0">
                                                    898
                                                </h3>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>

                                </div>
                                {/* <PostWidgetList theme="white"
                                    posts={props.resultBlog !== null ? _.slice(props.resultBlog, 0, 3) : null} /> */}
                            </div>
                            <br></br>

                            <div className="row justify-content-center">
                                <ShortcutLink children={
                                    // <h5>
                                        // Fotsing Bernard,Tanga Benjamin,Egbenchong Laura,Ewambil Edanmoua Claude Gaelle,Tchoupou Alain,Bonga Christelle,Ndjaka Deborah,Ngono Romeo,Melingui Herve, Mmira Abdoulahi, Mvondo Belinda.
                                    // </h5>
                                    <Slider 
                                            className={"home-slider mb-0"}
                                            autoplay={{ delay: 5000, loop: true }}
                                            slides={eLearners}
                                            navigation
                                            pagination
                                            renderItem={ item => (
                                                <h4 className="py-1 text-center text-white">{item}</h4>
                                            )}
                                    />
                                }
                                    subTitle={t('common.top_elearning')}
                                    count=''
                                    // childClass="rounded-none"
                                    icon={faUser}
                                    className="col-12"
                                    style={{ paddingRight: ".1em" }} />

                                {/* <PostWidgetList theme="white"
                                    posts={props.resultBlog !== null ? _.slice(props.resultBlog, 0, 3) : null} /> */}
                            </div>
                            <br></br>

                            <div className="row justify-content-center">

                                <ShortcutLink title={2}
                                    subTitle={t('common.date_importante')}
                                    count=''
                                    icon={faUser}
                                    className="col-12"
                                    style={{ paddingRight: ".1em" }} />



                                {/* <PostWidgetList theme="white"
                                    posts={props.resultBlog !== null ? _.slice(props.resultBlog, 0, 3) : null} /> */}
                            </div>
                        </div>
                        {/*<div className="col-3 pl-0 pr-4">
                                <h3 className="display-3">Actualité</h3>
                                <hr/>
                                <div className="list-group">
                                    <a href="#" className="list-group-item list-group-item-action active">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">List group item heading</h5>
                                            <small>3 days ago</small>
                                        </div>
                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed
                                            diam eget risus varius blandit.</p>
                                        <small>Donec id elit non mi porta.</small>
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action active">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">List group item heading</h5>
                                            <small className="text-muted">3 days ago</small>
                                        </div>
                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed
                                            diam eget risus varius blandit.</p>
                                        <small className="text-muted">Donec id elit non mi porta.</small>
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action active">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">List group item heading</h5>
                                            <small className="text-muted">3 days ago</small>
                                        </div>
                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed
                                            diam eget risus varius blandit.</p>
                                        <small className="text-muted">Donec id elit non mi porta.</small>
                                    </a>
                                </div>
                            </div>*/}
                    </div>
                </div>
                {
                    /*<div className="col-lg-12 col-sm-12 col-md-12 py-5">
                    <div className="container">

                        <TitleUnderlined customClass="mb-4">{t('home.a_la_une')}</TitleUnderlined>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img alt="alt" className="img-fluid"
                                         src="https://brand.orange.com/media/14420/gettyimages-564378601_preview.jpg"/>

                                    <div className="card-body">
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit
                                            longer.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                                                            <NavLink to={route.post.post_detail} className="stretched-link">
                                                {t('common.read_more')}
                                            </NavLink>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img alt="alt" className="img-fluid"
                                         src="https://brand.orange.com/media/14420/gettyimages-564378601_preview.jpg"/>

                                    <div className="card-body">
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit
                                            longer.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <NavLink to={route.post.post_detail} className="stretched-link">
                                                {t('common.read_more')}
                                            </NavLink>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img alt="alt" className="img-fluid"
                                         src="https://brand.orange.com/media/14420/gettyimages-564378601_preview.jpg"/>

                                    <div className="card-body">
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit
                                            longer.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                                                            <NavLink to={route.post.post_detail} className="stretched-link">
                                                {t('common.read_more')}
                                            </NavLink>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <TitleUnderlined customClass="mb-4">{t('home.offre_emploi')}</TitleUnderlined>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img alt="alt" className="img-fluid"
                                         src="https://brand.orange.com/media/14420/gettyimages-564378601_preview.jpg"/>

                                    <div className="card-body">
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit
                                            longer.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                                                            <NavLink to={route.post.post_detail} className="stretched-link">
                                                {t('common.read_more')}
                                            </NavLink>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img alt="alt" className="img-fluid"
                                         src="https://brand.orange.com/media/14420/gettyimages-564378601_preview.jpg"/>
                                    <div className="card-body">
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit
                                            longer.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                                                            <NavLink to={route.post.post_detail} className="stretched-link">
                                                {t('common.read_more')}
                                            </NavLink>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img alt="alt" className="img-fluid"
                                         src="https://brand.orange.com/media/14420/gettyimages-564378601_preview.jpg"/>
                                    <div className="card-body">
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit
                                            longer.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                                                            <NavLink to={route.post.post_detail} className="stretched-link">
                                                {t('common.read_more')}
                                            </NavLink>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
*/
                }

                {/*            <div className="discovery-module-one-pop-out bg-yellow py-5 py-lg-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6 col-lg-4">
                            <h2 className="display-1">Discovery module</h2>
                            <p className="lead">
                                Insert your body text in here. Ommoditatur sendand amusanti nobisci psandae dolupta
                                tatur, con corrum sam fugitatiunt aliae
                                pa doluptatur sit aut alite excerei ctasimin.
                            </p>
                            <a href="#" className="btn btn-secondary">
                                Find out more<span className="sr-only">&nbsp;about the TITLE OF THE INSIGHT</span>
                            </a>
                        </div>
                        <div className="col-12 col-md-6 col-lg-8">
                            <img src="https://boosted.orange.com/docs/4.5/examples/orange-homepage/images/discovery.svg"
                                 alt="" className="img-fluid" width="860" height="558"
                                 loading="lazy"/>
                        </div>
                    </div>
                </div>
            </div>*/
                }
                {/* END SLIDER*/
                }
            </section>


            <section className="home bg-gray">
                <div className="col-lg-12 col-sm-12 col-md-12 py-0">
                    <div className="container">
                        
                        <div className="row display-flex">

                            {
                                props.loadingBlog && blogsWithoutImage === null ?
                                    <Loader /> :
                                    blogsWithoutImage !== null && blogsWithoutImage !== undefined &&
                                    <>
                                        <div
                                            className="col-xl-12 col-lg-12 col-md-12 hidden-sm hidden-xs block-card block-card-black block-card-full text-align-center post-full-home">
                                            <NavLink to={{
                                                pathname: `${route.blog.root}/${blogsWithoutImage.rhContentDomaineId}/${blogsWithoutImage.rhContentId}`,
                                            }} exact>
                                                <div className="row">
                                                    <div className="col-sm-8 p-0"
                                                        style={{ backgroundImage: `url(${Config.imageFolder + blogsWithoutImage.rhContentPrincipalLink})` }}>
                                                    </div>
                                                    <div className="col-sm-4 bg-dark p-4">
                                                        <h2>
                                                            {blogsWithoutImage.rhContentTitle}
                                                        </h2>
                                                        <p>
                                                            <span style={{ color: "#ffffff" }}>
                                                                <Interweave
                                                                    content={Utils.removeTag(Utils.cutString(blogsWithoutImage.rhContentDescription, 200))} />
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </div>

                                        <div className="row mt-4 card-custom-home">

                                            {
                                                blogsWithoutImage !== null &&
                                                _.slice(blogs, 0, 3).map((blog, index) => (
                                                    <div className="col-md-4">
                                                        <div className="card mb-4 shadow-sm">
                                                            {
                                                                !_.isNil(blog.rhContentPrincipalLink) ?
                                                                    Utils.isImageFileUrl(blog.rhContentPrincipalLink) ?
                                                                        <img className="img-fluid img-responsive"
                                                                            loading="lazy"
                                                                            src={Config.imageFolder + blog.rhContentPrincipalLink} />
                                                                        :
                                                                        <ReactPlayer
                                                                            className="img-fluid img-reponsive video-preview"
                                                                            width="400px"
                                                                            height="200px"
                                                                            url={Config.imageFolder + blog.rhContentPrincipalLink}
                                                                        />
                                                                    : <img className="img-fluid img-reponsive"
                                                                        loading="lazy"
                                                                        src="https://picsum.photos/800/650" />
                                                            }
                                                            <div className="card-body">
                                                                <h4 className="card-title">{blog.rhContentTitle}</h4>
                                                                <p className="card-text" style={{ fontWeight: 'normal' }}>
                                                                    <Interweave
                                                                        content={Utils.removeTag(Utils.cutString(blog.rhContentDescription, 200))} />
                                                                </p>
                                                                <div
                                                                    className="d-flex justify-content-between align-items-center">
                                                                    <div className="btn-group">
                                                                        <NavLink to={{
                                                                            pathname: `${route.blog.root}/${blog.rhContentDomaineId}/${blog.rhContentId}`,
                                                                        }}
                                                                            className="btn btn-primary btn-sm">
                                                                            {t('common.read_more')}
                                                                        </NavLink>
                                                                    </div>
                                                                    <small className="text-muted">
                                                                        {moment(blog.rhContentDateCeated).format("lll")}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                ))
                                            }
                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </section>

            <section className="home bg-dark">
            <Slider
                className={"home-slider py-3"}
                loop={true}
                autoplay={{ delay: 5000, loop: true }}
                slides={[(
                    <div className="row justify-content-center align-items-center" style={{ minHeight: "90px" }}>
                        <h3 className="text-center m-auto">
                            <span style={{ color: "#ffffff" }}>L’innovation est essentielle à notre entreprise. </span>
                            <br />
                            <span style={{ color: "#ff7900" }}>Construisons-la ensemble</span>
                        </h3>
                    </div>
                ), (
                    <div className="row justify-content-center align-items-center" style={{ minHeight: "90px" }}>
                        <h3 className="text-center m-auto">
                            <span style={{ color: "#ffffff" }}>HR, </span>
                            <span style={{ color: "#ff7900" }}>Leading the change</span>
                        </h3>
                    </div>
                )]}
                renderItem={(item) => ( item )} />
                <div className="container-fluid">
                    
                </div>
            </section>

            <section className="home">
                <div className="col-lg-12 col-sm-12 col-md-12 py-5">
                    <div className="container">
                        <h3 className="text-capitalize pb-3
                        ">{t('common.latest_posts')}</h3>
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                {
                                    props.loading ?
                                        <Loader />
                                        :
                                        props.result !== null &&
                                        <Slider
                                            navigation={false}
                                            pagination={true}
                                            className={"home-slider"}
                                            slides={props.result}
                                            renderItem={(post) => (
                                                <div className="col px-2 mx-3">
                                                    <div
                                                        className="row no-gutters shadow-sm rounded overflow-hidden flex-md-row mb-4 h-md-250 position-relative bg-white">
                                                        {/*                                            <div className="col-6 p-4 d-flex flex-column position-static">
                                                <strong
                                                    className="d-inline-block mb-2 text-primary">{post.rhContentCategory}</strong>
                                                <h3 className="mb-0">{post.rhContentTitle}</h3>
                                                <div
                                                    className="mb-1 h6 text-muted">{moment(post.rhContentDateCeated).format("lll")}</div>
                                                <Interweave
                                                    content={Utils.removeTag(Utils.cutString(post.rhContentDescription, 200))}/>

                                                <NavLink
                                                    to={{
                                                        pathname: `${route.post.root}/${post.rhContentDomaineId}/${post.rhContentId}`,
                                                        post
                                                    }}
                                                    className="stretched-link btn btn-primary">
                                                    {t('common.read_more')}
                                                </NavLink>
                                            </div>
                                            <div className="col-auto d-none d-lg-block">
                                                <img src="https://picsum.photos/800/450" alt={post.rhContentTitle}
                                                     className="img-fluid bd-placeholder-img"/>
                                            </div>*/}
                                                        <div className="d-flex flex-row"></div>
                                                        <div className="row news-card bg-white">
                                                            <div className="col-md-5">
                                                                {
                                                                    !_.isNil(post.rhContentPrincipalLink) ?
                                                                        Utils.isImageFileUrl(post.rhContentPrincipalLink) ?
                                                                            <div className="feed-image" >
                                                                                <img
                                                                                    className=""
                                                                                    loading="lazy"
                                                                                    style={{ objectFit: "cover", width: "100%", height: "250px"}}
                                                                                    src={Config.imageFolder + post.rhContentPrincipalLink} />
                                                                            </div>
                                                                            :
                                                                            <ReactPlayer
                                                                                className="img-fluid img-reponsive video-preview"
                                                                                width="400px"
                                                                                height="200px"
                                                                                url={Config.imageFolder + post.rhContentPrincipalLink}
                                                                            />
                                                                        : <img className="img-fluid img-reponsive"
                                                                            loading="lazy"
                                                                            style={{ objectFit: "cover", width: "100%", height: "250px"}}
                                                                            src="https://picsum.photos/800/650" />
                                                                }

                                                            </div>
                                                            <div className="col-md-7 p-3 pr-3">
                                                                <div className="news-feed-text">
                                                                    <h4 className="">{post.rhContentTitle}</h4>
                                                                    <span className="date">
                                                                        <div className="mb-1 font-weight-medium h6">
                                                                            {moment(post.rhContentDateCreated).format("lll")}
                                                                        </div>
                                                                    </span>
                                                                    <span>
                                                                        <Interweave
                                                                            content={Utils.removeTag(Utils.cutString(post.rhContentDescription, 200))} />
                                                                    </span>
                                                                    <div
                                                                        className="d-flex flex-row justify-content-between align-items-center mt-2">
                                                                        <NavLink
                                                                            to={{
                                                                                pathname: `${route.post.root}/${post.rhContentDomaine.rhContentCategoryId}/${post.rhContentDomaineId}/${post.rhContentId}`,
                                                                                post
                                                                            }}
                                                                            className="btn btn-secondary">
                                                                            {t('common.read_more')}
                                                                        </NavLink>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                            } />

                                }

                            </div>

                            {/* <div className="col-lg-3 col-sm-3 col-md-3 col-xs-12">
                                <PostWidgetList theme="black" posts={props.resultBlog} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}

const mapStateToProps = state => ({
    loading: state.getAllPostsReducer.loading,
    result: state.getAllPostsReducer.result,
    error: state.getAllPostsReducer.error,

    loadingGetAllPostsFeatured: state.getAllPostFeaturedReducer.loading,
    resultGetAllPostsFeatured: state.getAllPostFeaturedReducer.result,
    errorGetAllPostsFeatured: state.getAllPostFeaturedReducer.error,

    loadingBlog: state.getAllBlogReducer.loading,
    resultBlog: state.getAllBlogReducer.result,
    errorBlog: state.getAllBlogReducer.error,

    loadingGetDomaine: state.getAllDomainesReducer.loading,
    resultGetDomaine: state.getAllDomainesReducer.result,
    errorGetDomaine: state.getAllDomainesReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,

    getAllPostsAction,
    getAllPostsReset,

    getAllBlogAction,

    getPostFeaturedAction,
    getPostFeaturedReset,

    getAllPostsFeaturedAction,
    getAllPostsFeaturedReset,

    getAllPostsFrontEndAction,
    getAllBlogReset
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
