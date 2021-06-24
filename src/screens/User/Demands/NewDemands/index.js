import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {useHistory} from "react-router-dom";
import {Input} from "../../../../components/Input";
import {getAllDomaineAction} from "../../../../redux/api/DomaineApi";
import {addNewPostAction, addNewPostReset} from "../../../../redux/api/PostsApi";
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
import {getAllCategoryAction, getAllCategoryReset} from "../../../../redux/api/CategoryApi";

let route = require('../../../../utils/route');

function NewDemand(props) {
    const {t} = useTranslation();
    const {register, handleSubmit, errors} = useForm();
    let history = useHistory();
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
        console.log(status, meta, file);
        if (status === "done") {
            let response = JSON.parse(xhr.response);
            piecesJointesUpload.push({imageLink: response.imageName});
            setPieceJointe(piecesJointesUpload);
        }
    };

    const handleFileSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta));
        allFiles.forEach(f => f.remove());
    };

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);


    const onSubmitPost = () => {
        setIsDataSubmit(true);
        props.addNewPostAction({
            rhContentTitle: title,
            rhContentDescription: contenu,
            rhContentPriorityLevel: featured,
            rhContentDomaineId: parseInt(thematique),
            rhContentPrincipalLink: isImageSelected ? props.resultUploadImage !== null ? props.resultUploadImage.imageName : "" : video,
            rhContentDatePublish: date !== null ? moment(date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
            rhContentDateOnPublish: dateFin === null ? moment(moment().add(1, 'y')).format("YYYY-MM-DD") : moment(dateFin).format("YYYY-MM-DD"),
            userId: Utils.getUserConnected().userId,
            images: piecesJointes
        });
    };

    useEffect(() => {
        props.getAllDomaineAction();
        props.getAllCategoryAction();
    }, []);

    useEffect(() => {
        console.log(props.result);
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
            props.addNewPostReset();
        }
        console.log(props.error);
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
            props.addNewPostReset();
        }
        if (props.resultDomaine !== null) {
            console.log("Domaine has lodaded", props.resultDomaine.filter(domaine => domaine.rhContentCategoryId === Constant.blogID)[0].rhContentDomaineId);
            setThematique(props.resultDomaine.filter(domaine => domaine.rhContentCategoryId === Constant.blogID)[0].rhContentDomaineId);
        }
    }, [props]);

    console.log("Thematique", parseInt(thematique));

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t("user.new_demands")}`}</title>
            </Helmet>
            <div className="container-fluid">
                <h1>{t("user.new_demands")}</h1>
            </div>

            <section className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form className="row" id="PostAdminEditForm" onSubmit={handleSubmit(onSubmitPost)}>
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

                                <div className="row">

                                    <div className="col-6">
                                        <fieldset className="form-group">
                                            <div id="radio-action" className="form-inline">
                                                <div className="custom-control custom-switch right">
                                                    <input type="checkbox"
                                                           onChange={(e) => setHasPieceJointe(e.target.checked)}
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
                                                        handleSubmit(onSubmitPost);
                                                    }}>{t('common.send')}</button>
                                    }
                                </div>

                            </div>
                            <div className="col-12 col-lg-9">
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
    loading: state.addNewPostReducer.loading,
    result: state.addNewPostReducer.result,
    error: state.addNewPostReducer.error,

    loadingCategory: state.getAllCategoryReducer.loading,
    resultCategory: state.getAllCategoryReducer.result,
    errorCategory: state.getAllCategoryReducer.error,

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

    addNewPostAction,
    addNewPostReset,

    getAllCategoryAction,
    getAllCategoryReset

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewDemand);
