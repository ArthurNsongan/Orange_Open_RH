import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {NavLink, useParams, useHistory, withRouter} from "react-router-dom";
import NavigationLight from "../../components/NavigationLight";
import {FakeData} from "../../fakeData";
import PostList from "../../components/PostList";
import PostWidget from "../../components/PostWidget";
import {getAllJobOfferReset, getAllJobOfferAction} from "../../redux/api/JobOfferApi";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Loader from "../../components/Loader";
import AboutOpenRHWidget from "../../components/AboutOpenRHWidget";
import ArchiveWidget from "../../components/ArchiveWidget";
import {Constant} from "../../config/Constant";
import {Helmet} from "react-helmet";
import {getAllPostsByDomaineAction, getAllPostsByDomaineReset} from "../../redux/api/PostsApi";
import JobOfferList from "../../components/JobOfferList";

let route = require('../../utils/route');


function JobOffer(props) {

    const {t} = useTranslation();
    let history = useHistory();
    const [search, setSearch] = useState('');
    const [jobsFilter, setPostsFilter] = useState(null);
    let {id, page, domaine} = useParams();
    let pathParam = useParams();


    useEffect(() => {
        if (domaine === undefined) {
            console.warn('DOMAINE NON DEFINI');
            if (props.resultGetDomaine !== null) {
                props.getAllPostsByDomaineAction(Constant.jobOfferID, props.resultGetDomaine[0].rhContentDomaineId);
                history.push(`${route.jobOffer.root}/${props.resultGetDomaine[0].rhContentDomaineId}`);
            }
        }

    }, [props]);

    useEffect(() => {
        props.getAllPostsByDomaineAction(Constant.jobOfferID, domaine);
    }, [props.location.pathname]);

    const handleSearch = () => {
        console.log(search);
        setPostsFilter(props.result.filter((post) => post.rhContentTitle.toLowerCase().includes(search.toLowerCase())))
    };

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t('job_offer.title')}`}</title>
            </Helmet>
            <div className="my-5">
                <div className="container">
                    <h1>{t("job_offer.title")}</h1>
                </div>
                <NavigationLight menus={FakeData.posts_menu} menuLink={route.jobOffer.root}/>

                <section className="container">
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <div className="row mb-3">
                                <div className="col-auto mr-auto">
                                    <NavLink to={route.jobOffer.add_new} className="btn btn-primary" exact>
                                        <span className="icon icon-Add" aria-hidden="true"/>
                                        {t('add_new_job.title')}
                                    </NavLink>
                                </div>
                                <div className="col-auto">
                                    <div className="input-group">
                                        <input type="text" className="form-control"
                                               placeholder={t('job_offer.find_job_offer')}
                                               aria-label={t('job_offer.find_job_offer')}
                                               aria-describedby="button-addon2"
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

                                        props.resultGetDomaine !== null &&
                                        props.result !== null &&
                                        <JobOfferList jobs={search !== '' ? jobsFilter : props.result}/>

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
    loading: state.getAllPostsReducer.loading,
    result: state.getAllPostsReducer.result,
    error: state.getAllPostsReducer.error,

    loadingGetDomaine: state.getAllDomainesReducer.loading,
    resultGetDomaine: state.getAllDomainesReducer.result,
    errorGetDomaine: state.getAllDomainesReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobOffer));
