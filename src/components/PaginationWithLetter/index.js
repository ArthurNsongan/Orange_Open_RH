import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

export default function PaginationWithLetter(props) {
    const {
        pages,
        alignment,
        currentIndex,
        ...rest
    } = props;
    const {t} = useTranslation();
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
    return (
        <nav role="navigation" aria-label={t('common.navigation')}>
            <ul className={`pagination ${customClass}`}>
                <li className="page-item disabled">
                    <a className="page-link" title={t('common.previous')}>
                        <span className="sr-only">{t('common.previous')}</span>
                    </a>
                </li>
                {
                    pages.map((page, index) => (
                        index === currentIndex ?
                            <li className="page-item active" aria-current="page" key={`page${index}`}>
                                <span className="page-link">{page.title}</span>
                            </li> :
                            <li className="page-item" key={`page${index}`}>
                                <a className="page-link" href={page.link}>{page.title}</a>
                            </li>

                    ))
                }
                <li className="page-item">
                    <a className="page-link" href="#" title={t('common.previous')}>
                        <span className="sr-only">{t('common.next')}</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
};


PaginationWithLetter.propTypes = {
    pages: PropTypes.array,
    alignment: PropTypes.oneOf(['left', 'center', 'right']),
    currentIndex: PropTypes.number
};

PaginationWithLetter.defaultProps = {
    pages: [],
    alignment: "center",
    currentIndex: 0
};