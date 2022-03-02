import React, {useEffect, useState} from 'react';
import {useHistory, useParams, withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import PostWidget from "../../components/PostWidget";
import {FakeData} from "../../fakeData";
import AboutOpenRHWidget from "../../components/AboutOpenRHWidget";
import ArchiveWidget from "../../components/ArchiveWidget";
import {bindActionCreators} from 'redux';
import {
    getAllPostsAction,
    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,
    getAllPostsReset
} from "../../redux/api/PostsApi";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";
import {
    getAllGlossaryAction,
    getAllGlossaryReset,
    postGlossaryAction,
    postGlossaryReset
} from "../../redux/api/GlossaryApi";
import {Constant} from "../../config/Constant";
import _ from "lodash";
import GlossaryList from "../../components/GlossaryList";
import $ from "jquery";
import * as Utils from "../../utils";
import Loader from "../../components/Loader";
import PopularPostAside from '../../components/PopularPostAside';
import RecentPostAside from '../../components/RecentPostAside';

let route = require('../../utils/route');

function Glossary(props) {
    const {t} = useTranslation();
    let {id, page, domaine} = useParams();
    const {register, handleSubmit, errors} = useForm();
    let history = useHistory();

    const [currentPath, setCurrentPath] = useState(props.location.pathname);
    const [thematique, setThematique] = useState(1);
    const [title, setTitle] = useState('');
    const [keyword, setKeyword] = useState('');
    const [glossary, setGlossary] = useState(null);
    const [glossaryFilter, setGlossaryFilter] = useState(null);
    const [search, setSearch] = useState('');
    const [keywordDescription, setKeywordDescription] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        console.log("domaine", domaine);
        props.getAllGlossaryReset();
        props.getAllGlossaryAction();
    }, []);

    useEffect(() => {
        if ($("body").hasClass('bg-gray'))
            $("body").removeClass("bg-gray");
    });

    useEffect(() => {

        if (props.result !== null) {
            setGlossary(sortedGlossaryArray(props.result));
        }
    }, [props]);

    const sortedGlossaryArray = (glossaryArray) => {
        let sortedArray = _.sortBy(glossaryArray, [function (o) {
            return o.rhContentTitle;
        }]);
        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let arraySorted = [];

        alphabet.split('').map((letter) => {
            let currentLetterGlossary = [];
            sortedArray.map((element) => {
                if (element.rhContentTitle.charAt(0).toLocaleUpperCase() === letter) {
                    currentLetterGlossary.push({
                        title: element.rhContentTitle,
                        description: element.rhContentDescription
                    });
                }
            });
            if (currentLetterGlossary.length !== 0) {
                arraySorted.push({
                    category: letter,
                    items: currentLetterGlossary
                });
            }
        });

        return arraySorted;
    }

    const handleSearch = () => {
        if (props.result !== null)
            setGlossaryFilter(sortedGlossaryArray(props.result.filter((post) => post.rhContentTitle.toLowerCase().includes(search.toLowerCase()))));
    };

    /*    useEffect(() => {
            const {pathname} = props.location;
            props.getAllPostsByDomaineAction(Constant.glossaireID, domaine);
        }, [props.location.pathname]);

        const onSubmitGlossaire = () => {
            props.postGlossaryAction({
                rhContentTitle: keyword,
                rhContentDescription: keywordDescription,
                rhContentCategoryId: Constant.glossaireID,
                rhContentDomaineId: parseInt(thematique),
                rhContentDatePublish: moment(new Date()).format("YYYY-MM-DD"),
                userId: Utils.getUserConnected().userId
            });
        };

        useEffect(() => {
            if (props.resultPostGlossary !== null) {
                toast.dark(t('glossary.success'), {
                    position: "top-right",
                    autoClose: Constant.toastDelay,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                history.go(0);
                props.postGlossaryReset();
            }
            if (props.errorPostGlossary !== null) {
                toast.error(props.errorPostGlossary, {
                    position: "top-right",
                    autoClose: Constant.toastDelay,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                props.postGlossaryReset();
            }
        }, [props]);*/

    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t('glossary.title')}`}</title>
            </Helmet>
            <div className="my-5">
                <div className="container">
                    <h1>{t("navigation.glossaire")}</h1>
                </div>
                {/*
                <NavigationLight menus={FakeData.posts_menu} menuLink={route.glossary.root}/>
*/}

                <section className="container">
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <div className="row mb-3">
                                {/*                                <div className="col-auto mr-auto">
                                    <button type="button" className="btn btn-primary" data-toggle="modal"
                                            data-target="#addGlossaryModal">
                                        <span className="icon icon-Add" aria-hidden="true"/>
                                        {t('glossary.add_new')}
                                    </button>
                                </div>*/}
                                <div className="col-auto">
                                    <div className="input-group">
                                        <input type="text" className="form-control"
                                               placeholder={t('glossary.find_glossary')}
                                               aria-label={t('glossary.find_glossary')} aria-describedby="button-addon2"
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
                                    props.loading ?
                                        <Loader/> :
                                        glossary !== null ?
                                            <GlossaryList glossarys={search !== '' ? glossaryFilter : glossary}/> :

                                            (props.error !== null) &&
                                            <div className="alert alert-danger" role="alert">
                                            <span className="alert-icon">
                                                <span className="sr-only">Info</span>
                                            </span>
                                                <p>{t(Utils.displayErrorRequest(props.error))}</p>
                                            </div>
                                }
                            </div>
                        </div>
                        <aside className="col-12 col-lg-3">
                            {/* <PostWidget categories={FakeData.post_widget_data}/> */}
                            <RecentPostAside />
                            <AboutOpenRHWidget/>
                            <ArchiveWidget/>
                        </aside>
                    </div>
                </section>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    loading: state.getAllGlossaryReducer.loading,
    result: state.getAllGlossaryReducer.result,
    error: state.getAllGlossaryReducer.error,

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

    getAllGlossaryAction,
    getAllGlossaryReset,

    getAllPostsByDomaineAction,
    getAllPostsByDomaineReset,

    postGlossaryAction,
    postGlossaryReset
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Glossary));
