import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {NavLink, useHistory, withRouter} from "react-router-dom";
import {getAllPostBackendAction, getAllPostsAction, getAllPostsReset} from "../../../redux/api/PostsApi";
import {getAllDomaineAction} from "../../../redux/api/DomaineApi";
import {validatePublicationAction, validatePublicationReset} from "../../../redux/api/ValidationApi";
import {postFaqAction, postFaqReset} from "../../../redux/api/FaqApi";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as Utils from "../../../utils";
import {Constant} from "../../../config/Constant";
import * as moment from "moment";
import "moment/locale/fr";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import {Config} from "../../../config/ServerConfig";
import CustomMaterialMenu from "../../../components/CustomMaterialMenu";
import Checkbox from "@material-ui/core/Checkbox";
import DataTableComponent from "../../../components/DataTable";
import ReactPlayer from "react-player";


let route = require('../../../utils/route');

function UserDemands(props) {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);
    const [postsPublished, setPostsPublished] = useState([]);
    const [postsWaiting, setPostsWaiting] = useState([]);
    const [postsExpired, setPostsExpired] = useState([]);
    const [postsDeleted, setPostsDeleted] = useState([]);
    const [tabsActiveIndex, setTabsActiveIndex] = useState(0);
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
            name: "Intitulé de la demande",
            selector: 'rhContentTitle',
            sortable: true,
        },
        {
            name: "Description de la demande",
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
        }

    ];

    useEffect(() => {
        props.getAllDomaineAction();
        props.getAllPostsReset();
        props.getAllPostBackendAction();
    }, []);

    useEffect(() => {
        if (props.result !== null) {
            setPostsPublishedAction();
            setPostsDeleted(props.result.filter((post) => !post.rhContentIsOK));
            setPostsWaiting(props.result.filter((post) => {
                let currentDate = moment().format("lll");
                let postDate = moment(post.rhContentDateCeated).format('lll');
                return moment(currentDate).isBefore(postDate);
            }));
            setPostsExpired(props.result.filter((post) => {
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
    }, [posts]);

    const setPostsPublishedAction = () => {
        if (props.result !== null) {
            let tempPosts = props.result.filter((post) => post.rhContentIsOK);
            setPosts(tempPosts);
            setPostsPublished(tempPosts);
        }
    };

    const setPostsWaitingAction = () => {
        console.log('waiting click');
        if (props.result !== null) {
            let tempPosts = props.result.filter((post) => {
                let currentDate = moment().format("lll");
                let postDate = moment(post.rhContentDateCeated).format('lll');
                return moment(currentDate).isBefore(postDate);
            });
            setPosts(tempPosts);
            setPostsWaiting(tempPosts);
            setTabsActiveIndex(1);
        }
    };

    const setPostsExpiredAction = () => {
        if (props.result !== null) {
            let tempPosts = props.result.filter((post) => {
                let currentDate = moment().format("lll");
                let postDateExpired = moment(post.rhContentDateOnPublish).format('lll');
                return moment(postDateExpired).isBefore(currentDate);

            });
            setPosts(tempPosts);
            setPostsExpired(tempPosts);
            setTabsActiveIndex(2);
        }
    };

    const setPostsDeletedAction = () => {
        if (props.result !== null) {
            let tempPosts = props.result.filter((post) => !post.rhContentIsOK);
            setPosts(tempPosts);
            setPostsDeleted(tempPosts);
            setTabsActiveIndex(3);
        }
    };

    const handleSearch = () => {
        console.log(search);
        if (props.result !== null)
            setPosts(props.result.filter((post) => post.rhContentTitle.toLowerCase().includes(search.toLowerCase())))

    };

    const ExpandedComponent = ({data}) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const renderPostTable = (data) => (
        <DataTableComponent
            columns={columns}
            data={[]}
            progressPending={props.loading}
            defaultSortField="name"
            loading={props.loading || isLoading}
            selectableRowsComponent={Checkbox}
            onRowClicked={(post) => history.push({
                pathname: `${route.post.edit_post}/${post.rhContentId}`
            })}
            expandableRows={false}
            expandableRowsComponent={<ExpandedComponent/>}
        />
    );

    return (
        <>
            <div className="container-fluid">
                <Helmet>
                    <title>{`${t("app.name")} - ${t('posts.title')}`}</title>
                </Helmet>
                <h1>{t("user.demands")}</h1>

                <div className="row">
                    <div className="col-12 o-layer">

                        <div className="row mb-3">
                            <div className="col-auto mr-auto">
                                <NavLink to={route.user.add_new_demand} className="btn btn-primary" exact>
                                    <span className="icon icon-Add" aria-hidden="true"/>
                                    {t('user.new_demands')}
                                </NavLink>
                            </div>
                            <div className="col-auto">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder={t('user.find_demand')}
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
                                {renderPostTable(posts)}
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

    getAllPostBackendAction,

    getAllDomaineAction,
    validatePublicationAction,
    validatePublicationReset,

    postFaqAction,
    postFaqReset,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDemands));
