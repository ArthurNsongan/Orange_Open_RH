import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

export default function PostWidget(props) {

    const {
        style,
        onClick,
        children,
        categories,
        ...rest
    } = props;

    const {t} = useTranslation();

    return (
        <div {...rest}>
            <ul className="nav nav-tabs" role="tablist">
                {
                    categories.map((categorie, index) => (
                        <li className="nav-item" key={`categories-${index}`}>
                            <a className={`nav-link ${index === 0 && "active"}`}
                               href={`#tab${index}`}
                               data-toggle="tab">{categorie.title}</a>
                        </li>
                    ))
                }
            </ul>
            <div className="tab-content">
                {
                    categories.map((categorie, i) => (
                        <>
                            {
                                categorie.post.length === 0 ?
                                    t('common.no_post') :
                                    <div className={`tab-pane  ${i === 0 && "active"}`}
                                         id={`#tab${i}`} key={`tab${i}`}>
                                        <ol>
                                            {
                                                categorie.post.map((post, j) => (
                                                    <li key={`post-${j}`}><a href={post.link}>{post.title}</a></li>
                                                ))
                                            }
                                        </ol>
                                        {
                                            categories.length > 5 &&
                                            <a className="o-link-arrow ml-4" href="#">{t('common.see_all')}</a>
                                        }
                                    </div>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

PostWidget.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    onClick: PropTypes.func,
    categories: PropTypes.array
};

PostWidget.defaultProps = {
    style: {},
    onClick: () => {
    },
    categories: []
};