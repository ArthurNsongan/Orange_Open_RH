import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {NavLink, useParams, useHistory, withRouter} from "react-router-dom";
import NavigationLight from "../../components/NavigationLight";
import {FakeData} from "../../fakeData";
import PostList from "../../components/PostList";
import PostWidget from "../../components/PostWidget";
import {
    getAllPostsByDomaineReset,
    getAllPostsByDomaineAction,
    getAllPostsAction,
    getAllPostsReset
} from "../../redux/api/PostsApi";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Loader from "../../components/Loader";
import AboutOpenRHWidget from "../../components/AboutOpenRHWidget";
import ArchiveWidget from "../../components/ArchiveWidget";
import BlogLayout from "../../layout/BlogLayout";
import * as Utils from "../../utils";
import BlogList from "../../components/BlogList";
import {Constant} from "../../config/Constant";
import {Helmet} from "react-helmet";
import $ from "jquery";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import {getAllBlogAction, getAllBlogReset} from "../../redux/api/BlogApi";

let route = require('../../utils/route');

function Blog(props) {
    const {t} = useTranslation();
    let history = useHistory();
    const [search, setSearch] = useState('');
    const [blogFilter, setBlogFilter] = useState(null);
    let {id, page, domaine} = useParams();


    useEffect(() => {
        console.log("domaine", domaine);
        if (domaine === undefined && props.resultGetAllBlog === null && props.errorGetAllBlog == null) {
            props.getAllBlogAction();
        }

    }, [props]);

    useEffect(() => {
        const {pathname} = props.location;
        props.getAllPostsByDomaineReset();
        if(domaine !== undefined)
        props.getAllPostsByDomaineAction(Constant.blogID, domaine);
    }, [props.location.pathname]);

    useEffect(() => {
        $("body").addClass("bg-gray");
    });

    const handleSearch = () => {
        if(domaine === undefined) {
            if (props.result !== null)
                setBlogFilter(props.result.filter((post) =>
                    post.rhContentTitle.toLowerCase().includes(search.toLowerCase()) && post.rhContentPriorityLevel !== 1
                ));
        } else {
            if (props.resultGetAllBlog !== null)
                setBlogFilter(props.resultGetAllBlog.filter((post) =>
                    post.rhContentTitle.toLowerCase().includes(search.toLowerCase()) && post.rhContentPriorityLevel !== 1
                ));
        }

    };

    console.log("ERREUR", props.error);

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t('navigation.blog')}`}</title>
            </Helmet>

            <div className="post-header pt-5 bg-white">
                <div className="container">
                    <h1>{t("blog.title")}</h1>
                </div>
                <NavigationLight menuLink={route.blog.root} additionnalClasses categoryId={Constant.blogID}/>

                <SecondaryNavigation data={props.result} menuLink={route.blog.root}/>
            </div>

            <section className="container">
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <div className="row mb-3">
                            {/*                                <div className="col-auto mr-auto">
                                    <NavLink to={route.blog.add_new} className="btn btn-primary" exact>
                                        <span className="icon icon-Add" aria-hidden="true"/>
                                        {t('blog.new_blog')}
                                    </NavLink>
                                </div>*/}
                            <div className="col-auto">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder={t('posts.find_post')}
                                           aria-label={t('posts.find_post')} aria-describedby="button-addon2"
                                           value={search} onChange={(e) => {
                                        setSearch(e.target.value);
                                        handleSearch();
                                    }}/>
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-secondary btn-icon">
                                            <span className="sr-only">Icon</span>
                                            <span className="icon icon-search" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            {
                                props.loading || props.loadingGetDomaine ?
                                    <Loader/> :
                                    (
                                        domaine !== undefined ?
                                            (props.resultGetDomaine !== null && props.result !== null) ?
                                                <BlogList blogs={search !== '' ? blogFilter : props.result}/> :

                                                (props.errorGetDomaine !== null || props.error !== null) &&
                                                <div className="alert alert-danger" role="alert">
                                                <span className="alert-icon"><span
                                                    className="sr-only">Info</span></span>
                                                    <p>{t(Utils.displayErrorRequest(props.error))}</p>
                                                </div>
                                            :
                                        (props.resultGetDomaine !== null && props.resultGetAllBlog !== null) ?
                                            <BlogList blogs={search !== '' ? blogFilter : props.resultGetAllBlog}/> :

                                            (props.errorGetDomaine !== null || props.errorGetAllBlog !== null) &&
                                            <div className="alert alert-danger" role="alert">
                                                <span className="alert-icon"><span
                                                    className="sr-only">Info</span></span>
                                                <p>{t(Utils.displayErrorRequest(props.errorGetAllBlog))}</p>
                                            </div>
                                    )


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
        </>
    )
};

const mapStateToProps = state => ({
    loading: state.getAllPostsByDomainReducer.loading,
    result: state.getAllPostsByDomainReducer.result,
    error: state.getAllPostsByDomainReducer.error,

    loadingGetAllBlog: state.getAllBlogReducer.loading,
    resultGetAllBlog: state.getAllBlogReducer.result,
    errorGetAllBlog: state.getAllBlogReducer.error,

    loadingGetDomaine: state.getAllDomainesReducer.loading,
    resultGetDomaine: state.getAllDomainesReducer.result,
    errorGetDomaine: state.getAllDomainesReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,

    getAllBlogAction,
    getAllBlogReset,

    getAllPostsAction,
    getAllPostsReset
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
