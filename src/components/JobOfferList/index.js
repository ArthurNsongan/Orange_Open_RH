import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import Interweave from 'interweave';
import * as Utils from '../../utils';
import * as moment from 'moment';
import 'moment/locale/fr';
import ReactPaginate from 'react-paginate';
import './style.css';
import {Constant} from "../../config/Constant";
import {Config} from "../../config/ServerConfig";
import _ from "lodash";

let route = require("../../utils/route");

export default function JobOfferList(props) {
    moment.locale("fr");
    const {
        style,
        onClick,
        children,
        jobs,
        ...rest
    } = props;
    const totalPosts = jobs.length;
    const totalPage = Math.ceil(totalPosts / Constant.postPageLimit);

    const [currentJobs, setCurrentJobs] = useState(jobs.slice(0, Constant.postPageLimit));
    const {t} = useTranslation();

    useEffect(() => {
        setCurrentJobs(jobs.slice(0, Constant.postPageLimit));
    }, [props.jobs]);

    const handlePageChange = data => {
        const offset = (data.selected) * Constant.postPageLimit;
        setCurrentJobs(jobs.slice(offset, offset + Constant.postPageLimit));
    };

    return (
        <>
            {
                jobs.length === 0 ?

                    <div className="alert alert-info" role="alert">
                        <span className="alert-icon"><span className="sr-only">Info</span></span>
                        <p>{t('job_offer.no_jobs')}</p>
                    </div> :

                    <>
                        {
                            currentJobs.map((post, index) => (
                                <div className="row" key={index}>
                                    <div className="col" key={`post-${index}`}>
                                        <div
                                            className="row no-gutters shadow-lg rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                            <div className="d-flex flex-row"></div>
                                            <div className="row news-card bg-white">
                                                <div className="col-md-4">
                                                    <div className="feed-image">
                                                        <img className="img-fluid img-responsive"
                                                             src={!_.isNil(post.rhContentPrincipalLink) ? (Config.imageFolder + post.rhContentPrincipalLink) : "https://picsum.photos/800/650"}/>
                                                    </div>
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

                                                        <div className="tags mt-3 mb-3">
                                                            <span>{post.rhContentJobPost}</span>
                                                            <span>{post.rhContentJobContractType}</span>
                                                            <span>{post.rhContentJobDirection}</span>
                                                        </div>
                                                        <div
                                                            className="d-flex flex-row justify-content-between align-items-center mt-2">
                                                            <NavLink
                                                                to={{
                                                                    pathname: `${route.jobOffer.root}/${post.rhContentDomaineId}/${post.rhContentId}`,
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


JobOfferList.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    jobs: PropTypes.array
};

JobOfferList.defaultProps = {
    style: {},
    onClick: () => {
    },
    jobs: []
};
