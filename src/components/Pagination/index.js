import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {Constant} from "../../config/Constant";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
        range.push(i);
        i += step;
    }
    return range;
};

function Pagination(props) {
    /* const {
         pages,
         alignment,
         totalRecords = null,
         postPageLimit = Constant.postPageLimit,
         pageNeighbours = 0,
         ...rest
     } = props;
     const {t} = useTranslation();
     const [currentPage, setCurrentPage] = useState(1);
     const [paginationData, setPaginationData] = useState({});
     const pageLimitData = typeof postPageLimit === "number" ? postPageLimit : Constant.postPageLimit;
     const totalRecordsData = typeof totalRecords === "number" ? totalRecords : 0;
     const pageNeighboursData = typeof pageNeighbours === "number"
         ? Math.max(0, Math.min(pageNeighbours, 2))
         : 0;
     const totalPagesData = Math.ceil(totalPages / this.postPageLimit);
     let customClass = "";
     switch (alignment) {
         case 'center':
             customClass = 'justify-content-center';
             break;

         case 'left':
             customClass = '';
             break;

         case 'right':
             customClass = 'justify-content-end'
     }

     const fetchPageNumbers = () => {

         const totalNumbers = (pageNeighboursData * 2) + 3;
         const totalBlocks = totalNumbers + 2;

         if (totalPagesData > totalBlocks) {
             const startPage = Math.max(2, currentPage - pageNeighboursData);
             const endPage = Math.min(totalPagesData - 1, currentPage + pageNeighboursData);
             let pages = range(startPage, endPage);

             const hasLeftSpill = startPage > 2;
             const hasRightSpill = (totalPagesData - endPage) > 1;
             const spillOffset = totalNumbers - (pages.length + 1);

             switch (true) {
                 case (hasLeftSpill && !hasRightSpill): {
                     const
                         extraPages = range(startPage - spillOffset, startPage - 1);
                     pages = [LEFT_PAGE, ...extraPages, ...pages];
                     break;
                 }
                 case(!hasLeftSpill && hasRightSpill): {
                     const extraPages = range(endPage + 1, endPage + spillOffset);
                     pages = [...pages, ...extraPages, RIGHT_PAGE];
                     break;
                 }
                 case(hasLeftSpill && hasRightSpill):
                 default: {
                     pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                     break;
                 }
             }
             return [1, ...pages, totalPagesData];
         }
         return range(1, totalPagesData);

     };

     useEffect(() => {
         gotoPage(1);
     }, []);

     const gotoPage = page => {
         const currentPage = Math.max(0, Math.min(page, totalPagesData));
         const paginationDataParam = {
             currentPage,
             totalPages: totalPagesData,
             postPageLimit: pageLimitData,
             totalRecords: totalRecordsData
         };
         setCurrentPage(currentPage);
         setPaginationData(paginationDataParam)
     };

     useEffect(() => {
         const {onPageChanged = f => f} = props;
         onPageChanged(paginationData)
     }, [paginationData]);

     const handleClick = page => evt => {
         evt.preventDefault();
         this.gotoPage(page);
     };

     const handleMoveLeft = evt => {
         evt.preventDefault();
         gotoPage(currentPage - (pageNeighbours * 2) - 1);
     };

     const handleMoveRight = evt => {
         evt.preventDefault();
         gotoPage(currentPage + (pageNeighbours * 2) + 1);
     };

     return (
         <nav role="navigation" aria-label={t('common.pagination')}>
             <ul className={`pagination ${customClass}`}>
                 {
                     pages.map((page, index) => {
                         if (page === LEFT_PAGE) return (
                             <li className="page-item disabled">
                                 <a className="page-link" title="">
                                     <span className="sr-only">{t('common.previous')}</span>
                                 </a>
                             </li>
                         );
                         if (page === RIGHT_PAGE) return (
                             <li className="page-item">
                                 <a className="page-link" href="#" title={t('common.previous')}>
                                     <span className="sr-only">{t('common.next')}</span>
                                 </a>
                             </li>
                         );

                         return (
                             <li className="page-item active" aria-current="page" key={`page${index}`}>
                                 <span className="page-link">{page.title}</span>
                             </li>
                         )
                     })
                 }
             </ul>
         </nav>
     )*/
};

export default Pagination;

Pagination.propTypes = {
    pages: PropTypes.array,
    alignment: PropTypes.oneOf(['left', 'center', 'right']),
    currentPage: PropTypes.number,
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func
};

Pagination.defaultProps = {
    pages: [],
    alignment: "center",
    currentIndex: 0
};