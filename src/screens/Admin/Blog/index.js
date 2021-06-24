import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {NavLink, useParams, useHistory, withRouter} from "react-router-dom";
import {Constant} from "../../../config/Constant";
import {getAllPostsAction, getAllPostsReset} from "../../../redux/api/PostsApi";
import {getAllDomaineAction} from "../../../redux/api/DomaineApi";
import {validatePublicationAction, validatePublicationReset} from "../../../redux/api/ValidationApi";
import {postFaqAction, postFaqReset} from "../../../redux/api/FaqApi";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as Utils from "../../../utils";
import Interweave from "interweave";
import * as moment from "moment";
import "moment/locale/fr";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import {Config} from "../../../config/ServerConfig";
import DataTable from 'react-data-table-component';
import CustomMaterialMenu from "../../../components/CustomMaterialMenu";
import DataTableComponent from "../../../components/DataTable";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ReactPlayer from "react-player";

let route = require('../../../utils/route');

function AdminBlog(props) {
    console.log('Admin post');
    const {t} = useTranslation();
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [blogsPublished, setBlogsPublished] = useState([]);
    const [blogsWaiting, setBlogsWaiting] = useState([]);
    const [blogsExpired, setBlogsExpired] = useState([]);
    const [blogsDeleted, setBlogsDeleted] = useState([]);
    const [tabsActiveIndex, setTabsActiveIndex] = useState(0);
    const [blog, setBlog] = useState([]);
    let history = useHistory();

    const columns = [
        {
            name: t('common.status'),
            selector: 'rhContentIsOK',
            width: '56px',
            sortable: true,
            cell: post => post.rhContentIsOK ?
                <FontAwesomeIcon icon={faCheck} color='var(--success)' className="mr-1"/> :
                <FontAwesomeIcon icon={faTimes} color='var(--danger)' className="mr-1"/>
        },
        {
            name: t('add_post.title'),
            selector: 'rhContentTitle',
            sortable: true,
        },
        {
            name: t('add_post.contenu'),
            selector: 'rhContentDescription',
            sortable: false,
            width: "35%",
            cell: d => Utils.cutString(Utils.removeTag(d.rhContentDescription), 150)
        },
        {
            name: t('add_post.publication_date'),
            selector: 'rhContentDateCeated',
            width: '200px',
            sortable: true,
            format: d => moment(d.rhContentDateCeated).format("lll")
        },
        {
            name: t('common.author'),
            selector: 'user.userName',
            width: '170px',
            sortable: true,
        }, {
            name: t('common.domain'),
            selector: 'rhContentDomaine',
            width: '150px',
            sortable: true,
            cell: post => post.rhContentDomaine !== null ? post.rhContentDomaine.rhContentDomaineName : ''
        },
        {
            name: t('add_post.image_ellipsed'),
            selector: 'rhContentPrincipalLink',
            grow: 0,
            cell: post =>
                !_.isNil(post.rhContentPrincipalLink) ?
                    Utils.isImageFileUrl(post.rhContentPrincipalLink) ?
                        <img className="rounded mx-auto d-block img-post" height="auto" width="100%"
                             loading="lazy"
                             src={Config.imageFolder + post.rhContentPrincipalLink}/>
                        :
                        <ReactPlayer
                            className="img-fluid img-reponsive video-preview"
                            width="100%"
                            height="auto"
                            url={Config.imageFolder + post.rhContentPrincipalLink}
                        />
                    : <img className="rounded mx-auto d-block" height="auto" width="100%"
                           loading="lazy"
                           src="https://picsum.photos/200/200"/>
        },
        {
            cell: row => <CustomMaterialMenu size="small" row={row}
                                             firstButtonText={t('common.edit')}
                                             secondButtonText={t('common.unpublish')}
                                             secondButtonAction={() => {
                                                 props.getAllPostsAction(Constant.publicationID);
                                             }}
                                             firstButtonAction={() => {
                                                 history.push({
                                                     pathname: `${route.post.edit_post}/${row.rhContentId}`
                                                 })
                                             }
                                             }/>,
            allowOverflow: true,
            button: true,
            width: '56px',
        }

    ];

    useEffect(() => {
        props.getAllDomaineAction();
        props.getAllPostsReset();
        props.getAllPostsAction(Constant.blogID);
    }, []);

    useEffect(() => {
        if (props.result !== null && props.error === null) {
            setBlogsPublishedAction();
            setBlogsDeleted(props.result.filter((post) => !post.rhContentIsOK));
            setBlogsWaiting(props.result.filter((post) => {
                let currentDate = moment().format("lll");
                let postDate = moment(post.rhContentDateCeated).format('lll');
                return moment(currentDate).isBefore(postDate);
            }));
            setBlogsExpired(props.result.filter((post) => {
                let currentDate = moment().format("lll");
                let postDateExpired = moment(post.rhContentDateOnPublish).format('lll');
                return moment(postDateExpired).isBefore(currentDate);

            }));
            setTimeout(() => {
                window.$(".video-preview video").initVideoLoader();
                window.$(".img-post").initImageNotLoadPlaceHolder();
            }, 500);
        }

    }, [props]);

    useEffect(() => {
        if (props.result !== null) setIsLoading(false);
        else setIsLoading(true);
    }, [blog]);

    const setBlogsPublishedAction = () => {
        if (props.result !== null) {
            let tempPosts = props.result.filter((post) => post.rhContentIsOK);
            setBlog(tempPosts);
            setBlogsPublished(tempPosts);
        }
    };

    const setBlogsWaitingAction = () => {
        console.log('waiting click');
        if (props.result !== null) {
            let tempPosts = props.result.filter((post) => {
                let currentDate = moment().format("lll");
                let postDate = moment(post.rhContentDateCeated).format('lll');
                return moment(currentDate).isBefore(postDate);
            });
            setBlog(tempPosts);
            setBlogsWaiting(tempPosts);
            setTabsActiveIndex(1);
        }
    };

    const setBlogsExpiredAction = () => {
        if (props.result !== null) {
            let tempPosts = props.result.filter((post) => {
                let currentDate = moment().format("lll");
                let postDateExpired = moment(post.rhContentDateOnPublish).format('lll');
                return moment(postDateExpired).isBefore(currentDate);

            });
            setBlog(tempPosts);
            setBlogsExpired(tempPosts);
            setTabsActiveIndex(2);
        }
    };

    const setBlogsDeletedAction = () => {
        if (props.result !== null) {
            let tempPosts = props.result.filter((post) => !post.rhContentIsOK);
            setBlog(tempPosts);
            setBlogsDeleted(tempPosts);
            setTabsActiveIndex(3);
        }
    };

    const handleSearch = () => {
        console.log(search);
        if (props.result !== null)
            setBlog(props.result.filter((post) => post.rhContentTitle.toLowerCase().includes(search.toLowerCase())))

    };

    const ExpandedComponent = ({data}) => <pre>{JSON.stringify(data, null, 2)}</pre>;


    const renderBlogTable = (data) => (
        <DataTableComponent
            columns={columns}
            data={!isLoading ? data : []}
            progressPending={props.loading}
            defaultSortField="name"
            loading={props.loading || isLoading}
            selectableRowsComponent={Checkbox}
            onRowClicked={(post) => history.push({
                pathname: `${route.blog.edit_blog}/${post.rhContentId}`
            })}
            expandableRows={false}
            expandableRowsComponent={<ExpandedComponent/>}
        />
    );

    return (
        <>
            <div className="container-fluid">
                <Helmet>
                    <title>{`${t("app.name")} - ${t('navigation.blog')}`}</title>
                </Helmet>
                <h1>{t("blog.title")}</h1>

                <div className="row">
                    <div className="col-12">
                        <div className="row mb-3">
                            <div className="col-auto mr-auto">
                                <NavLink to={route.blog.add_new} className="btn btn-primary" exact>
                                    <span className="icon icon-Add" aria-hidden="true"/>
                                    {t('blog.new_blog')}
                                </NavLink>
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
                            <ul className="nav nav-tabs nav-tabs-light">
                                <li className="nav-item">
                                    <a href="#" className={`nav-link ${tabsActiveIndex === 0 && "active"}`}
                                       onClick={() => {
                                           setBlogsPublishedAction();
                                           setTabsActiveIndex(0);
                                       }}>{`${t('common.published')} (${blogsPublished.length})`}</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={`nav-link ${tabsActiveIndex === 1 && "active"}`}
                                       onClick={() => setBlogsWaitingAction()}>{`${t('common.waiting')} (${blogsWaiting.length})`}</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={`nav-link ${tabsActiveIndex === 2 && "active"}`}
                                       onClick={() => setBlogsExpiredAction()}>{`${t('common.expired')} (${blogsExpired.length})`}</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={`nav-link ${tabsActiveIndex === 3 && "active"}`}
                                       onClick={() => setBlogsDeletedAction()}>{`${t('common.deleted')} (${blogsDeleted.length})`}</a>
                                </li>
                            </ul>
                            <div className="media-body">
                                {renderBlogTable(blog)}
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

    getAllDomaineAction,
    validatePublicationAction,
    validatePublicationReset,

    postFaqAction,
    postFaqReset,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminBlog));
