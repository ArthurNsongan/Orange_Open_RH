import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {useHistory} from "react-router-dom";
import {Input} from "../../../components/Input";
import {getAllDomaineAction} from "../../../redux/api/DomaineApi";
import {useDropzone} from 'react-dropzone';
import * as Utils from '../../../utils/index';
import {Config} from "../../../config/ServerConfig";
import {Constant} from "../../../config/Constant";
import {toast} from 'react-toastify';
import {Page, Pages, Wizard,} from "react-hook-form-wizard";
import * as moment from 'moment';
import {Helmet} from "react-helmet";
import {postJobOfferAction, postJobOfferReset} from "../../../redux/api/JobOfferApi";
import {uploadImageAction} from "../../../redux/api/ImageApi";
import _ from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarTimes, faFileContract, faGraduationCap, faSitemap, faUsers} from "@fortawesome/free-solid-svg-icons";
import Interweave from "interweave";
import RichTextEditor from "../../../components/RichTextEditor";

let route = require('../../../utils/route');

function NewJobOffer(props) {
    const {t} = useTranslation();
    /*
        const {register, handleSubmit, errors} = useForm();
    */
    let history = useHistory();
    const editor = useRef(null);
    const [itemStepper, setItemStepper] = useState(1);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(null);
    const [poste, setPoste] = useState('');
    const [contrat, setContrat] = useState(t(Constant.contratType[0]));
    const [nbrePlace, setNbrePlace] = useState(1);
    const [dateEcheance, setDateEcheance] = useState(null);
    const [direction, setDirection] = useState('');
    const [thematique, setThematique] = useState(1);
    const [image, setImage] = useState(new FormData());
    const [contenu, setContenu] = useState('');
    const [featured, setFeatured] = useState(0);
    const [isDataSubmit, setIsDataSubmit] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [files, setFiles] = useState([]);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: ".jpeg,.png,.gif,.jpg,.svg",
        maxFiles: 1,
        multiple: false,
        onDrop: acceptedFiles => {
            console.log(acceptedFiles);
            acceptedFiles.map(file => {
                let imageToSend = new FormData();
                imageToSend.append("file", file);
                props.uploadImageAction(imageToSend);
            });
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const style = useMemo(() => ({
        ...Utils.baseStyle,
        ...(isDragActive ? Utils.activeStyle : {}),
        ...(isDragAccept ? Utils.acceptStyle : {}),
        ...(isDragReject ? Utils.rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const Thumbs = files.map(file => (
        <div style={Utils.thumbStyle} key={file.name}>
            <div style={Utils.thumbInnerStyle}>
                {
                    props.loadingUpdloadPhoto &&
                    <div className="d-flex text-center justify-content-center thumb-loader">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">{t('common.loading')}</span>
                        </div>
                    </div>
                }
                <img
                    src={file.preview}
                    style={Utils.imgStyle}
                    loading="lazy"
                />
            </div>
        </div>
    ));

    const renderPreview = () => (
        <>
            <h2 id="newsLeaderTitle">{title}</h2>
            <img className="img-fluid"
                 loading="lazy"
                 src={!_.isNil(props.resultUploadImage) ? (Config.imageFolder + props.resultUploadImage.imageName) : "https://picsum.photos/800/400"}/>

            <div className="mt-3">
                <hr/>

                <div className="d-flex flex-row justify-content-between">

                    <div className="d-flex col-4 flex-column elt-border-left">

                        <div className="d-flex flex-column w-100">
                            <div className="mb-1 mr-2">
                                <FontAwesomeIcon icon={faGraduationCap} className="mr-1"/>
                                <span className="h5">{t('add_new_job.job_post')}</span>
                            </div>
                            <span className="text-muted">{poste}</span>
                        </div>

                        <div className="d-flex flex-column w-100 mt-3">
                            <div className="mb-1 mr-2">
                                <FontAwesomeIcon icon={faFileContract} className="mr-1"/>
                                <span className="h5">{t('add_new_job.job_contract_type')}</span>
                            </div>
                            <span className="text-muted">{contrat}</span>
                        </div>

                    </div>

                    <div className="d-flex col-4 flex-column elt-border-left">

                        <div className="d-flex flex-column w-100">
                            <div className="mb-1 mr-2">
                                <FontAwesomeIcon icon={faUsers} className="mr-1"/>
                                <span className="h5">{t('add_new_job.job_count')}</span>
                            </div>
                            <span className="text-muted">{nbrePlace}</span>
                        </div>

                        <div className="d-flex flex-column w-100 mt-3">
                            <div className="mb-1 mr-2">
                                <FontAwesomeIcon icon={faSitemap} className="mr-1"/>
                                <span className="h5">{t('add_new_job.job_direction')}</span>
                            </div>
                            <span className="text-muted">{direction}</span>
                        </div>

                    </div>

                    <div className="d-flex col-4 flex-column elt-border-left">

                        <div className="d-flex flex-column w-100">
                            <div className="mb-1 mr-2">
                                <FontAwesomeIcon icon={faCalendarTimes} className="mr-1"/>
                                <span className="h5">{t('add_new_job.job_date_echeance')}</span>
                            </div>
                            <span className="text-muted">
                                {dateEcheance !== null ? moment(dateEcheance).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD")}
                            </span>
                        </div>

                    </div>

                </div>

                <div className="mt-4">
                    <Interweave content={contenu}/>
                </div>
            </div>

        </>
    );

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const onSubmitOffer = () => {
        setIsDataSubmit(true);
        props.postJobOfferAction({
            rhContentTitle: title,
            rhContentDescription: contenu,
            rhContentPriorityLevel: featured,
            rhContentCategoryId: Constant.jobOfferID,
            rhContentDomaineId: parseInt(thematique),
            rhContentPrincipalLink: props.resultUploadImage !== null ? props.resultUploadImage.imageName : "",
            rhContentDatePublish: date !== null ? moment(date).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
            userId: Utils.getUserConnected().userId,
            rhContentJobPost: poste,
            rhContentJobDeadLineReceiveCandidate: dateEcheance !== null ? moment(dateEcheance).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
            rhContentJobContractType: contrat,
            rhContentJobPostNumber: nbrePlace,
            rhContentJobDirection: direction
        });
    };

    useEffect(() => {
        props.getAllDomaineAction();
    }, []);

    useEffect(() => {
        console.log(props.result);
        if (props.result !== null) {
            toast.dark(t('add_new_job.success'), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            history.push(route.jobOffer.root);
            props.postJobOfferReset();
        }
    }, [props]);


    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t("add_new_job.title")}`}</title>
            </Helmet>
            <nav role="navigation" className="o-stepbar" aria-label="Checkout process">
                <p className="float-left mt-2 mr-2 font-weight-bold d-sm-none">{t('common.step')}</p>
                <ol>
                    <li className={`stepbar-item ${itemStepper === 1 && "current"}`}>
                        <a className="stepbar-link" href="#" title="1. Sign in">{t('add_new_job.job_infos')}</a>
                    </li>
                    <li className={`stepbar-item ${itemStepper === 2 && "current"}`}>
                        <a className="stepbar-link" href="#" title="2. Review"
                           aria-current="step">{t('add_new_job.job_settings')}</a>
                    </li>
                    <li className={`stepbar-item ${itemStepper === 3 && "current"}`}>
                        <a className="stepbar-link" href="#" title="2. Review"
                           aria-current="step">{t('add_new_job.recap')}</a>
                    </li>
                </ol>
            </nav>
            <div className="my-5">
                <div className="container-fluid">
                    <h1>{t("add_new_job.title")}</h1>
                </div>

                <Wizard
                    useFormArgs={{mode: "blur"}}
                    onSubmit={onSubmitOffer}
                    enableDevTool={false}
                    onSubmit={({dataContext, formContext, wizardContext}) => {
                        console.log("");
                    }}
                >

                    <Pages>
                        <Page>
                            {({
                                  dataContext: {state},
                                  formContext: {register, errors, handleSubmit},
                                  wizardContext: {activePage, nextPage, previousPage},
                              }) => {
                                return (
                                    <section className="container-fluid">
                                        <div className="row">
                                            <div className="col">
                                                <form className="row" id="PostAdminEditForm">
                                                    <div className="col-12 col-lg-4">
                                                        <Input wrapperClass="form-group"
                                                               inputClass="form-control"
                                                               type="text"
                                                               name="title"
                                                               required
                                                               ref={register({required: true, maxLength: 255})}
                                                               id="title"
                                                               value={title}
                                                               onChange={(e) => setTitle(e.target.value)}
                                                               error={errors.hasOwnProperty("title")}
                                                               errorText={t('error.required_field')}
                                                               labelText={t('add_new_job.job_title')}
                                                               maxLength="255"
                                                        />

                                                        <Input wrapperClass="form-group"
                                                               inputClass="form-control"
                                                               type="date"
                                                               name="date"
                                                               id="date"
                                                               value={date}
                                                               onChange={(e) => {
                                                                   setDate(e.target.value);
                                                                   console.log(e.target.value);
                                                               }}
                                                               errorText={t('error.date_incorrect')}
                                                               labelText={t('add_post.publication_date')}
                                                               title={t('add_post.expected_format')}
                                                        >
                                                        <span className="form-text small text-muted"
                                                              id="date-format">{t('add_post.expected_format')}</span>
                                                        </Input>

                                                        <div className="form-group">
                                                            <label htmlFor="postThematique"
                                                                   className="is-required">{t('common.thematique')}</label>
                                                            {
                                                                props.loadingDomaine ?
                                                                    <select className="custom-select"
                                                                            id="postThematique" disabled>
                                                                    </select> :
                                                                    props.resultDomaine !== null &&
                                                                    <select className="custom-select"
                                                                            id="postThematique"
                                                                            onChange={event => setThematique(event.target.value)}>
                                                                        {
                                                                            props.resultDomaine.map((domaine, index) => (
                                                                                <option
                                                                                    value={domaine.rhContentDomaineId}
                                                                                    key={`domaine${index}`}>{domaine.rhContentDomaineName}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                            }

                                                        </div>

                                                        <div className="form-group mb-3">
                                                            <label htmlFor="postThematique"
                                                                   className={`is-required ${(files.length === 0) && "is-invalid"}`}>{t('add_post.image')}</label>
                                                            <div {...getRootProps({style})}>
                                                                <input {...getInputProps()} />
                                                                {files.length === 0 &&
                                                                <p>{t('add_post.drad_drop_or_select')}</p>}
                                                                {Thumbs}
                                                            </div>

                                                            {files.length === 0 ?
                                                                isDataSubmit ?
                                                                    <div className="invalid-feedback">
                                                                        {t('error.image_required')}
                                                                    </div> : null : null}

                                                        </div>

                                                        <div className="submit mt-8">

                                                            <button className="btn btn-primary"
                                                                    onClick={handleSubmit(() => {
                                                                        nextPage();
                                                                        setItemStepper(itemStepper + 1);
                                                                    })}>{t('common.next')}</button>
                                                        </div>

                                                        {
                                                            props.error !== null &&
                                                            <div className="alert alert-danger mt-1" role="alert">
                                                <span className="alert-icon"><span
                                                    className="sr-only">Danger</span></span>
                                                                <p>{props.error}</p>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-12 col-lg-8">
                                                        <div className="form-group required">
                                                            <label htmlFor="PostContent"
                                                                   className="is-required">{t('add_new_job.job_content')}</label>
                                                            <RichTextEditor ref={editor}
                                                                            value={contenu}
                                                                            onBlur={event => setContenu(event.target.innerHTML)} // preferred to use only this option to update the content for performance reasons
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                );
                            }}
                        </Page>
                        <Page>
                            {({
                                  dataContext: {state},
                                  formContext: {register, errors, handleSubmit},
                                  wizardContext: {activePage, nextPage, previousPage},
                              }) => {
                                return (
                                    <section className="container-fluid">
                                        <div className="row">
                                            <div className="col">
                                                <form className="row" id="PostAdminEditForm">
                                                    <div className="col-6 col-lg-6">

                                                        <Input wrapperClass="form-group"
                                                               inputClass="form-control"
                                                               type="text"
                                                               name="poste"
                                                               required
                                                               ref={register({required: true, maxLength: 255})}
                                                               id="poste"
                                                               value={poste}
                                                               onChange={(e) => setPoste(e.target.value)}
                                                               error={errors.hasOwnProperty("poste")}
                                                               errorText={t('error.required_field')}
                                                               labelText={t('add_new_job.job_post')}
                                                               maxLength="255"
                                                        />

                                                        <div className="form-group">
                                                            <label htmlFor="postContrat"
                                                                   className="is-required">{t('add_new_job.job_contract_type')}</label>

                                                            <select className="custom-select"
                                                                    id="postContrat"
                                                                    onChange={event => setContrat(event.target.value)}>
                                                                {
                                                                    Constant.contratType.map((contrat, index) => (
                                                                        <option
                                                                            value={t(contrat)}
                                                                            key={`contrat${index}`}>{t(contrat)}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>

                                                        <Input wrapperClass="form-group"
                                                               inputClass="form-control"
                                                               type="text"
                                                               name="direction"
                                                               required
                                                               ref={register({required: true, maxLength: 255})}
                                                               id="direction"
                                                               value={direction}
                                                               onChange={(e) => setDirection(e.target.value)}
                                                               error={errors.hasOwnProperty("direction")}
                                                               errorText={t('error.required_field')}
                                                               labelText={t('add_new_job.job_direction')}
                                                               maxLength="255"
                                                        />

                                                        <div className="submit mt-8">

                                                            <button className="btn btn-secondary"
                                                                    onClick={() => {
                                                                        previousPage();
                                                                        setItemStepper(itemStepper - 1);
                                                                    }}>{t('common.previous')}</button>

                                                            <button className="btn btn-primary"
                                                                    onClick={handleSubmit(() => {
                                                                        nextPage();
                                                                        setItemStepper(itemStepper + 1);
                                                                    })}>{t('common.next')}</button>
                                                        </div>

                                                    </div>

                                                    <div className="col-6 col-lg-6">

                                                        <Input wrapperClass="form-group"
                                                               inputClass="form-control"
                                                               type="number"
                                                               name="nbrePlace"
                                                               required
                                                               ref={register({required: true, maxLength: 255})}
                                                               id="nbrePlace"
                                                               value={nbrePlace}
                                                               onChange={(e) => setNbrePlace(e.target.value)}
                                                               error={errors.hasOwnProperty("nbrePlace")}
                                                               errorText={t('error.required_field')}
                                                               labelText={t('add_new_job.job_count')}
                                                               maxLength="255"
                                                        />

                                                        <Input wrapperClass="form-group"
                                                               inputClass="form-control"
                                                               type="date"
                                                               name="dateEcheance"
                                                               id="dateEcheance"
                                                               value={dateEcheance}
                                                               onChange={(e) => {
                                                                   setDateEcheance(e.target.value);
                                                               }}
                                                               errorText={t('error.date_incorrect')}
                                                               labelText={t('add_new_job.job_date_echeance')}
                                                               title={t('add_post.expected_format')}
                                                        >
                                                        <span className="form-text small text-muted"
                                                              id="date-format">{t('add_post.expected_format')}</span>
                                                        </Input>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                );
                            }}
                        </Page>
                        <Page>
                            {({
                                  dataContext: {state: {data}},
                                  formContext: {register, errors, handleSubmit},
                                  wizardContext: {activePage, nextPage, previousPage},
                              }) => {
                                return (
                                    <section className="container-fluid">
                                        <div className="row">
                                            <div className="col">

                                                {renderPreview()}

                                                <button className="btn btn-secondary"
                                                        onClick={() => {
                                                            previousPage();
                                                            setItemStepper(itemStepper - 1);
                                                        }}>{t('common.previous')}</button>

                                                {
                                                    props.loading ?
                                                        <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"/>
                                                            <span className="sr-only">{t('common.loading')}</span>
                                                        </button> :
                                                        <button className="btn btn-primary"
                                                                onClick={handleSubmit(() => {
                                                                    onSubmitOffer();
                                                                })}>{t('common.post')}</button>
                                                }
                                            </div>
                                        </div>
                                    </section>
                                );
                            }}
                        </Page>
                    </Pages>
                </Wizard>
            </div>
        </>
    )
};

const mapStateToProps = state => ({
    loading: state.postJobOfferReducer.loading,
    result: state.postJobOfferReducer.result,
    error: state.postJobOfferReducer.error,

    loadingDomaine: state.getAllDomainesReducer.loading,
    resultDomaine: state.getAllDomainesReducer.result,
    errorDomaine: state.getAllDomainesReducer.error,

    loadingUploadImage: state.uploadImageReducer.loading,
    resultUploadImage: state.uploadImageReducer.result,
    errorUploadImage: state.uploadImageReducer.error,

});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllDomaineAction,
    uploadImageAction,

    postJobOfferAction,
    postJobOfferReset

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewJobOffer);
