import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useHistory, withRouter} from "react-router-dom";
import {getAllPostsAction, getAllPostsReset} from "../../../../redux/api/PostsApi";
import {
    createThematiqueAction,
    createThematiqueReset,
    getAllDomaineAction,
    getAllDomaineReset, modifyThematiqueAction, modifyThematiqueReset
} from "../../../../redux/api/DomaineApi";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as Utils from "../../../../utils";
import {Constant} from "../../../../config/Constant";
import * as moment from "moment";
import "moment/locale/fr";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import CustomMaterialMenu from "../../../../components/CustomMaterialMenu";
import Checkbox from "@material-ui/core/Checkbox";
import DataTableComponent from "../../../../components/DataTable";
import {Input} from "../../../../components/Input";
import {useForm} from "react-hook-form";
import {
    getAllCategoryAction,
    getAllCategoryReset,
    modifyCategoryAction,
    modifyCategoryReset
} from "../../../../redux/api/CategoryApi";
import {toast} from "react-toastify";
import $ from "jquery";


let route = require('../../../../utils/route');

function PostThematique(props) {
    const {t} = useTranslation();
    const [isModifyCategory, setIsModifyCategory] = useState(false);
    const [idCategory, setIdCategory] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [thematique, setThematique] = useState("");
    const [thematiqueLink, setThematiqueLink] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoriesPublished, setCategoriesPublished] = useState([]);
    const [categoriesDeleted, setCategoryDeleted] = useState([]);
    const [category, setCategory] = useState(5);
    const [tabsActiveIndex, setTabsActiveIndex] = useState(0);
    const {register, handleSubmit, errors} = useForm();
    let history = useHistory();

    const columns = [
        {
            name: t('common.status'),
            selector: 'rhContentIsOK',
            width: '100px',
            sortable: true,
            cell: post => post.rhContentDomaineState ?
                <FontAwesomeIcon icon={faCheck} color='var(--success)' className="mr-1"/> :
                <FontAwesomeIcon icon={faTimes} color='var(--danger)' className="mr-1"/>
        },
        {
            name: t('add_post.title'),
            selector: 'rhContentDomaineName',
            sortable: true
        },
        {
            name: t('add_post.publication_date'),
            selector: 'rhContentDateCeated',
            sortable: true,
            format: d => moment(d.rhContentCategoryDateCreated).format("lll")
        },
        {
            name: t('common.categorie'),
            selector: 'rhContentCategory.rhContentCategoryName',
            sortable: true,
            cell: row => props.resultGetCategory !== null ? props.resultGetCategory.filter((category) => category.rhContentCategoryId === row.rhContentCategoryId)[0].rhContentCategoryName : ''
        },
        {
            name: t('common.actions'),
            cell: row => <CustomMaterialMenu size="small" row={row} firstButtonText={t('common.edit')}
                                             secondButtonText={row.rhContentDomaineState ? t('common.unpublish') : t('common.publish')}
                                             firstButtonAction={() => {
                                                 setIsModifyCategory(true);
                                                 setIdCategory(row.rhContentCategoryId);
                                                 $('#category').val(row.rhContentCategoryName);
                                                 $('#btnModal').trigger('click');
                                                 $('.modal-title').html(t('common.categorie_modify'));
                                                 $('.modal-footer .btn-primary').html(t('common.modify'));
                                             }} secondButtonAction={() => {
                props.modifyCategoryAction(row.rhContentCategoryId, {
                    rhContentDomaineState: !row.rhContentDomaineState
                });
            }}/>,
            allowOverflow: true,
            button: true,
        }

    ];

    useEffect(() => {
        props.createThematiqueReset();
        props.getAllDomaineAction();
        props.getAllCategoryAction();
    }, []);

    useEffect(() => {
        if (props.result !== null) {
            setThematiquePublishedAction();
            setCategoryDeleted(props.result.filter((post) => !post.rhContentDomaineState && post.rhContentCategoryId >= Constant.publicationID));
        }
    }, [props.result]);

    useEffect(() => {
        if (props.resultPostThematique !== null) {
            toast.dark(t('common.thematique_success'), {
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
            }, Constant.toastDelay);
            props.createThematiqueReset();
        }
        if (props.errorPostThematique !== null) {
            toast.error(Utils.displayErrorRequest(props.errorPostThematique), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            props.createThematiqueReset();
        }

        if (props.resultModifyThematique !== null) {
            toast.dark(t('common.thematique_modify_success'), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            history.go(0);
            props.modifyCategoryReset();
        }
        if (props.errorModifyThematique !== null) {
            toast.error(Utils.displayErrorRequest(props.errorModifyThematique), {
                position: "top-right",
                autoClose: Constant.toastDelay,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            props.modifyCategoryReset();
        }
    }, [props]);

    useEffect(() => {
        if (props.result !== null) setIsLoading(false);
        else setIsLoading(true);
    }, [categories]);

    const setThematiquePublishedAction = () => {
        if (props.result !== null) {
            let tempPosts = props.result.filter((post) => post.rhContentDomaineState && post.rhContentCategoryId >= Constant.publicationID);
            setCategories(tempPosts);
            setCategoriesPublished(tempPosts);
        }
    };

    const setThematiqueDeletedAction = () => {
        if (props.result !== null) {
            let tempPosts = props.result.filter((post) => !post.rhContentDomaineState && post.rhContentCategoryId >= Constant.publicationID);
            setCategories(tempPosts);
            setCategoryDeleted(tempPosts);
            setTabsActiveIndex(1);
        }
    };

    const handleSearch = () => {
        console.log(search);
        if (props.result !== null)
            setCategories(props.result.filter((post) => post.rhContentDomaineName.toLowerCase().includes(search.toLowerCase()) && post.rhContentCategoryId >= Constant.publicationID ))

    };

    const onSubmitThematique = () => {
        if (isModifyCategory) {
            props.modifyThematiqueAction(idCategory, {
                rhContentCategoryName: parseInt(category),
                rhContentDomaineState: true
            });
        } else {
            props.createThematiqueAction({
                rhContentDomaineName: thematique,
                rhContentCategoryId: parseInt(category),
                rhContentDomaineState: true,
                domaineLink: thematiqueLink,
            });
        }
    };


    const ExpandedComponent = ({data}) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const renderPostTable = (data) => (
        <DataTableComponent
            columns={columns}
            data={!isLoading ? data : []}
            progressPending={props.loading}
            defaultSortField="name"
            loading={props.loading || isLoading}
            selectableRowsComponent={Checkbox}
            onRowClicked={(category) => {
                setIsModifyCategory(true);
                setIdCategory(category.rhContentCategoryId);
                $('#category').val(category.rhContentCategoryName);
                $('#btnModal').trigger('click');
                $('.modal-title').html(t('common.categorie_modify'));
                $('.modal-footer .btn-primary').html(t('common.modify'));
            }}
            expandableRows={false}
            expandableRowsComponent={<ExpandedComponent/>}
        />
    );

    const renderModalAddCategory = () => (
        <div className="modal fade" id="addCategoryModal" data-backdrop="static" data-keyboard="false" tabIndex="-1"
             aria-labelledby="addCategoryModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addCategoryModalLabel">{t('common.new_thematique')}</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span className="sr-only">{t('common.click_to_close')}</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">

                                <form className="row" id="PostAdminEditForm"
                                      onSubmit={handleSubmit(onSubmitThematique)}>

                                    <div className="col-12 mt-3">

                                        <Input wrapperClass="form-group"
                                               inputClass="form-control"
                                               type="text"
                                               name="thematique"
                                               required
                                               ref={register({required: true, maxLength: 255})}
                                               id="category"
                                               value={thematique}
                                               onChange={(e) => setThematique(e.target.value)}
                                               error={errors.hasOwnProperty("thematique")}
                                               errorText={t('error.required_field')}
                                               labelText={t('common.thematique_label')}
                                               maxLength="255"
                                        />

                                        <div className="form-group">

                                            <label htmlFor="postCategory"
                                                   className="is-required">{t('common.categorie')}</label>
                                            {
                                                props.loadingGetCategory ?
                                                    <select className="custom-select"
                                                            id="postCategory" disabled>
                                                    </select> :
                                                    props.resultGetCategory !== null &&
                                                    <select className="custom-select"
                                                            id="postCategory"
                                                            onChange={event => setCategory(event.target.value)}>
                                                        {
                                                            props.resultGetCategory.map((domaine, index) => (
                                                                <option value={domaine.rhContentCategoryId}
                                                                        key={`category${index}`}>{domaine.rhContentCategoryName}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                            }

                                        </div>
                                        
                                        <Input wrapperClass="form-group"
                                               inputClass="form-control"
                                               type="text"
                                               name="thematiqueLink"
                                               
                                               ref={register({required: false, maxLength: 255})}
                                               id="thematiqueLink"
                                               value={thematiqueLink}
                                               onChange={(e) => setThematiqueLink(e.target.value)}
                                               error={errors.hasOwnProperty("thematique")}
                                               errorText={t('error.required_field')}
                                               labelText={t('common.thematiqueLink_label')}
                                               maxLength="255"/>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-dismiss="modal">{t('common.close')}</button>
                        {
                            props.loadingPostThematique ?
                                <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"/>
                                    <span className="sr-only">{t('common.loading')}</span>
                                </button> :
                                <button type="button" className="btn btn-primary"
                                        onClick={handleSubmit(onSubmitThematique)}>{t('common.post')}</button>
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
                    <title>{`${t("app.name")} - ${t('common.thematique')}`}</title>
                </Helmet>
                <h1>{t("common.thematique")}</h1>

                {renderModalAddCategory()}

                <div className="row">
                    <div className="col-12 o-layer">
                        <button type="button" className="btn btn-primary" data-toggle="modal" id="btnModal"
                                style={{display: "none"}} data-target="#addCategoryModal"/>
                        <div className="row mb-3">
                            <div className="col-auto mr-auto">
                                <button type="button" className="btn btn-primary" data-toggle="modal"
                                        onClick={() => {
                                            setIsModifyCategory(false);
                                        }}
                                        data-target="#addCategoryModal">
                                    <span className="icon icon-Add" aria-hidden="true"/>
                                    {t('common.add')}
                                </button>
                            </div>
                            <div className="col-auto">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder={t('common.find_category')}
                                           aria-label={t('common.find_category')} aria-describedby="button-addon2"
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
                            <ul className="nav nav-tabs nav-tabs-light">
                                <li className="nav-item">
                                    <a href="#" className={`nav-link ${tabsActiveIndex === 0 && "active"}`}
                                       onClick={() => {
                                           setThematiquePublishedAction();
                                           setTabsActiveIndex(0);
                                       }}>{`${t('common.published')} (${categoriesPublished.length})`}</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={`nav-link ${tabsActiveIndex === 1 && "active"}`}
                                       onClick={() => setThematiqueDeletedAction()}>{`${t('common.unpublished')} (${categoriesDeleted.length})`}</a>
                                </li>
                            </ul>
                            <div className="media-body">
                                {renderPostTable(categories)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    loading: state.getAllDomainesReducer.loading,
    result: state.getAllDomainesReducer.result,
    error: state.getAllDomainesReducer.error,

    loadingGetCategory: state.getAllCategoryReducer.loading,
    resultGetCategory: state.getAllCategoryReducer.result,
    errorGetCategory: state.getAllCategoryReducer.error,

    loadingPostThematique: state.createDomaineReducer.loading,
    resultPostThematique: state.createDomaineReducer.result,
    errorPostThematique: state.createDomaineReducer.error,

    loadingModifyThematique: state.modifyDomaineReducer.loading,
    resultModifyThematique: state.modifyDomaineReducer.result,
    errorModifyThematique: state.modifyDomaineReducer.error,

    loadingGetDomaine: state.getAllDomainesReducer.loading,
    resultGetDomaine: state.getAllDomainesReducer.result,
    errorGetDomaine: state.getAllDomainesReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllPostsAction,
    getAllPostsReset,

    createThematiqueAction,
    createThematiqueReset,

    modifyThematiqueAction,
    modifyThematiqueReset,

    modifyCategoryAction,
    modifyCategoryReset,

    getAllDomaineAction,
    getAllDomaineReset,

    getAllCategoryAction,
    getAllCategoryReset
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostThematique));
