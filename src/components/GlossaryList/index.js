import React, {useEffect, useState} from 'react';
import * as moment from "moment";
import {useTranslation} from "react-i18next";
import ReactPaginate from "react-paginate";
import {Constant} from "../../config/Constant";
import PropTypes from "prop-types";
import GlossaryItem from "../GlossaryItem";

export default function GlossaryList(props) {
    moment.locale("fr");
    const {t} = useTranslation();
    const [search, setSearch] = useState('');
    const {
        style,
        onClick,
        glossarys,
        children,
        ...rest
    } = props;

    const totalPosts = glossarys.length;
    const totalPage = Math.ceil(totalPosts / Constant.glossaryPageLimit);

    const [currentGlossarys, setCurrentGlossary] = useState(glossarys.slice(0, Constant.glossaryPageLimit));

    useEffect(() => {
        setCurrentGlossary(glossarys.slice(0, Constant.glossaryPageLimit));
    }, [props.glossarys]);

    const handlePageChange = data => {
        const offset = (data.selected) * Constant.glossaryPageLimit;
        setCurrentGlossary(glossarys.slice(offset, offset + Constant.glossaryPageLimit));
    };
    return (
        <>
            {
                glossarys.length === 0 ?

                    <div className="alert alert-info" role="alert">
                        <span className="alert-icon"><span className="sr-only">Info</span></span>
                        <p>{t('glossary.no_glossary')}</p>
                    </div> :
                    <>
                        {
                            currentGlossarys.map((item, index) => (
                                <GlossaryItem category={item.category}
                                              items={item.items}
                                              indexKey={index}
                                              key={`glossaire${index}`}/>

                            ))
                        }
                    </>
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
                    pageRangeDisplayed={Constant.glossaryPageLimit}
                    containerClassName={'pagination justify-content-center'}
                    activeClassName={'active'}
                />
            </nav>
        </>
    )
};

GlossaryList.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    glossarys: PropTypes.array
};

GlossaryList.defaultProps = {
    style: {},
    onClick: () => {
    },
    glossarys: []
};
