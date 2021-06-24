import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {NavLink, useParams, useHistory, withRouter} from "react-router-dom";
import {Input} from "../../../components/Input";
import {TextArea} from "../../../components/TextArea/TextArea";
import {useForm} from "react-hook-form";
import {bindActionCreators} from 'redux';
import {Constant} from "../../../config/Constant";
import * as moment from "../../Glossary";
import $ from "jquery";
import {
    getAllPostsAction,
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,
    getAllPostsReset
} from "../../../redux/api/PostsApi";
import {connect} from "react-redux";
import {postFaqAction, postFaqReset} from "../../../redux/api/FaqApi";
import * as Utils from "../../../utils";
import {getAllDomaineAction} from "../../../redux/api/DomaineApi";
import {validatePublicationAction, validatePublicationReset} from "../../../redux/api/ValidationApi";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

let route = require('../../../utils/route');

function AdminFAQ(props) {
    const {t} = useTranslation();
    let {id, page, domaine} = useParams();
    const {register, handleSubmit, errors} = useForm();
    let history = useHistory();

    const [currentPath, setCurrentPath] = useState(props.location.pathname);
    const [search, setSearch] = useState('');
    const [thematique, setThematique] = useState(1);
    const [answer, setAnswer] = useState('');
    const [answerToModify, setAnswerToModify] = useState('');
    const [questionToModify, setQuestionToModify] = useState('');
    const [thematiqueToModify, setThematiqueToModify] = useState('');
    const [contentId, setContentId] = useState('');
    const [question, setQuestion] = useState('');
    const [enabled, setEnabled] = useState(1);

    const onSubmitFaq = () => {
        props.postFaqAction({
            rhContentTitle: question,
            rhContentDescription: answer,
            rhContentCategoryId: Constant.faqID,
            rhContentDomaineId: parseInt(thematique),
            rhContentDatePublish: moment(new Date()).format("YYYY-MM-DD"),
            userId: Utils.getUserConnected().userId
        });
    };

    const onModifyFaq = () => {
        props.validatePublicationAction({
            rhContentId: contentId,
            rhContentDescription: answerToModify,
            rhContentValidationIsValidated: enabled === 1,
            userId: Utils.getUserConnected().userId
        });
    }

    useEffect(() => {
        console.log(props.result);
        if (props.resultValidatePublication !== null) {
            toast.dark(t('faq.modify_success'), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            history.go(0);
            props.validatePublicationReset();
        }
        if (props.errorValidatePublication !== null) {
            toast.error(props.errorValidatePublication, {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            props.validatePublicationReset();
        }
    }, [props]);

    useEffect(() => {
        props.getAllDomaineAction();
        props.getAllPostsReset();
        props.getAllPostsAction(Constant.faqID);
    }, []);


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
                                                        id="postThematique">
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

    const renderModalModifyFaq = () => (
        <div className="modal fade" id="answerFaqModalLabel" data-backdrop="static" data-keyboard="false" tabIndex="-1"
             aria-labelledby="answerFaqModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addFaqModalLabel">{t('faq.answer_question')}</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span className="sr-only">{t('common.click_to_close')}</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">

                                <form className="row" id="PostAdminEditForm">

                                    <div className="col-12">
                                        <Input wrapperClass="form-group"
                                               inputClass="form-control"
                                               type="text"
                                               disabled
                                               name="postThematiqueToModify"
                                               id="postThematiqueToModify"
                                               value={thematiqueToModify}
                                               errorText={t('error.required_field')}
                                               labelText={t('common.thematique')}
                                               maxLength="255"
                                        />

                                    </div>

                                    <div className="col-12">

                                        <Input wrapperClass="form-group"
                                               inputClass="form-control"
                                               type="text"
                                               disabled
                                               name="questionToAnswer"
                                               required
                                               id="questionToAnswer"
                                               value={questionToModify}
                                               errorText={t('error.required_field')}
                                               labelText={t('faq.question')}
                                               maxLength="255"
                                        />

                                    </div>


                                    <fieldset className="form-group col-12">
                                        <div id="radio-action" className="form-inline">
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox"
                                                       checked={enabled === 1}
                                                       onChange={(e) => setEnabled(e.target.checked ? 1 : 0)}
                                                       className="custom-control-input" id="customSwitch1"/>
                                                <label className="custom-control-label"
                                                       htmlFor="customSwitch1">{t('faq.publish_faq_state')}</label>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className="col-12">
                                        <TextArea wrapperClass="form-group"
                                                  inputClass="form-control"
                                                  name="answerToModify"
                                                  required
                                                  disabled={enabled === 0}
                                                  style={{height: "106px"}}
                                                  id="answerToModify"
                                                  onChange={(e) => setAnswerToModify(e.target.value)}
                                                  value={answerToModify}
                                                  error={answerToModify === ''}
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
                            props.loadingValidatePublication ?
                                <button className="btn btn-primary" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status"
                                              aria-hidden="true"/>
                                    <span className="sr-only">{t('common.loading')}</span>
                                </button> :
                                <button type="button" className="btn btn-primary"
                                        onClick={() => {
                                            if (answerToModify !== '') onModifyFaq();
                                        }}>{t('common.save')}</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    const renderFaqTable = (data) => (
        <table className="table table-striped table-responsive-lg table-hover has-icon col-12">
            {/*
            <caption>Icons table</caption>
*/}
            <thead>
            <tr>
                <th className="text-center">{t('common.status')}</th>
                <th className="text-left">{t('faq.question')}</th>
                <th className="text-left">{t('faq.answer')}</th>
                <th className="text-left">{t('common.domain')}</th>
                <th className="text-left">{t('common.author')}</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map((faq, index) => (
                    <tr key={index} className="faq-item" onClick={() => {
                        $('#btnModal').trigger('click');
                        setContentId(faq.rhContentId);
                        setQuestionToModify(faq.rhContentTitle);
                        setThematiqueToModify(faq.rhContentDomaine.rhContentDomaineName);
                        setAnswerToModify(faq.rhContentDescription);
                    }}>
                        <td className="text-left">
                            {
                                faq.rhContentIsOK ?
                                    <FontAwesomeIcon icon={faCheck} color='var(--success)' className="mr-1"/> :
                                    <FontAwesomeIcon icon={faTimes} color='var(--danger)' className="mr-1"/>
                            }
                        </td>
                        <th className="text-left">{faq.rhContentTitle}</th>
                        <th className="text-left">{Utils.cutString(faq.rhContentDescription, 70)}</th>
                        <th className="text-left">{faq.rhContentDomaine.rhContentDomaineName}</th>
                        <th className="text-left">{faq.user.userName}</th>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );

    const handleSearch = () => {

    }

    return (
        <>
            <div className="container-fluid">
                <Helmet>
                    <title>{`${t("app.name")} - ${t('faq.title')}`}</title>
                </Helmet>
                <h1>{t("faq.title")}</h1>

                <div className="row">
                    <div className="col-12 o-layer">
                        {renderModalAddFaq()}
                        {renderModalModifyFaq()}
                        <button type="button" className="btn btn-primary" data-toggle="modal" id="btnModal"
                                style={{display: "none"}} data-target="#answerFaqModalLabel"/>
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
                            <div className="media-body">
                                {props.result !== null && renderFaqTable(props.result)}
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

    loadingValidatePublication: state.validatePublicationReducer.loading,
    resultValidatePublication: state.validatePublicationReducer.result,
    errorValidatePublication: state.validatePublicationReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPostsAction,
    getAllPostsReset,

    getAllDomaineAction,
    validatePublicationAction,
    validatePublicationReset,

    postFaqAction,
    postFaqReset,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminFAQ));

