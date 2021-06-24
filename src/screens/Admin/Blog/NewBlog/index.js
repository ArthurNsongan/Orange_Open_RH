import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {useHistory} from "react-router-dom";
import {Input} from "../../../../components/Input";
import {getAllDomaineAction} from "../../../../redux/api/DomaineApi";
import {useDropzone} from 'react-dropzone';
import * as Utils from '../../../../utils';
import {Constant} from "../../../../config/Constant";
import {toast} from 'react-toastify';
import * as moment from 'moment';
import {Helmet} from "react-helmet";
import {postBlogAction, postBlogReset} from "../../../../redux/api/BlogApi";
import {uploadImageAction} from "../../../../redux/api/ImageApi";
import RichTextEditor from "../../../../components/RichTextEditor";

let route = require('../../../../utils/route');

function NewBlog(props) {
    const {t} = useTranslation();
    const {register, handleSubmit, errors} = useForm();
    let history = useHistory();
    const editor = useRef(null);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(null);
    const [dateFin, setDateFin] = useState(null);
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
                    loading="lazy"
                    style={Utils.imgStyle}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const onSubmitPost = () => {
        setIsDataSubmit(true);
        props.postBlogAction({
            rhContentTitle: title,
            rhContentDescription: contenu,
            rhContentPriorityLevel: featured,
            rhContentCategoryId: Constant.blogID,
            rhContentDomaineId: parseInt(thematique),
            rhContentPrincipalLink: props.resultUploadImage !== null ? props.resultUploadImage.imageName : "",
            rhContentDatePublish: date !== null ? moment(date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
            rhContentDateOnPublish: dateFin === null ? moment(moment().add(1, 'y')).format("YYYY-MM-DD") : moment(dateFin).format("YYYY-MM-DD"),
            userId: Utils.getUserConnected().userId
        });
    }

    useEffect(() => {
        props.getAllDomaineAction();
    }, []);

    useEffect(() => {
        console.log(props.result);
        if (props.result !== null) {
            toast.dark(t('add_new_blog.success'), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            history.push(route.blog.root);
            props.postBlogReset();
        }
        if (props.error !== null) {
            toast.error(t(Utils.displayErrorRequest(props.error)), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            props.postBlogReset();
        }

        if (props.resultDomaine !== null) {
            console.log("Domaine has lodaded",props.resultDomaine.filter(domaine => domaine.rhContentCategoryId === Constant.blogID)[0].rhContentDomaineId);
            setThematique(props.resultDomaine.filter(domaine => domaine.rhContentCategoryId === Constant.blogID)[0].rhContentDomaineId);
        }
    }, [props]);

    console.log("Thematique", parseInt(thematique));

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t("add_new_blog.title")}`}</title>
            </Helmet>
            <div className="container-fluid">
                <h1>{t("add_new_blog.title")}</h1>
            </div>

            <section className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form className="row" id="PostAdminEditForm" onSubmit={handleSubmit(onSubmitPost)}>
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
                                       labelText={t('add_new_blog.blog_title')}
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

                                <Input wrapperClass="form-group"
                                       inputClass="form-control"
                                       type="date"
                                       name="dateFin"
                                       id="dateFin"
                                       value={dateFin}
                                       onChange={(e) => {
                                           setDateFin(e.target.value);
                                           console.log(e.target.value);
                                       }}
                                       error={isDataSubmit ? dateFin !== null : false}
                                       errorText={t('error.date_incorrect')}
                                       labelText={t('add_post.publication_end_date')}
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
                                                    props.resultDomaine.filter(domaine => domaine.rhContentCategoryId === Constant.blogID)
                                                        .map((domaine, index) => (
                                                            <option value={domaine.rhContentDomaineId}
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
                                        {files.length === 0 && <p>{t('add_post.drad_drop_or_select')}</p>}
                                        {Thumbs}
                                    </div>

                                    {files.length === 0 ?
                                        isDataSubmit ?
                                            <div className="invalid-feedback">
                                                {t('error.image_required')}
                                            </div> : null : null}

                                </div>

                                <fieldset className="form-group">
                                    <div id="radio-action" className="form-inline">

                                        <div className="custom-control custom-switch">
                                            <input type="checkbox"
                                                   onChange={(e) => setFeatured(e.target.checked ? 1 : 0)}
                                                   className="custom-control-input" id="customSwitch1"/>
                                            <label className="custom-control-label"
                                                   htmlFor="customSwitch1">{t('add_post.featured')}</label>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="submit mt-3">

                                    {
                                        props.loading ?
                                            <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"/>
                                                <span className="sr-only">{t('common.loading')}</span>
                                            </button> :
                                            <button className="btn btn-primary"
                                                    onSubmit={handleSubmit(onSubmitPost)}>{t('common.post')}</button>
                                    }
                                </div>
                            </div>
                            <div className="col-12 col-lg-8">
                                <div className="form-group required">
                                    <label htmlFor="PostContent"
                                           className="is-required">{t('add_post.contenu')}</label>
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
        </>
    )
};

const mapStateToProps = state => ({
    loading: state.postBlogReducer.loading,
    result: state.postBlogReducer.result,
    error: state.postBlogReducer.error,

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

    postBlogAction,
    postBlogReset

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewBlog);
