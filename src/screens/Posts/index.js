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
    getAllPostsByCategoryAction,
    getAllPostsReset
} from "../../redux/api/PostsApi";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Loader from "../../components/Loader";
import AboutOpenRHWidget from "../../components/AboutOpenRHWidget";
import ArchiveWidget from "../../components/ArchiveWidget";
import {Constant} from "../../config/Constant";
import {toast} from "react-toastify";
import {Helmet} from "react-helmet";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import $ from "jquery";
import * as Utils from "../../utils";
import {getAllCategoryAction, getAllCategoryReset} from "../../redux/api/CategoryApi";
import PopularPostAside from '../../components/PopularPostAside';

let route = require('../../utils/route');

function Posts(props) {
    const {t} = useTranslation();
    let history = useHistory();
    const [search, setSearch] = useState('');
    const [postsFilter, setPostsFilter] = useState(null);
    let {id, page, category, domaine} = useParams();
    let pathParam = useParams();


    useEffect(() => {
        if (domaine === undefined && props.resultGetPostByCategory === null && props.resultGetPostByCategory === null) {
            //props.getAllPostsByDomaineReset();
            props.getAllPostsByCategoryAction(category);
        }

        if (props.resultGetCategory === null)
            props.getAllCategoryAction();

    }, [props]);

    useEffect(() => {
        console.log("PATH PARAMS", pathParam);
        props.getAllPostsByDomaineReset();
        props.getAllPostsByCategoryAction(category);
        if (domaine !== undefined)
            props.getAllPostsByDomaineAction(category, domaine);
    }, [props.location.pathname]);

    useEffect(() => {
        $("body").addClass("bg-gray");
    });

    const handleSearch = () => {
        console.log(search);
        if (props.result !== null) {
            if (domaine === undefined)
                setPostsFilter(props.resultGetPostByCategory.filter((post) => post.rhContentTitle.toLowerCase().includes(search.toLowerCase())))
            else
                setPostsFilter(props.result.filter((post) => post.rhContentTitle.toLowerCase().includes(search.toLowerCase())))

        }
    };

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t('posts.title')}`}</title>
            </Helmet>
            <div className="post-header pt-5 bg-white">
                <div className="container">
                    <h1>{props.resultGetCategory !== null &&
                    props.resultGetCategory.filter((cat) => cat.rhContentCategoryId === parseInt(category))[0] !== undefined &&
                    props.resultGetCategory.filter((cat) => cat.rhContentCategoryId === parseInt(category))[0].rhContentCategoryName}</h1>
                </div>
                <NavigationLight menuLink={`${route.post.root}/${category}`} additionnalClasses
                                 categoryId={category}/>

                <SecondaryNavigation
                    data={props.resultGetPostByCategory !== null ? props.resultGetPostByCategory : null}
                    menuLink={route.post.root}/>
            </div>

            <section className="container">
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <div className="row mb-3">
                            {/*                                <div className="col-auto mr-auto">
                                    <NavLink to={route.post.add_new} className="btn btn-primary" exact>
                                        <span className="icon icon-Add" aria-hidden="true"/>
                                        {t('posts.new_post')}
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
                                props.loading || props.loadingGetDomaine || props.loadingGetPostByCategory ?
                                    <Loader/> :
                                    (domaine === undefined ?
                                        (props.resultGetDomaine !== null && props.resultGetPostByCategory !== null) ?
                                            <PostList
                                                posts={search !== '' ? postsFilter : props.resultGetPostByCategory}/> :
                                            (props.errorGetDomaine !== null && props.error !== null) &&
                                            <div className="alert alert-danger" role="alert">
                                                <span className="alert-icon"><span
                                                    className="sr-only">Info</span></span>
                                                <p>{t(Utils.displayErrorRequest(props.error))}</p>
                                            </div> :
                                        (props.resultGetDomaine !== null && props.result !== null) ?
                                            <PostList
                                                posts={search !== '' ? postsFilter : props.result}/> :
                                            (props.errorGetDomaine !== null && props.error !== null) &&
                                            <div className="alert alert-danger" role="alert">
                                                <span className="alert-icon"><span
                                                    className="sr-only">Info</span></span>
                                                <p>{t(Utils.displayErrorRequest(props.error))}</p>
                                            </div>)

                            }
                        </div>

                    </div>
                    <aside className="col-12 col-lg-3">
                        {/* <PostWidget categories={FakeData.post_widget_data}/> */}
                        <PopularPostAside />
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

    loadingGetPostByCategory: state.getAllPostsByCategoryReducer.loading,
    resultGetPostByCategory: state.getAllPostsByCategoryReducer.result,
    errorGetPostByCategory: state.getAllPostsByCategoryReducer.error,

    loadingGetDomaine: state.getAllDomainesReducer.loading,
    resultGetDomaine: state.getAllDomainesReducer.result,
    errorGetDomaine: state.getAllDomainesReducer.error,

    loadingGetCategory: state.getAllCategoryReducer.loading,
    resultGetCategory: state.getAllCategoryReducer.result,
    errorGetCategory: state.getAllCategoryReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,

    getAllPostsByCategoryAction,
    getAllPostsReset,

    getAllCategoryAction,
    getAllCategoryReset
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
