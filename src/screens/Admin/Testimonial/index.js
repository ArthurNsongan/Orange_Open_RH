import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {NavLink, useParams, useHistory, withRouter} from "react-router-dom";
import {Input} from "../../../components/Input";
import {TextArea} from "../../../components/TextArea/TextArea";
import {useForm} from "react-hook-form";
import {bindActionCreators} from 'redux';
import {Constant} from "../../../config/Constant";
import * as moment from "moment";
import {
    getAllPostsAction,
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,
    getAllPostsReset
} from "../../../redux/api/PostsApi";
import {connect} from "react-redux";
import {postFaqAction, postFaqReset} from "../../../redux/api/FaqApi";
import {postTestimonialAction, postTestimonialReset} from "../../../redux/api/TestimonialApi";
import * as Utils from "../../../utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {getAllDomaineAction} from "../../../redux/api/DomaineApi";

let route = require('../../../utils/route');

function AdminTestimonial(props) {
    const {t} = useTranslation();
    let {id, page, domaine} = useParams();
    const {register, handleSubmit, errors} = useForm();
    let history = useHistory();

    const [currentPath, setCurrentPath] = useState(props.location.pathname);
    const [thematique, setThematique] = useState(1);
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        props.getAllDomaineAction();
        props.getAllPostsReset();
        props.getAllPostsAction(Constant.testimonialID);
    }, []);

    const onSubmitFaq = () => {
        props.postFaqAction({
            rhContentTitle: question,
            rhContentDescription: "",
            rhContentCategoryId: Constant.faqID,
            rhContentDomaineId: parseInt(thematique),
            rhContentDatePublish: moment(new Date()).format("YYYY-MM-DD"),
            userId: Utils.getUserConnected().userId
        });
    };

    const handleSearch = () => {
        console.log(search);
    };

    const renderTestimonialTable = (data) => (
        <table className="table table-striped table-responsive-lg table-hover has-icon col-12">

            <thead>
            <tr>
                <th className="text-center">{t('common.status')}</th>
                <th className="text-center">{t('add_post.publication_date')}</th>
                <th className="text-center">{t('common.author')}</th>
                <th className="text-center">{t('common.domain')}</th>
                <th className="text-center">{t('testimonial.title')}</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map((post, index) => (
                    <tr key={index} className="faq-item" onClick={() => {
                    }}>
                        <td className="text-center">
                            {
                                post.rhContentIsOK ?
                                    <FontAwesomeIcon icon={faCheck} color='var(--success)' className="mr-1"/> :
                                    <FontAwesomeIcon icon={faTimes} color='var(--danger)' className="mr-1"/>
                            }
                        </td>
                        <th className="text-center">{moment(post.rhContentDateCeated).format("lll")}</th>
                        <th className="text-center">{post.user.userName}</th>
                        <th className="text-center">{post.rhContentDomaine.rhContentDomaineName}</th>
                        <th className="text-center">{Utils.cutString(post.rhContentDescription, 100)}</th>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );

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

                                    <div className="col-12">
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

                                    </div>

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

                                    <div className="col-12">
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
                                    </div>

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
            <div className="container-fluid">
                <Helmet>
                    <title>{`${t("app.name")} - ${t('testimonial.title')}`}</title>
                </Helmet>
                <h1>{t("testimonial.title")}</h1>

                <div className="row">
                    <div className="col-12 o-layer">
                        {renderModalAddFaq()}
                        <div className="row mb-3">

{/*                            <div className="col-auto mr-auto">
                                <button type="button" className="btn btn-primary" data-toggle="modal"
                                        data-target="#addFaqModal">
                                    <span className="icon icon-Add" aria-hidden="true"/>
                                    {t('faq.new_faq')}
                                </button>
                            </div>*/}
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
                            <div className="media-body">
                                {props.result !== null && renderTestimonialTable(props.result)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


const mapStateToProps = state => ({
    loading: state.getAllPostsReducer.loading,
    result: state.getAllPostsReducer.result,
    error: state.getAllPostsReducer.error,

    loadingPostGlossary: state.postGlossaryReducer.loading,
    resultPostGlossary: state.postGlossaryReducer.result,
    errorPostGlossary: state.postGlossaryReducer.error,

    loadingGetDomaine: state.getAllDomainesReducer.loading,
    resultGetDomaine: state.getAllDomainesReducer.result,
    errorGetDomaine: state.getAllDomainesReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPostsAction,
    getAllPostsReset,

    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,

    getAllDomaineAction,
    postTestimonialAction,
    postTestimonialReset,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminTestimonial));

