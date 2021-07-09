import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {useHistory, withRouter, useParams} from "react-router-dom";
import {Input} from "../../../../components/Input";
import {getAllDomaineAction} from "../../../../redux/api/DomaineApi";
import {
    addNewPostAction,
    addNewPostReset,
    editPostAction,
    editPostReset,
    getPostByIdAction
} from "../../../../redux/api/PostsApi";
import {useDropzone} from 'react-dropzone';
import * as Utils from '../../../../utils';
import {Constant} from "../../../../config/Constant";
import './style.css';
import {toast} from 'react-toastify';
import * as moment from 'moment';
import {Helmet} from "react-helmet";
import {uploadImageAction} from "../../../../redux/api/ImageApi";
import Dropzone from 'react-dropzone-uploader'
import RichTextEditor from "../../../../components/RichTextEditor";
import {Config} from "../../../../config/ServerConfig";
import ReactPlayer from "react-player";
import $ from "jquery";

let route = require('../../../../utils/route');

function EditPost(props) {
    const {t} = useTranslation();
    const {register, handleSubmit, errors} = useForm();
    let history = useHistory();
    let {id, page, domaine} = useParams();
    const editor = useRef(null);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(null);
    const [dateFin, setDateFin] = useState(null);
    const [thematique, setThematique] = useState(1);
    const [video, setVideo] = useState(null);
    const [contenu, setContenu] = useState('');
    const [featured, setFeatured] = useState(0);
    const [hasPieceJointe, setHasPieceJointe] = useState(false);
    const [piecesJointes, setPieceJointe] = useState([]);
    const [isDataSubmit, setIsDataSubmit] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [isImageSelected, setIsImageSelected] = useState(true);
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
            console.log("After upload", props.resultUploadImage);
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
                />
            </div>
        </div>
    ));

    const ThumbsLoadedImage = () => (
        <div style={Utils.thumbStyle}>
            <div style={Utils.thumbInnerStyle}>
                {
                    props.loadingGetPostById &&
                    <div className="d-flex text-center justify-content-center thumb-loader">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">{t('common.loading')}</span>
                        </div>
                    </div>
                }
                {props.resultGetPostById !== null &&
                <img
                    src={Config.imageFolder + props.resultGetPostById.rhContentPrincipalLink}
                    style={Utils.imgStyle}
                    className="img-post"
                />
                }

            </div>
        </div>
    );

    const ThumbsLoadedVideo = () => (
        <div style={Utils.thumbStyleVideo}>
            <div style={Utils.thumbInnerStyleVideo}>
                {
                    props.loadingGetPostById &&
                    <div className="d-flex text-center justify-content-center thumb-loader">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">{t('common.loading')}</span>
                        </div>
                    </div>
                }
                {props.resultGetPostById !== null &&
                <ReactPlayer
                    className="img-fluid img-reponsive video-preview"
                    width="100%"
                    controls
                    height="200px"
                    url={Config.imageFolder + props.resultGetPostById.rhContentPrincipalLink}
                />
                }
            </div>
        </div>
    );

    console.log("POST ID", id);
    const getVideoUploadParams = ({meta}) => {
        return {url: Config.uploadImageUrl}
    };

    const handleFileUploadChangeStatus = ({meta, file, xhr}, status) => {
        console.log(status, meta, file);
        if (status === "done") {
            let response = JSON.parse(xhr.response);
            setVideo(response.imageName);
        }
    };

    const handlePiecesJointeChangeStatus = ({meta, file, xhr}, status) => {
        let piecesJointesUpload = piecesJointes;
        if (status === "done") {
            let response = JSON.parse(xhr.response);
            piecesJointesUpload.push({imageLink: response.imageName});
            setPieceJointe(piecesJointesUpload);
        }
    };

    const handleFileSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove());
    };

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);


    const onEditPost = () => {
        setIsDataSubmit(true);
        console.log("EDIT_OCCURED");
        if(props.resultUploadImage != null)
            console.log("Upload Image : " + props.resultUploadImage.imageName);
        props.editPostAction({
            rhContentTitle: title,
            rhContentDescription: contenu,
            rhContentPriorityLevel: featured,
            rhContentCategoryId: Constant.publicationID,
            rhContentDomaineId: parseInt(thematique),
            rhContentPrincipalLink: isImageSelected ?
                props.resultUploadImage !== null ?
                    props.resultUploadImage.imageName :
                    props.resultGetPostById.rhContentPrincipalLink 
                :
                video !== null ?
                    video : props.resultGetPostById.rhContentPrincipalLink,
            rhContentDatePublish: date !== null ? moment(date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
            rhContentDateOnPublish: dateFin === null ? moment(moment().add(1, 'y')).format("YYYY-MM-DD") : moment(dateFin).format("YYYY-MM-DD"),
            userId: Utils.getUserConnected().userId,
            images: piecesJointes
        }, props.resultGetPostById.rhContentId);
    };

    useEffect(() => {
        props.getAllDomaineAction();
        props.getPostByIdAction(id);
    }, []);

    useEffect(() => {
        if (props.result !== null) {
            toast.dark(t('posts.add_new_success'), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            history.push(route.post.admin_post);
            props.editPostReset();
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
            props.editPostReset();
        }

        if (props.resultGetPostById !== null) {
            setTitle(props.resultGetPostById.rhContentTitle);
            setDateFin(moment(props.resultGetPostById.rhContentDateOnPublish).format("YYYY-MM-DD"));
            setDate(moment(props.resultGetPostById.rhContentDatePublish).format("YYYY-MM-DD"));
            setContenu(props.resultGetPostById.rhContentDescription);
            if (!Utils.isImageFileUrl(props.resultGetPostById.rhContentPrincipalLink)) {
                window.$("#video-tab").trigger("click");
                setIsImageSelected(false);
            }
        }
    }, [props]);

    useEffect(() => {
        window.$(".img-post").initImageNotLoadPlaceHolder();
        console.log("files", files); 
    });

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t("posts.new_post")}`}</title>
            </Helmet>
            <div className="container-fluid">
                <h1>{t("common.edit_post")}</h1>
            </div>

            <section className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form className="row" id="PostAdminEditForm" onSubmit={handleSubmit(onEditPost)}>
                            <div className="col-12 col-lg-3">

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
                                       labelText={t('add_post.title')}
                                       maxLength="255"
                                />

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
                                                        <option value={domaine.rhContentDomaineId}
                                                                selected={props.resultGetPostById !== null ? props.resultGetPostById.rhContentDomaineId === domaine.rhContentDomaineId : false}
                                                                key={`domaine${index}`}>{domaine.rhContentCategory.rhContentCategoryName + " - " + domaine.rhContentDomaineName}</option>
                                                    ))
                                                }
                                            </select>
                                    }

                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <Input wrapperClass="form-group"
                                               inputClass="form-control"
                                               type="date"
                                               name="date"
                                               id="date"
                                               value={date}
                                               error={isDataSubmit ? dateFin === null : false}
                                               onChange={(e) => {
                                                   setDate(e.target.value);
                                               }}
                                               errorText={t('error.date_incorrect')}
                                               labelText={t('add_post.publication_date')}
                                               title={t('add_post.expected_format')}
                                        >
                                    <span className="form-text small text-muted"
                                          id="date-format">{t('add_post.expected_format')}</span>
                                        </Input>
                                    </div>

                                    <div className="col-6">
                                        <Input wrapperClass="form-group"
                                               inputClass="form-control"
                                               type="date"
                                               name="dateFin"
                                               id="dateFin"
                                               value={dateFin}
                                               onChange={(e) => {
                                                   setDateFin(e.target.value);
                                               }}
                                               error={isDataSubmit ? dateFin === null : false}
                                               errorText={t('error.date_incorrect')}
                                               labelText={t('add_post.publication_end_date')}
                                               title={t('add_post.expected_format')}
                                        >
                                    <span className="form-text small text-muted"
                                          id="date-format">{t('add_post.expected_format')}</span>
                                        </Input>
                                    </div>
                                </div>

                                <div className="form-group mb-3">

                                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation"
                                            onClick={() => setIsImageSelected(true)}>
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#image"
                                               role="tab" aria-controls="home"
                                               aria-selected="true">{t('common.image')}</a>
                                        </li>
                                        <li className="nav-item" role="presentation"
                                            onClick={() => setIsImageSelected(false)}>
                                            <a className="nav-link" id="video-tab" data-toggle="tab" href="#video"
                                               role="tab" aria-controls="profile"
                                               aria-selected="false">{t('common.video')}</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" style={{padding: 0, border: 0}}>
                                        <div className="tab-pane fade show active" id="image" role="tabpanel"
                                             aria-labelledby="image-tab">
                                            <label htmlFor="postThematique"
                                                   className={`is-required ${(files.length === 0) && "is-invalid"}`}>{t('add_post.image')}</label>
                                            <div {...getRootProps({style})}>
                                                <input {...getInputProps()} />
                                                {files.length === 0 && <p>{t('add_post.drad_drop_or_select')}</p>}
                                                {(props.resultGetPostById !== null && files.length === 0) ? Utils.isImageFileUrl(props.resultGetPostById.rhContentPrincipalLink) &&
                                                    <ThumbsLoadedImage/> : Thumbs}
                                            </div>

                                            {props.resultGetPostById !== null &&
                                            files.length === 0 && !Utils.isImageFileUrl(props.resultGetPostById.rhContentPrincipalLink) ?
                                                isDataSubmit ?
                                                    <div className="invalid-feedback">
                                                        {t('error.image_required')}
                                                    </div> : null : null}
                                        </div>
                                        <div className="tab-pane fade" id="video" role="tabpanel"
                                             aria-labelledby="video-tab">
                                            <label htmlFor="postThematique"
                                                   className={`is-required ${(files.length === 0) && "is-invalid"}`}>{t('add_post.video')}</label>
                                            <ThumbsLoadedVideo/>
                                            <Dropzone
                                                getUploadParams={getVideoUploadParams}
                                                onChangeStatus={handleFileUploadChangeStatus}
                                                onSubmit={handleFileSubmit}
                                                inputContent={(files, extra) => (extra.reject ? t('common.video_only') : t('add_post.drad_drop_or_select'))}
                                                styles={{
                                                    dropzone: {
                                                        flex: "1 1 0%",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        padding: "10px",
                                                        borderWidth: "2px",
                                                        borderRadius: "2px",
                                                        borderColor: "rgb(238, 238, 238)",
                                                        borderStyle: "dashed",
                                                        backgroundColor: "rgb(250, 250, 250)",
                                                        color: "rgb(189, 189, 189)",
                                                        outline: "none",
                                                        transition: "border 0.24s ease-in-out 0s",
                                                        position: "normal",
                                                        minHeight: "75px"
                                                    },
                                                    inputLabel: {
                                                        color: "rgb(189, 189, 189)",
                                                        fontSize: "1rem",
                                                        fontWeight: "normal",
                                                        padding: "10px"
                                                    },
                                                    submitButtonContainer: {display: "none"},
                                                    dropzoneReject: {borderColor: '#F19373', backgroundColor: '#F1BDAB'}
                                                }}
                                                accept="video/*,image/*"
                                                submitButtonContent={null}
                                                maxFiles={1}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-6">
                                        <fieldset className="form-group">
                                            <div id="radio-action" className="form-inline">
                                                <div className="custom-control custom-switch right">
                                                    <input type="checkbox"
                                                           onChange={(e) => setFeatured(e.target.checked ? 1 : 0)}
                                                           defaultChecked={props.resultGetPostById !== null ? props.resultGetPostById.rhContentPriorityLevel : false}
                                                           className="custom-control-input" id="featured_switch"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="featured_switch">{t('add_post.featured')}</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <div className="col-6">
                                        <fieldset className="form-group">
                                            <div id="radio-action" className="form-inline">
                                                <div className="custom-control custom-switch right">
                                                    <input type="checkbox"
                                                           onChange={(e) => setHasPieceJointe(e.target.checked)}
                                                           defaultChecked={props.resultGetPostById !== null ? props.resultGetPostById.images.length > 0 : false}
                                                           className="custom-control-input" id="piece_jointe_switch"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="piece_jointe_switch">{t('common.piece_jointe')}</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>

                                {
                                    hasPieceJointe &&
                                    <div className="form-group mb-3">
                                        <Dropzone
                                            getUploadParams={getVideoUploadParams}
                                            onChangeStatus={handlePiecesJointeChangeStatus}
                                            onSubmit={handleFileSubmit}
                                            inputContent={(files, extra) => (extra.reject ? t('common.video_only') : t('add_post.drad_drop_or_select'))}
                                            styles={{
                                                dropzone: {
                                                    flex: "1 1 0%",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    padding: "10px",
                                                    borderWidth: "2px",
                                                    borderRadius: "2px",
                                                    borderColor: "rgb(238, 238, 238)",
                                                    borderStyle: "dashed",
                                                    backgroundColor: "rgb(250, 250, 250)",
                                                    color: "rgb(189, 189, 189)",
                                                    outline: "none",
                                                    transition: "border 0.24s ease-in-out 0s",
                                                    position: "normal",
                                                    minHeight: "75px"
                                                },
                                                inputLabel: {
                                                    color: "rgb(189, 189, 189)",
                                                    fontSize: "1rem",
                                                    fontWeight: "normal",
                                                    padding: "10px"
                                                },
                                                submitButtonContainer: {display: "none"},
                                                dropzoneReject: {borderColor: '#F19373', backgroundColor: '#F1BDAB'}
                                            }}
                                            accept="image/*,video/*,.pdf,doc,.docx,.xml,.xlsx,.xslx,.ppt,.pptx,.txt,.csv"
                                            submitButtonContent={null}
                                        />
                                    </div>
                                }

                                <div className="submit mt-3">

                                    {
                                        props.loading ?
                                            <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"/>
                                                <span className="sr-only">{t('common.loading')}</span>
                                            </button> :
                                            <button className="btn btn-primary"
                                                    onSubmit={() => {
                                                        setIsDataSubmit(true);
                                                        handleSubmit(onEditPost);
                                                    }}>{t('common.post')}</button>
                                    }
                                </div>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="form-group required">
                                    <label htmlFor="PostContent"
                                           className="is-required">{t('add_post.contenu')}</label>

                                    <RichTextEditor name="contenu" ref={editor}
                                                    value={contenu}
                                                    onBlur={value => { setContenu(value); } } // preferred to use only this option to update the content for performance reasons
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
    loading: state.modifyPostReducer.loading,
    result: state.modifyPostReducer.result,
    error: state.modifyPostReducer.error,

    loadingDomaine: state.getAllDomainesReducer.loading,
    resultDomaine: state.getAllDomainesReducer.result,
    errorDomaine: state.getAllDomainesReducer.error,

    loadingUploadImage: state.uploadImageReducer.loading,
    resultUploadImage: state.uploadImageReducer.result,
    errorUploadImage: state.uploadImageReducer.error,

    loadingGetPostById: state.getPostByIdReducer.loading,
    resultGetPostById: state.getPostByIdReducer.result,
    errorGetPostById: state.getPostByIdReducer.error,

});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllDomaineAction,
    uploadImageAction,

    getPostByIdAction,

    addNewPostAction,
    addNewPostReset,

    editPostAction,
    editPostReset

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));
