import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import Interweave from 'interweave';
import * as Utils from '../../utils';
import * as moment from 'moment';
import 'moment/locale/fr';
import ReactPaginate from 'react-paginate';
import './style.scss';
import {Constant} from "../../config/Constant";
import {Config} from "../../config/ServerConfig";
import _ from "lodash";
import ReactPlayer from 'react-player';

let route = require("../../utils/route");


export default function PostList(props) {
    moment.locale("fr");
    const {
        style,
        onClick,
        children,
        posts,
        ...rest
    } = props;
    const totalPosts = posts.length;
    const totalPage = Math.ceil(totalPosts / Constant.postPageLimit);

    const [currentPosts, setCurrentPosts] = useState(posts.slice(0, Constant.postPageLimit));
    const {t} = useTranslation();

    useEffect(() => {
        setCurrentPosts(posts.slice(0, Constant.postPageLimit));
    }, [props.posts]);

    useEffect(() => {
        window.$(".video-preview video").initVideoLoader();
        window.$(".img-post").initImageNotLoadPlaceHolder();
    });
    const handlePageChange = data => {
        const offset = (data.selected) * Constant.postPageLimit;
        setCurrentPosts(posts.slice(offset, offset + Constant.postPageLimit));
    };

    return (
        <>
            {
                posts.length === 0 ?

                    <div className="alert alert-info" role="alert">
                        <span className="alert-icon"><span className="sr-only">Info</span></span>
                        <p>{t('posts.no_post')}</p>
                    </div> :

                    <>
                        {
                            currentPosts.map((post, index) => (
                                <div className="row" key={index}>
                                    <div className="col" key={`post-${index}`}>
                                        <div
                                            className="row no-gutters shadow-lg rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-white">
                                            {/*                                            <div className="col-6 p-4 d-flex flex-column position-static">
                                                <strong
                                                    className="d-inline-block mb-2 text-primary">{post.rhContentCategory}</strong>
                                                <h3 className="mb-0">{post.rhContentTitle}</h3>
                                                <div
                                                    className="mb-1 text-muted">{moment(post.rhContentDateCeated).format("lll")}</div>
                                                <Interweave
                                                    content={Utils.removeTag(Utils.cutString(post.rhContentDescription, 200))}/>

                                                <NavLink
                                                    to={{
                                                        pathname: `${route.post.root}/${post.rhContentDomaineId}/${post.rhContentId}`,
                                                        post
                                                    }}
                                                    className="stretched-link">
                                                    {t('common.read_more')}
                                                </NavLink>
                                            </div>
                                            <div className="col-auto d-none d-lg-block">
                                                <img src="https://picsum.photos/800/450" alt={post.rhContentTitle}
                                                     className="img-fluid bd-placeholder-img"/>
                                            </div>*/}
                                            <div className="d-flex flex-row"></div>
                                            <div className="row news-card bg-white">
                                                <div className="col-md-4">
                                                    {
                                                        !_.isNil(post.rhContentPrincipalLink) ?
                                                            Utils.isImageFileUrl(post.rhContentPrincipalLink) ?
                                                                <div className="feed-image">
                                                                    <img className="img-fluid img-responsive img-post"
                                                                         loading="lazy"
                                                                         src={Config.imageFolder + post.rhContentPrincipalLink}/>
                                                                </div>
                                                                :
                                                                <ReactPlayer
                                                                    className="img-fluid img-reponsive video-preview"
                                                                    width="400px"
                                                                    height="200px"
                                                                    url={Config.imageFolder + post.rhContentPrincipalLink}
                                                                />
                                                            : <img className="img-fluid img-reponsive img-post"
                                                                   loading="lazy"
                                                                   src="https://picsum.photos/800/650"/>
                                                    }

                                                </div>
                                                <div className="col-md-8 p-3 pr-3">
                                                    <div className="news-feed-text">
                                                        <h5>{post.rhContentTitle}</h5>
                                                        <span className="date">
                                                            <div className="mb-1 text-muted">
                                                                {moment(post.rhContentDateCeated).format("lll")}
                                                            </div>
                                                        </span>
                                                        <span>
                                                                <Interweave
                                                                    content={Utils.removeTag(Utils.cutString(post.rhContentDescription, 200))}/>
                                                        </span>
                                                        <div
                                                            className="d-flex flex-row justify-content-between align-items-center mt-2">
                                                            <NavLink
                                                                to={{
                                                                    pathname: `${route.post.root}/${post.rhContentDomaine.rhContentCategoryId}/${post.rhContentDomaineId}/${post.rhContentId}`,
                                                                    post
                                                                }}
                                                                className="stretched-link">
                                                                {t('common.read_more')}
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <nav role="navigation" aria-label="Pagination example with active span item">
                            <ReactPaginate
                                previousLabel={<span className="sr-only"> {t('common.previous')}</span>}
                                nextLabel={<span className="sr-only"> {t('common.next')}</span>}
                                breakLabel={'...'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                pageCount={totalPage}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                marginPagesDisplayed={2}
                                onPageChange={handlePageChange}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                pageRangeDisplayed={Constant.postPageLimit}
                                containerClassName={'pagination justify-content-center'}
                                activeClassName={'active'}
                            />
                        </nav>
                    </>
            }
        </>
    );
}


PostList.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    posts: PropTypes.array
};

PostList.defaultProps = {
    style: {},
    onClick: () => {
    },
    posts: []
};
