import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useHistory, useParams, withRouter} from "react-router-dom";
import {FakeData} from "../../fakeData";
import PostWidget from "../../components/PostWidget";
import {
    getAllPostsAction,
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,
    getAllPostsReset
} from "../../redux/api/PostsApi";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Loader from "../../components/Loader";
import AboutOpenRHWidget from "../../components/AboutOpenRHWidget";
import ArchiveWidget from "../../components/ArchiveWidget";
import {Input} from "../../components/Input";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";
import {getAllFaqAction, getAllFaqReset, postFaqAction, postFaqReset} from "../../redux/api/FaqApi";
import {Constant} from "../../config/Constant";
import * as moment from "moment";
import {toast} from "react-toastify";
import FaqList from "../../components/FaqList";
import * as Utils from "../../utils";
import $ from "jquery";

let route = require('../../utils/route');

function Faq(props) {
    const {t} = useTranslation();
    let history = useHistory();
    const {register, handleSubmit, errors} = useForm();
    const [search, setSearch] = useState('');
    const [faqFilter, setFaqFilter] = useState(null);
    let {id, page, domaine} = useParams();
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');
    const [thematique, setThematique] = useState(1);

    console.log("PROPS PROPS PROPS", props.result);
    useEffect(() => {
        props.getAllFaqReset();
        props.getAllFaqAction();
    }, []);

    const handleSearch = () => {
        if (props.result)
            setFaqFilter(props.result.filter((post) => post.rhContentTitle.toLowerCase().includes(search.toLowerCase())));
    };

    const onSubmitFaq = () => {
        props.postFaqAction({
            rhContentTitle: question,
            rhContentDescription: "",
            rhContentCategoryId: Constant.faqID,
            rhContentDomaineId: Constant.othersDomaineID,
            rhContentDatePublish: moment(new Date()).format("YYYY-MM-DD"),
            userId: Utils.getUserConnected().userId
        });
    };

    useEffect(() => {
        console.log(props.result);
        if (props.resultPostFaq !== null) {
            toast.dark(t('faq.success'), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            history.go(0);
            props.postFaqReset();
        }
        if (props.errorPostFaq !== null) {
            toast.error(props.errorPostFaq, {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            props.postFaqReset();
        }
    }, [props]);

    useEffect(() => {
        if ($("body").hasClass('bg-gray'))
            $("body").removeClass("bg-gray");
    });

    const renderModalAddFaq = () => (
        <div className="modal fade" id="addFaqModal" data-backdrop="static" data-keyboard="false" tabIndex="-1"
             aria-labelledby="addFaqModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addFaqModalLabel">{t('faq.new_faq')}</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span className="sr-only">{t('common.click_to_close')}</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">

                                <form className="row" id="PostAdminEditForm" onSubmit={handleSubmit(onSubmitFaq)}>

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

                                        <Input wrapperClass="form-group"
                                               inputClass="form-control"
                                               type="text"
                                               name="question"
                                               required
                                               ref={register({required: true, maxLength: 255})}
                                               id="question"
                                               value={question}
                                               onChange={(e) => setQuestion(e.target.value)}
                                               error={errors.hasOwnProperty("question")}
                                               errorText={t('error.required_field')}
                                               labelText={t('faq.question')}
                                               maxLength="255"
                                        />

                                    </div>

                                    {/*                                    <div className="col-12">
                                        <TextArea wrapperClass="form-group"
                                                  inputClass="form-control"
                                                  name="answer"
                                                  required
                                                  style={{height: "106px"}}
                                                  ref={register({required: true})}
                                                  id="answer"
                                                  value={answer}
                                                  onChange={(e) => setAnswer(e.target.value)}
                                                  error={errors.hasOwnProperty("answer")}
                                                  errorText={t('error.required_field')}
                                                  labelText={t('faq.answer')}
                                        />
                                    </div>*/}

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-dismiss="modal">{t('common.close')}</button>
                        {
                            props.loadingPostFaq ?
                                <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"/>
                                    <span className="sr-only">{t('common.loading')}</span>
                                </button> :
                                <button type="button" className="btn btn-primary"
                                        onClick={handleSubmit(onSubmitFaq)}>{t('common.post')}</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t('faq.title')}`}</title>
            </Helmet>
            <div className="my-5">
                <div className="container">
                    <h1>{t("faq.title")}</h1>
                </div>
                {/*
                <NavigationLight menus={FakeData.posts_menu} menuLink={route.faq.root}/>
*/}

                {renderModalAddFaq()}

                <section className="container">
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <div className="row mb-3">
                                <div className="col-auto mr-auto">
                                    <button type="button" className="btn btn-primary" data-toggle="modal"
                                            data-target="#addFaqModal">
                                        <span className="icon icon-Add" aria-hidden="true"/>
                                        {t('faq.new_faq')}
                                    </button>
                                </div>
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
                                    <div className="media-body">
                                        {
                                            props.loading ?
                                                <Loader/> :
                                                props.result !== null ?
                                                    <FaqList faqs={search !== '' ? faqFilter : props.result}/> :

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
    loading: state.getAllFaqReducer.loading,
    result: state.getAllFaqReducer.result,
    error: state.getAllFaqReducer.error,

    loadingPostFaq: state.postFaqReducer.loading,
    resultPostFaq: state.postFaqReducer.result,
    errorPostFaq: state.postFaqReducer.error,

    loadingGetDomaine: state.getAllDomainesReducer.loading,
    resultGetDomaine: state.getAllDomainesReducer.result,
    errorGetDomaine: state.getAllDomainesReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,

    postFaqAction,
    postFaqReset,

    getAllFaqAction,
    getAllFaqReset,

    getAllPostsAction,
    getAllPostsReset
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Faq));
