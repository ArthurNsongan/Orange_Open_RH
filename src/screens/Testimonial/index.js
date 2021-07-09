import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {NavLink, useParams, useHistory, withRouter} from "react-router-dom";
import NavigationLight from "../../components/NavigationLight";
import {FakeData} from "../../fakeData";
import PostWidget from "../../components/PostWidget";
import PopularPostAside from "../../components/PopularPostAside";
import {
    getAllPostsByDomaineReset,
    getAllPostsByDomaineAction,
    getAllTestTimonialAction,
    getAllTestTimonialReset
} from "../../redux/api/PostsApi";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Loader from "../../components/Loader";
import AboutOpenRHWidget from "../../components/AboutOpenRHWidget";
import ArchiveWidget from "../../components/ArchiveWidget";
import {Input} from "../../components/Input";
import {TextArea} from "../../components/TextArea/TextArea";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";
import {postFaqAction, postFaqReset} from "../../redux/api/FaqApi";
import {Constant} from "../../config/Constant";
import * as moment from "moment";
import * as Utils from "../../utils";
import {toast} from "react-toastify";
import FaqList from "../../components/FaqList";
import TestimonialList from "../../components/TestimonialList";
import {postTestimonialAction, postTestimonialReset} from "../../redux/api/TestimonialApi";
import $ from "jquery";

let route = require('../../utils/route');

function Testimonial(props) {
    const {t} = useTranslation();
    let history = useHistory();
    const {register, handleSubmit, errors} = useForm();
    const [search, setSearch] = useState('');
    const [testimonialFilter, setTestimonialFilter] = useState(null);
    let {id, page, domaine} = useParams();
    const [testimonial, setTestimonial] = useState('');
    const [thematique, setThematique] = useState(1);

    console.log("PROPS PROPS PROPS", props.result);
    useEffect(() => {
        props.getAllTestTimonialReset();
        props.getAllTestTimonialAction();
    }, []);


    const handleSearch = () => {
        if (props.result !== null)
            setTestimonialFilter(props.result.filter((post) => post.rhContentDescription.toLowerCase().includes(search.toLowerCase())));
    };

    const onSubmitTestimonial = () => {
        props.postTestimonialAction({
            rhContentTitle: "",
            rhContentDescription: testimonial,
            rhContentCategoryId: Constant.testimonialID,
            rhContentDomaineId: Constant.othersDomaineID,
            rhContentDatePublish: moment(new Date()).format("YYYY-MM-DD"),
            userId: Utils.getUserConnected().userId
        });
    };

    useEffect(() => {
        console.log(props.result);
        if (props.resultPostTestimonial !== null) {
            toast.dark(t('testimonial.success'), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            setTimeout(() => {
                history.go(0);
                props.postTestimonialReset();
            }, Constant.toastDelay);
        }
        if (props.errorPostTestimonial !== null) {
            toast.error(props.errorPostTestimonial, {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            props.postTestimonialReset();
        }
    }, [props]);

    useEffect(() => {
        if ($("body").hasClass('bg-gray'))
            $("body").removeClass("bg-gray");
    });

    const renderModalAddTestimonial = () => (
        <div className="modal fade" id="addFaqModal" data-backdrop="static" data-keyboard="false" tabIndex="-1"
             aria-labelledby="addFaqModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addFaqModalLabel">{t('testimonial.new_testimonial')}</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span className="sr-only">{t('common.click_to_close')}</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">

                                <form className="row" id="PostAdminEditForm"
                                      onSubmit={handleSubmit(onSubmitTestimonial)}>

                                    {/*                                    <div className="col-12">
                                        <label htmlFor="postThematique"
                                               className="is-required">{t('common.thematique')}</label>
                                        {
                                            props.loadingGetDomaine ?
                                                <select className="custom-select"
                                                        id="postThematique" disabled>
                                                </select> :
                                                props.resultGetDomaine !== null &&
                                                <select className="custom-select"
                                                        id="postThematique"
                                                        onChange={event => setThematique(event.target.value)}>
                                                    {
                                                        props.resultGetDomaine.map((domaine, index) => (
                                                            <option value={domaine.rhContentDomaineId}
                                                                    key={`domaine${index}`}>{domaine.rhContentDomaineName}</option>
                                                        ))
                                                    }
                                                </select>
                                        }

                                    </div>*/}

                                    <div className="col-12 mt-3">

                                        <TextArea wrapperClass="form-group"
                                                  inputClass="form-control"
                                                  name="testimonial"
                                                  required
                                                  style={{height: "106px"}}
                                                  ref={register({required: true})}
                                                  id="testimonial"
                                                  value={testimonial}
                                                  onChange={(e) => setTestimonial(e.target.value)}
                                                  error={errors.hasOwnProperty("testimonial")}
                                                  errorText={t('error.required_field')}
                                                  labelText={t('testimonial.testimonial_single')}
                                        />

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-dismiss="modal">{t('common.close')}</button>
                        {
                            props.loadingPostTestimonial ?
                                <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"/>
                                    <span className="sr-only">{t('common.loading')}</span>
                                </button> :
                                <button type="button" className="btn btn-primary"
                                        onClick={handleSubmit(onSubmitTestimonial)}>{t('common.post')}</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t('testimonial.title')}`}</title>
            </Helmet>
            <div className="my-5">
                <div className="container">
                    <h1>{t("testimonial.title")}</h1>
                </div>
                {/*<NavigationLight menus={FakeData.posts_menu} menuLink={route.testimonial.root}/>*/}

                {renderModalAddTestimonial()}

                <section className="container">
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <div className="row mb-3">
                                <div className="col-auto mr-auto">
                                    <button type="button" className="btn btn-primary" data-toggle="modal"
                                            data-target="#addFaqModal">
                                        <span className="icon icon-Add" aria-hidden="true"/>
                                        {t('testimonial.add_new')}
                                    </button>
                                </div>
                                <div className="col-auto">
                                    <div className="input-group">
                                        <input type="text" className="form-control"
                                               placeholder={t('testimonial.find_testimonial')}
                                               aria-label={t('testimonial.find_testimonial')}
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
                                    <div className="media-body">
                                        {
                                            props.loading ?
                                                <Loader/> :
                                                props.result !== null ?
                                                    <TestimonialList
                                                        testimonials={search !== '' ? testimonialFilter : props.result}/> :

                                                    (props.error !== null) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        <span className="alert-icon">
                                                            <span className="sr-only">Info</span>
                                                        </span>
                                                        <p>{t(Utils.displayErrorRequest(props.error))}</p>
                                                    </div>
                                        }
                                    </div>
                                }
                            </div>

                        </div>
                        <aside className="col-12 col-lg-3">
                            {/* <PostWidget categories={FakeData.post_widget_data}/> */}
                            <PopularPostAside />
                            <AboutOpenRHWidget/>
                            {/*<ArchiveWidget/>*/}
                        </aside>
                    </div>
                </section>
            </div>
        </>
    )
};

const mapStateToProps = state => ({
    loading: state.getTestimonialReducer.loading,
    result: state.getTestimonialReducer.result,
    error: state.getTestimonialReducer.error,

    loadingPostTestimonial: state.postTestimonialReducer.loading,
    resultPostTestimonial: state.postTestimonialReducer.result,
    errorPostTestimonial: state.postTestimonialReducer.error,

    loadingGetDomaine: state.getAllDomainesReducer.loading,
    resultGetDomaine: state.getAllDomainesReducer.result,
    errorGetDomaine: state.getAllDomainesReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,

    postTestimonialAction,
    postTestimonialReset,

    getAllTestTimonialAction,
    getAllTestTimonialReset

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Testimonial));
