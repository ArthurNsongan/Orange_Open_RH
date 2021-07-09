import React, {useEffect, useState} from 'react';
import * as moment from "moment";
import {useTranslation} from "react-i18next";
import Interweave from "interweave";
import {Constant} from "../../config/Constant";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

export default function FaqList(props) {
    moment.locale("fr");
    const {t} = useTranslation();
    const {
        style,
        onClick,
        faqs,
        children,
        ...rest
    } = props;

    const totalPosts = faqs.length;
    const totalPage = Math.ceil(totalPosts / Constant.blogPageLimit);

    const [currentFaqs, setCurentFaq] = useState(faqs.slice(0, Constant.blogPageLimit));

    useEffect(() => {
        setCurentFaq(faqs.slice(0, Constant.blogPageLimit));
    }, [props.faqs]);

    const handlePageChange = data => {
        const offset = (data.selected) * Constant.blogPageLimit;
        setCurentFaq(faqs.slice(offset, offset + Constant.blogPageLimit));
    };


    return (
        <>
            {
                faqs.length === 0 ?

                    <div className="alert alert-info" role="alert">
                        <span className="alert-icon"><span className="sr-only">Info</span></span>
                        <p>{t('faq.no_faq')}</p>
                    </div> :
                    <div className="accordion" id={`accordion`}>
                        {
                            currentFaqs.map((item, index) => (
                                <div className="card" key={`glossairedescription${index}`}>
                                    <div className="card-header" id={`heading${index}`}>
                                        <h4 className="mb-0">
                                            <button className="btn btn-link btn-block text-left"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target={`#collapse${index}`}
                                                    aria-expanded="false"
                                                    aria-controls={`collapse${index}`}>
                                                {item.rhContentTitle}
                                            </button>
                                        </h4>
                                    </div>
                                    <div id={`collapse${index}`} className="collapse"
                                         aria-labelledby={`collapse${index}`}
                                         data-parent={`#accordion`}>
                                        <div className="card-body">
                                            <blockquote className="blockquote">
                                                <p className="mb-0">
                                                    <Interweave content={item.rhContentDescription} />
                                                </p>
                                                {/* <footer className="blockquote-footer">{moment(item.rhContentDatePublish).format('lll')} {t('common.by')} <cite
                                                    title="Source Title">{item.user.userName}</cite></footer> */}
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
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
                    pageRangeDisplayed={Constant.blogPageLimit}
                    containerClassName={'pagination justify-content-center'}
                    activeClassName={'active'}
                />
            </nav>
        </>
    );
};

FaqList.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    faqs: PropTypes.array
};

FaqList.defaultProps = {
    style: {},
    onClick: () => {
    },
    faqs: []
};
